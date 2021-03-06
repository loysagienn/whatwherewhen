import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import sendTyping from '../sendTyping';
import sendImages from '../sendImages';
import sendSticker from './sendSticker';

const OWL_STICKER_TIMEOUT = 60 * 1000;

const prepareImageUrl = (url) => {
    if (url.startsWith('http')) {
        return url;
    }

    return `https://db.chgk.info/images/db/${url}`;
};

const prepareQuestionText = (question) => {
    const imagesUrls = [];

    const text = question.question
        .replace(/\s*\n\s*([^А-ЯЁ])/g, (match, char) => ` ${char}`)
        .replace(/ +/g, ' ')
        .replace(/\[[а-яА-ЯёЁ ]+:\s*\(pic:\s*([^) ]+)\)\s*\]\s*/g, (match, url) => {
            imagesUrls.push(prepareImageUrl(url));

            return '';
        })
        .replace(/\(pic:\s*([^) ]+)\)\s*/g, (match, url) => {
            imagesUrls.push(prepareImageUrl(url));

            return '';
        });

    return [text, imagesUrls];
};

const getQuestionMessage = (questionText) => `<b>Вопрос:</b>
${questionText}

<i>В ответном сообщении напишите вашу версию</i>`;

const getRandomQuestion = async (db) => {
    const questionsCount = await db.getQuestionsCount();

    const index = Math.floor(Math.random() * questionsCount);

    const questionId = await db.getQuestionIdByOrder(index);

    const question = await db.getQuestion(questionId);

    const { answer, comments } = question;

    if (`${answer}${comments}`.includes('z-checkdb')) {
        logMessage(`Ошибка в вопросе ${questionId}, выбираем другой вопрос`);

        return getRandomQuestion(db);
    }

    return question;
};

const getQuestion = async (db, activeQuestionId) => {
    if (activeQuestionId) {
        const question = await db.getQuestion(activeQuestionId);

        return question;
    }

    return getRandomQuestion(db);
};

const sendQuestion = async (context, chatContext, message) => {
    const chatId = message.chat.id;

    const { activeQuestionId } = chatContext;

    sendTyping(message);

    const sender = getMessageSender(message);

    logMessage(`${sender} запросил вопрос:\n${message.text}`);

    const startTime = Date.now();

    const question = await getQuestion(context.db, activeQuestionId);

    const getQuestionTime = Date.now() - startTime;

    const [questionText, imagesUrls] = prepareQuestionText(question);

    if (imagesUrls.length > 0) {
        logMessage(`Отправляем картинки:\n${imagesUrls.join('\n')}`);

        try {
            await sendImages(chatId, imagesUrls);
        } catch (error) {
            console.error('Send images error', error);

            logMessage('Ошибка при отправке картинок, выбираем другой вопрос');

            await sendQuestion(context, chatContext, message);

            return;
        }
    }

    const sendText = activeQuestionId ? 'Повторно отправляем' : 'Отправляем';

    logMessage(`${sendText} ${sender} вопрос ${question.id}:\n${questionText}\n<i>Вопрос выбран за ${getQuestionTime} мс</i>`, {
        parse_mode: 'HTML',
    });

    const answerBody = {
        chat_id: chatId,
        text: getQuestionMessage(questionText),
        parse_mode: 'HTML',
        reply_markup: {
            remove_keyboard: true,
        },
    };

    try {
        await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
    } catch (error) {
        logMessage(`Ошибка при отправке вопроса:\n${questionText}`);

        throw error;
    }

    await context.db.setChatContext(chatId, {
        activeQuestionId: question.id,
    });

    setTimeout(() => sendSticker(context, chatId, sender, question.id), OWL_STICKER_TIMEOUT);
};

export default sendQuestion;
