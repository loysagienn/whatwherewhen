const notFound = async (koaCtx, { message = 'Страница не найдена' } = {}) => {
    koaCtx.status = 404;

    koaCtx.body = {
        status: 'ERROR',
        error: 'NOT_FOUND',
        data: {
            message,
        },

    };
};

export default notFound;
