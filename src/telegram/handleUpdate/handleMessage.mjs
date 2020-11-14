import { getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { GET_QUESTION_TEXT, NEXT_QUESTION_TEXT } from '../constants';

import sendDescription from './sendDescription';
import sendQuestion from './sendQuestion';
import sendAnswer from './sendAnswer';

const handleDefaultMessage = async (message) => {
    const sender = getMessageSender(message);

    logMessage(`${sender} отправил сообщение:\n${message.text}`);

    return sendDescription(message);
};

const handleMessage = async (context, message) => {
    const chatId = message.chat.id;

    const chatContext = await context.db.getChatContext(chatId);

    if (chatContext.activeQuestionId) {
        return sendAnswer(context, chatContext, message);
    }

    if (message.text === GET_QUESTION_TEXT || message.text === NEXT_QUESTION_TEXT) {
        return sendQuestion(context, chatContext, message);
    }

    return handleDefaultMessage(message);
};

export default handleMessage;
