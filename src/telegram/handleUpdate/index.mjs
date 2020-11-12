import handleMessage from './handleMessage';
import { getMessageSender } from '../utils';
import { logMessage } from '../logger';

const handleUpdate = async (context, update) => {
    const { message } = update;

    console.log('update', update);

    if (!message) {
        return;
    }

    try {
        await handleMessage(context, message);
    } catch (error) {
        const sender = getMessageSender(message);

        logMessage(`Ошибка при обработке сообщения от ${sender}:
${message.text}
Ошибка:
${error.message}`);

        console.error(error);
    }
};

export default handleUpdate;
