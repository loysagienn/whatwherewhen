import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import sendTyping from '../sendTyping';

const prepareQuestionText = (question) => {
    const text = question.question.replace(/\n/g, ' ').replace(/\s+/g, ' ');

    return text;
};

const getQuestionMessage = (questionText) => `<b>Вопрос:</b>
${questionText}

<i>В ответном сообщении напишите вашу версию</i>`;

const getRandomQuestion = async (db) => {
    const questionsCount = await db.getQuestionsCount();

    console.log('questionsCount', questionsCount);

    const index = Math.floor(Math.random() * questionsCount);

    const questionId = await db.getQuestionIdByOrder(index);

    const question = await db.getQuestion(questionId);

    return question;
};

const sendQuestion = async (context, chatContext, message) => {
    const chatId = message.chat.id;

    sendTyping(message);

    const sender = getMessageSender(message);

    logMessage(`${sender} запросил вопрос`);

    const startTime = Date.now();

    const question = await getRandomQuestion(context.db);

    const getQuestionTime = Date.now() - startTime;

    const questionText = prepareQuestionText(question);

    logMessage(`Отправили ${sender} вопрос:
${questionText}
<i>Вопрос выбран за ${getQuestionTime} мс</i>`, {
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
        logMessage(`Ошибка при отправке вопроса:
${questionText}`);

        throw error;
    }

    await context.db.setChatContext({
        ...chatContext,
        activeQuestionId: question.id,
    });
};

export default sendQuestion;
