import { getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { GET_QUESTION_TEXT, NEXT_QUESTION_TEXT } from '../constants';

import sendDescription from './sendDescription';
import sendQuestion from './sendQuestion';
import sendAnswer from './sendAnswer';

const handleDefaultMessage = (message) => {
    const sender = getMessageSender(message);

    logMessage(`${sender} отправил сообщение:\n${message.text}`);

    sendDescription(message);
};

const handleMessage = async (context, message) => {
    const chatId = message.chat.id;

    const { activeQuestionId } = await context.db.getChatContext(chatId);

    if (activeQuestionId) {
        return sendAnswer(context, message);
    }

    if (message.text === GET_QUESTION_TEXT || message.text === NEXT_QUESTION_TEXT) {
        return sendQuestion(context, message);
    }

    return handleDefaultMessage(message);
};

export default handleMessage;
