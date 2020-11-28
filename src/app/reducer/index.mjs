import { combineReducers } from 'redux';
import { handleActions } from 'app/utils';
import { GROUP_CHILDREN_LOAD_START, GROUP_CHILDREN_LOAD_DONE } from 'app/actions';
import { LOADER } from 'app/constants';
import color from './color';
import route from './route';

const groupChildrenLoader = handleActions({
    [GROUP_CHILDREN_LOAD_START]: (state, { groupId }) => ({ ...state, [groupId]: LOADER.LOADING }),
    [GROUP_CHILDREN_LOAD_DONE]: (state, { groupId }) => ({ ...state, [groupId]: LOADER.LOADED }),
}, {});

const questionGroups = handleActions({
    [GROUP_CHILDREN_LOAD_DONE]: (state, { groups }) => {
        const newState = { ...state };

        groups.forEach((group) => newState[group.id] = group);

        return newState;
    },
}, {});

const questions = handleActions({
    [GROUP_CHILDREN_LOAD_DONE]: (state, { groupId, questions }) => ({ ...state, [groupId]: questions }),
}, {});

export default combineReducers({
    color,
    groupChildrenLoader,
    questionGroups,
    questions,
    rootQuestionGroupId: (state = 0) => state,
    answersCounts: (state = []) => state,
    getAnswersCountsTime: (state = 0) => state,
    route,
});
