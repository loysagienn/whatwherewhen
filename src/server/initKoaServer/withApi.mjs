import { getUserApi } from 'server/api';

const withApi = async (koaCtx, next) => {
    koaCtx.state.api = getUserApi(koaCtx.db, koaCtx.state);

    return next();
};

export default withApi;
