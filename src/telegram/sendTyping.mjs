import { sendRequest } from './utils';

const sendTyping = async (message) => {
    try {
        if (!message) {
            return;
        }

        const body = {
            chat_id: message.chat.id,
            action: 'typing',
        };

        await sendRequest('sendChatAction', { body, method: 'POST' });
    } catch (error) {
        console.error('Send typing error', error);
    }
};

export default sendTyping;
