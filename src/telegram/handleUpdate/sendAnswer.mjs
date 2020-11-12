import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { NEXT_QUESTION_KEYBOARD } from '../constants';

const prepareAnswerText = (question) => {
    const text = question.answer.replace(/\n/g, ' ');

    return text;
};

const getAnswerMessage = (answerText) => `<b>Правильный ответ:</b>
${answerText}`;

const sendAnswer = async (context, message) => {
    const chatId = message.chat.id;

    const sender = getMessageSender(message);

    logMessage(`${sender} прислал ответ:
${message.text}`);

    const { activeQuestionId, questionIndex, ...chatContext } = await context.db.getChatContext(chatId);

    const question = await context.db.getQuestion(activeQuestionId);

    const answerText = prepareAnswerText(question);

    const answerBody = {
        chat_id: message.chat.id,
        text: getAnswerMessage(answerText),
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: NEXT_QUESTION_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });

    await context.db.setChatContext({
        ...chatContext,
        questionIndex: questionIndex + 1,
        activeQuestionId: null,
    });
};

export default sendAnswer;
