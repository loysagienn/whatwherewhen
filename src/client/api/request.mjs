const request = (url, options = {}) => {
    const { method = 'GET', body } = options;

    const params = {
        method,
    };

    if (body) {
        params.headers = {
            'Content-Type': 'application/json',
        };

        params.body = JSON.stringify(body);
    }

    return fetch(url, params).then((response) => response.json());
};

export default request;
