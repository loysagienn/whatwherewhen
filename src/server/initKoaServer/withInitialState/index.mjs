import { generateRandomColor } from 'app/utils';
import getAnswersCounts from './getAnswersCounts';

const withInitialState = async (koaCtx, next) => {
    const { route } = koaCtx.state;

    const startTime = Date.now();

    const answersCounts = await getAnswersCounts(koaCtx.db);

    const getAnswersCountsTime = Date.now() - startTime;

    const initialState = {
        color: generateRandomColor(),
        rootQuestionGroupId: 0,
        route,
        answersCounts,
        getAnswersCountsTime,
    };

    koaCtx.state.initialState = initialState;

    return next();
};

export default withInitialState;
