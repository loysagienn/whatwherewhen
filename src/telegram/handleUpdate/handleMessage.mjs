import { getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { GET_QUESTION_TEXT, NEXT_QUESTION_TEXT, GET_QUESTION_COMMAND } from '../constants';

import sendDescription from './sendDescription';
import sendQuestion from './sendQuestion';
import sendAnswer from './sendAnswer';

const requestQuestionMessages = [GET_QUESTION_TEXT, NEXT_QUESTION_TEXT, GET_QUESTION_COMMAND];

const handleDefaultMessage = async (message) => {
    const sender = getMessageSender(message);

    logMessage(`${sender} отправил сообщение:\n${message.text}`);

    return sendDescription(message);
};

const handleMessage = async (context, message) => {
    const chatId = message.chat.id;

    const chatContext = await context.db.getChatContext(chatId);

    const requestQuestion = requestQuestionMessages.includes(message.text);

    if (requestQuestion) {
        return sendQuestion(context, chatContext, message);
    }

    if (chatContext.activeQuestionId) {
        return sendAnswer(context, chatContext, message);
    }

    return handleDefaultMessage(message);
};

export default handleMessage;
