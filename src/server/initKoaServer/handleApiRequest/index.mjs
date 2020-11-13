import { ROUTES_IDS, ROUTE_TYPES } from 'app/router';
import notFound from './notFound';
import {
    getQuestionGroupHandler,
    getQuestionGroupChildrenHandler,
    getQuestionGroupQuestionsHandler,
    getQuestionHandler,
} from './handlers';
import createHandlers from './createHandlers';

const handlers = createHandlers({
    [ROUTES_IDS.API_GET_QUESTION_GROUP]: { GET: getQuestionGroupHandler },
    [ROUTES_IDS.API_GET_QUESTION_GROUP_CHILDREN]: { GET: getQuestionGroupChildrenHandler },
    [ROUTES_IDS.API_GET_QUESTION_GROUP_QUESTIONS]: { GET: getQuestionGroupQuestionsHandler },
    [ROUTES_IDS.API_GET_QUESTION]: { GET: getQuestionHandler },
});

const handleApiRequest = async (koaCtx, next) => {
    const { route } = koaCtx.state;

    if (route.type !== ROUTE_TYPES.JSON) {
        return next();
    }

    const handler = handlers[route.id] || notFound;

    return handler(koaCtx);
};

export default handleApiRequest;
