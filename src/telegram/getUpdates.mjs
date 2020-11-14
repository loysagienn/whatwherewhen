import processUpdate from './processUpdate';

import { sendRequest } from './utils';

const getUpdates = async (context, offset) => {
    let body;

    try {
        const result = await sendRequest('getUpdates', {
            query: { offset, timeout: 5 },
        });

        body = result.body;
    } catch (error) {
        console.log('Get updates request error', error);

        getUpdates(context, offset);

        return;
    }

    if (!body.ok) {
        console.log('Get updates error', body);

        return;
    }

    const updates = body.result;

    if (updates.length === 0) {
        getUpdates(context, offset);

        return;
    }

    updates.forEach((update) => processUpdate(context, update));

    const lastUpdate = updates[updates.length - 1];

    const lastUpdateId = lastUpdate.update_id;

    getUpdates(context, lastUpdateId + 1);
};

export default getUpdates;
