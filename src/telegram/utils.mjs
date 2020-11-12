import got from 'got';
import { PRIVATE } from 'config';
import { stringifyQueryParams } from 'app/utils';

const BOT_URL = `https://api.telegram.org/bot${PRIVATE.BOT_TOKEN}/`;

export const sendRequest = (request, {
    method,
    query,
    body,
} = {}) => {
    const queryString = stringifyQueryParams(query);

    let url = `${BOT_URL}${request}`;

    if (queryString) {
        url = `${url}?${queryString}`;
    }

    if (method === 'POST') {
        return got.post(url, {
            responseType: 'json',
            json: body,
        });
    }

    return got.get(url, {
        responseType: 'json',
    });
};

export const getMessageSender = (message) => {
    const {
        id,
        username,
        first_name: firstName,
        last_name: lastName,
    } = message.from;

    if (username) {
        return `@${username}`;
    }

    if (firstName) {
        if (lastName) {
            return `${firstName} ${lastName}`;
        }

        return firstName;
    }

    return id;
};
