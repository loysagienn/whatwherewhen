import request from './request';

export const getUserApi = () => ({
    getQuestionGroup: (groupId) => request(`/api/question-group/${groupId}`, { method: 'GET' }),
    getQuestion: (questionId) => request(`/api/question/${questionId}`, { method: 'GET' }),
});
