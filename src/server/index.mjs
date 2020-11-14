import { HTTP_PORT } from 'config';
import { initBot } from 'telegram';
import initKoaServer from './initKoaServer';

const initApp = async () => {
    try {
        await initKoaServer({
            httpPort: HTTP_PORT,
            instanceId: 'apple',
        });

        await initBot();
    } catch (error) {
        console.log('init koa server error');
        console.error(error);
    }
};

initApp();
