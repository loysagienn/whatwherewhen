import { sendRequest } from '../utils';
import getLeftTimeMessage from './getLeftTimeMessage';

const updateTimerMessage = async (chatId, timer) => {
    const messageText = timer.leftTime <= 0 ? 'Время вышло' : getLeftTimeMessage(timer.leftTime);

    await sendRequest('editMessageText', {
        method: 'POST',
        body: {
            chat_id: chatId,
            message_id: timer.messageId,
            text: messageText,
        },
    });
};

export default updateTimerMessage;
