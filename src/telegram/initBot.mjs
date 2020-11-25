import { getDbInstance } from 'server/db';
import getUpdates from './getUpdates';
import { sendRequest } from './utils';
import { initLoggerBot } from './logger';

const getOwlStickerId = async () => {
    try {
        const { body } = await sendRequest('getStickerSet', {
            query: { name: 'Polar_Owl' },
        });

        const sticker = body.result.stickers.find(({ file_unique_id }) => file_unique_id === 'AgADJAADwZxgDA');

        return sticker.file_id || null;
    } catch (error) {
        console.log('Get owl sticker error', error);

        return null;
    }
};

const initBot = async () => {
    let body;

    try {
        const result = await sendRequest('getMe');

        body = result.body;
    } catch (error) {
        console.log('Init bot request error', error);

        return;
    }

    if (!body.ok) {
        console.error('Init bot error', body);

        throw new Error('Init bot error');
    }

    console.log('Init bot:', body.result);

    await initLoggerBot();

    const db = await getDbInstance();

    const owlStickerId = await getOwlStickerId();

    const context = { db, owlStickerId };

    getUpdates(context);
};

export default initBot;
