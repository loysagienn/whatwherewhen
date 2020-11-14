import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { NEXT_QUESTION_KEYBOARD } from '../constants';

const prepareAnswerText = (question) => {
    const text = question.answer.replace(/\n/g, ' ');

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

const getAnswerMessage = (answerText) => `<b>Правильный ответ:</b>
${answerText}`;

const sendAnswer = async (context, chatContext, message) => {
    const chatId = message.chat.id;

    const { activeQuestionId } = chatContext;

    const sender = getMessageSender(message);

    logMessage(`${sender} прислал ответ:
${message.text}`);

    const question = await context.db.getQuestion(activeQuestionId);

    const answerText = prepareAnswerText(question);

    const answerBody = {
        chat_id: chatId,
        text: getAnswerMessage(answerText),
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: NEXT_QUESTION_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });

    await context.db.setChatContext({
        ...chatContext,
        activeQuestionId: null,
        chatInfo: message.chat,
    });

    saveUserAnswer(context, activeQuestionId, message);
};

export default sendAnswer;
