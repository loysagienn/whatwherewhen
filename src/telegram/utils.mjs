import got from 'got';
import { PRIVATE } from 'config';
import FormData from 'form-data';
import { stringifyQueryParams } from 'app/utils';

const BOT_URL = `https://api.telegram.org/bot${PRIVATE.BOT_TOKEN}/`;

export const sendRequest = (request, {
    method,
    query,
    body,
    formData,
} = {}) => {
    const queryString = stringifyQueryParams(query);

    let url = `${BOT_URL}${request}`;

    if (queryString) {
        url = `${url}?${queryString}`;
    }

    if (formData) {
        const form = new FormData();

        Object.entries(formData).forEach(([key, value]) => form.append(key, value));

        return got.post(url, {
            body: form,
        });
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

export const getFile = async (imageUrl) => {
    const { body } = await got.get(imageUrl, {
        responseType: 'buffer',
    });

    return body;
};
