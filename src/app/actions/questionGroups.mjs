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

    let childGroups = [];
    let questions = [];

    if (questionGroup.children) {
        // eslint-disable-next-line no-shadow
        const { data } = await api.getQuestionGroupChildren(groupId);

        childGroups = data.questionGroups;
    }

    if (questionGroup.questions) {
        // eslint-disable-next-line no-shadow
        const { data } = await api.getQuestionGroupQuestions(groupId);

        questions = data.questions;
    }

    const groups = [...childGroups, questionGroup];

    dispatch(loadDone({ groupId, groups, questions }));
};
