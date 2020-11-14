import handleUpdate from './handleUpdate';
import sendTyping from './sendTyping';

const updatesQueue = [];
let bisy = false;

let runUpdate;

const processQueue = () => {
    if (bisy) {
        return;
    }

    if (updatesQueue.length === 0) {
        return;
    }

    const { context, update } = updatesQueue.shift();

    runUpdate(context, update);
};

runUpdate = async (context, update) => {
    bisy = true;

    try {
        await handleUpdate(context, update);
    } catch (error) {
        console.error('Handle update error', update, error);
    }

    bisy = false;

    processQueue();
};

const processUpdate = (context, update) => {
    if (!bisy) {
        runUpdate(context, update);

        return;
    }

    updatesQueue.push({ context, update });

    sendTyping(update.message);
};

export default processUpdate;
