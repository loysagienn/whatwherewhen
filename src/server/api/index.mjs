import { getQuestionGroup, getQuestion } from './requests';
import createUserApiGetter from './createUserApiGetter';

export const getUserApi = createUserApiGetter({
    getQuestionGroup,
    getQuestion,
});
