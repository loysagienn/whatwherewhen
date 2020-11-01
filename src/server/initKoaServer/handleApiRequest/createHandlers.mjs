import notFound from './notFound';

const createHandler = (methodHandlers) => async (koaCtx) => {
    const handler = methodHandlers[koaCtx.method];

    if (!handler) {
        notFound(koaCtx);

        return;
    }

    try {
        const result = await handler(koaCtx);

        if (!result) {
            notFound(koaCtx);

            return;
        }

        koaCtx.body = {
            status: 'OK',
            data: result,
        };
    } catch (error) {
        const result = {
            status: 'ERROR',
        };

        if (error.key) {
            result.error = error.key;
        }

        if (error.data) {
            result.data = error.data;
        }

        koaCtx.status = error.status || 500;

        koaCtx.body = result;
    }
};

const createHandlers = (handlers) => Object.entries(handlers).reduce(
    (acc, [key, options]) => {
        acc[key] = createHandler(options);

        return acc;
    },
    {},
);

export default createHandlers;
