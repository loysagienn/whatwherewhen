import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { NEXT_QUESTION_KEYBOARD } from '../constants';

const prepareAnswerText = (question) => {
    const {
        answer, authors, comments, sources, parentTextId, number,
    } = question;

    const answerText = answer
        .replace(/\s*\n\s*([^А-ЯЁ])/g, (match, char) => ` ${char}`)
        .replace(/ +/g, ' ');

    let text = `<b>Правильный ответ:</b>\n${answerText}`;

    if (comments) {
        const commentsText = comments
            .replace(/\s*\n\s*([^А-ЯЁ])/g, (match, char) => ` ${char}`)
            .replace(/ +/g, ' ');

        text += `\n\n<b>Комментарий:</b>\n${commentsText}`;
    }

    if (authors) {
        text += `\n\n<b>Автор вопроса:</b> ${authors}`;
    }

    if (sources) {
        const sorcesText = sources
            .replace(/\s*\n\s*([^А-ЯЁ])/g, (match, char) => ` ${char}`)
            .replace(/\s+([0-9]\.)\s+/g, (match, num) => `\n${num} `);

        text += `\n\n<b>Источники:</b>\n${sorcesText}`;
    }

    text += `\n\n<a href="https://db.chgk.info/question/${parentTextId}/${number}">Этот вопрос на сайте</a>`;

    return text;
};

const saveUserAnswer = async (context, activeQuestionId, message) => {
    try {
        await context.db.setUserAnswer({
            chatId: message.chat.id,
            questionId: activeQuestionId,
            answer: message.text,
        });
    } catch (error) {
        console.error('Save answer error', error);

        logMessage(`Не смогли сохранить ответ, ошибка:
${error.message}`);
    }
};

const sendAnswer = async (context, chatContext, message) => {
    const chatId = message.chat.id;

    const { activeQuestionId } = chatContext;

    const sender = getMessageSender(message);

    logMessage(`${sender} прислал ответ:
${message.text}`);

    const question = await context.db.getQuestion(activeQuestionId);

    const answerText = prepareAnswerText(question);

    logMessage(`Отправляем ${sender} ответ:\n\n${answerText}`, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
    });

    const answerBody = {
        chat_id: chatId,
        text: answerText,
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: NEXT_QUESTION_KEYBOARD,
        },
        disable_web_page_preview: true,
    };

    try {
        await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
    } catch (error) {
        logMessage(`Ошибка при отправке ответа:\n\n${answerText}`);

        throw error;
    }

    await context.db.setChatContext({
        ...chatContext,
        activeQuestionId: null,
        chatInfo: message.chat,
    });

    saveUserAnswer(context, activeQuestionId, message);
};

export default sendAnswer;
