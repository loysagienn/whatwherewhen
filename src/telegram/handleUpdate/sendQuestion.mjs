import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';

const prepareQuestionText = (question) => {
    const text = question.question.replace(/\n/g, ' ').replace(/\s+/g, ' ');

    return text;
};

const getQuestionMessage = (questionText) => `<b>Вопрос:</b>
${questionText}

<i>В ответном сообщении напишите вашу версию</i>`;

const sendQuestion = async (context, message) => {
    const chatId = message.chat.id;

    const sender = getMessageSender(message);

    logMessage(`${sender} запросил вопрос`);

    const { questionIndex, ...chatContext } = await context.db.getChatContext(chatId);

    const questionId = await context.db.getQuestionIdByOrder(questionIndex);

    const question = await context.db.getQuestion(questionId);

    const questionText = prepareQuestionText(question);

    logMessage(`Отправили ${sender} вопрос:
${questionText}`);

    const answerBody = {
        chat_id: message.chat.id,
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
        questionIndex,
        activeQuestionId: questionId,
    });
};

export default sendQuestion;
