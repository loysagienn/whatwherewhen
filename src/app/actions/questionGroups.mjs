import { createAction } from 'app/utils';

export const GROUP_CHILDREN_LOAD_START = 'GROUP_CHILDREN_LOAD_START';
export const GROUP_CHILDREN_LOAD_ERROR = 'GROUP_CHILDREN_LOAD_ERROR';
export const GROUP_CHILDREN_LOAD_DONE = 'GROUP_CHILDREN_LOAD_DONE';

const loadStart = createAction(GROUP_CHILDREN_LOAD_START);
const loadError = createAction(GROUP_CHILDREN_LOAD_ERROR);
const loadDone = createAction(GROUP_CHILDREN_LOAD_DONE);

export const loadQuestionGroupChildren = (groupId) => async (dispatch, getState, api) => {
    dispatch(loadStart({ groupId }));

    const { data } = await api.getQuestionGroup(groupId);

    const { questionGroup } = data;

    let allChildrenGroups = [];

    let allQuestions = [];

    if (questionGroup.children) {
        allChildrenGroups = await Promise.all(questionGroup.children.map(async (childGroupId) => {
            const { data } = await api.getQuestionGroup(childGroupId);

            return data.questionGroup || null;
        }));
    }

    if (questionGroup.questions) {
        allQuestions = await Promise.all(questionGroup.questions.map(async (questionId) => {
            const { data } = await api.getQuestion(questionId);

            return data.question || null;
        }));
    }

    const childGroups = allChildrenGroups.filter(Boolean);

    const questions = allQuestions.filter(Boolean);

    const groups = [...childGroups, questionGroup];

    dispatch(loadDone({ groupId, groups, questions }));
};
