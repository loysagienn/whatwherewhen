import { HTTP_PORT } from 'config';
import initKoaServer from './initKoaServer';
import './parser';

const initApp = async () => {
    try {
        await initKoaServer({
            httpPort: HTTP_PORT,
            instanceId: 'apple',
        });
    } catch (error) {
        console.log('init koa server error');
        console.error(error);
    }
};

initApp();
