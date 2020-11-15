import { sendRequest } from './utils';

const sendImage = async (chatId, imageUrl) => {
    const body = {
        chat_id: chatId,
        photo: imageUrl,
    };

    await sendRequest('sendPhoto', { body, method: 'POST' });
};

const sendImages = async (chatId, imagesUrls) => {
    if (!imagesUrls || imagesUrls.length === 0) {
        return;
    }

    await Promise.all(imagesUrls.map((imageUrl) => sendImage(chatId, imageUrl)));
};

export default sendImages;
