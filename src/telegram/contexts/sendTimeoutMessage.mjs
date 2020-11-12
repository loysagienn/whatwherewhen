import { sendRequest } from '../utils';
import { SHOW_ANOTHER_WORD_KEYBOARD } from '../constants';
import { logMessage } from '../logger';

const sendTimeoutMessage = async (chatId, timer) => {
    try {
        await sendRequest('deleteMessage', {
            method: 'POST',
            body: {
                chat_id: chatId,
                message_id: timer.messageId,
            },
        });
    } catch (error) {
        console.log('Delete messgage error', error);

        logMessage('Ошибка при удалении сообщения с таймером');
    }

    await sendRequest('sendMessage', {
        method: 'POST',
        body: {
            chat_id: chatId,
            text: 'Время вышло',
            reply_markup: {
                keyboard: SHOW_ANOTHER_WORD_KEYBOARD,
            },
        },
    });
};

export default sendTimeoutMessage;
