const createUserApiGetter = (requests) => (db, state) => Object.entries(requests).reduce(
    (acc, [key, request]) => {
        acc[key] = (...args) => request(db, state, ...args);

        return acc;
    },
    {},
);

export default createUserApiGetter;
