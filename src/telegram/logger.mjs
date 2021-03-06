import got from 'got';
import { PRIVATE } from 'config';
import { stringifyQueryParams } from 'app/utils';

const BOT_URL = `https://api.telegram.org/bot${PRIVATE.LOGGER_BOT_TOKEN}`;

const chats = [];

const messagesQueue = [];
let bisy = false;

let sendMessage;

const sendChatMessage = async (chatId, message, options = {}) => {
    await got.post(`${BOT_URL}/sendMessage`, {
        responseType: 'json',
        json: {
            chat_id: chatId,
            text: message,
            ...options,
        },
    }).catch((error) => console.error('Send logger message error', error));
};

const processQueue = () => {
    if (bisy) {
        return;
    }

    if (messagesQueue.length === 0) {
        return;
    }

    const { message, options } = messagesQueue.shift();

    sendMessage(message, options);
};

sendMessage = async (message, options) => {
    bisy = true;

    await Promise.all(chats.map((chatId) => sendChatMessage(chatId, message, options)));

    bisy = false;

    processQueue();
};

export const logMessage = (message, options) => {
    if (!bisy) {
        sendMessage(message, options);

        return;
    }

    messagesQueue.push({ message, options });
};

const addChatId = (chatId) => {
    if (!chats.includes(chatId)) {
        chats.push(chatId);

        sendChatMessage(chatId, 'Start logging');
    }
};

const removeChatId = (chatId) => {
    if (chats.includes(chatId)) {
        const index = chats.indexOf(chatId);

        chats.splice(index, 1);

        sendChatMessage(chatId, 'Stop logging');
    }
};

const handleUpdate = (update) => {
    const { message } = update;

    if (message) {
        const chatId = message.chat.id;

        if (message.text === '/start') {
            addChatId(chatId);
        } else if (message.text === '/stop') {
            removeChatId(chatId);
        }
    }
};

const getUpdates = async (offset) => {
    try {
        const query = stringifyQueryParams({
            offset,
            timeout: 5,
        });

        const { body } = await got.get(`${BOT_URL}/getUpdates?${query}`, {
            responseType: 'json',
        });

        if (!body.ok) {
            console.log('Get logger updates error', body);

            return;
        }

        const updates = body.result;

        if (updates.length === 0) {
            getUpdates(offset);

            return;
        }

        updates.forEach(handleUpdate);

        const lastUpdate = updates[updates.length - 1];

        const lastUpdateId = lastUpdate.update_id;

        getUpdates(lastUpdateId + 1);
    } catch (error) {
        console.log('Get logger updates error', error);
    }
};

export const initLoggerBot = async () => {
    try {
        const { body } = await got.get(`${BOT_URL}/getMe`, {
            responseType: 'json',
        });

        if (!body.ok) {
            console.error('Init logger bot error', body);

            return;
        }

        console.log('Init logger bot:', body.result);

        await getUpdates();
    } catch (error) {
        console.log('Init logger bot error', error);
    }
};
