import { getDbInstance } from 'server/db';
import getUpdates from './getUpdates';
import { sendRequest } from './utils';
import { initLoggerBot } from './logger';

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

    getUpdates({ db });
};

export default initBot;
