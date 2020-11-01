import { LOADER } from 'app/constants';

export * from './color';

export const selectRootQuestionGroupId = (state) => state.rootQuestionGroupId;

export const selectGroupChildrenLoader = (groupId) => (state) => state.groupChildrenLoader[groupId] || LOADER.IDLE;

export const selectQuestionGroup = (groupId) => (state) => state.questionGroups[groupId];

export const selectQuestionGroupChildren = (groupId) => (state) => {
    const questionGroup = selectQuestionGroup(groupId)(state);

    const childrenIds = questionGroup.children || [];

    return childrenIds.map((id) => selectQuestionGroup(id)(state)).filter(Boolean);
};

export const selectGroupQuestions = (groupId) => (state) => state.questions[groupId] || [];
