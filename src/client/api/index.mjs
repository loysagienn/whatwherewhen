import request from './request';

export const getUserApi = () => ({
    getQuestionGroup: (groupId) => request(`/api/question-group/${groupId}`, { method: 'GET' }),
    getQuestionGroupChildren: (groupId) => request(`/api/question-group/${groupId}/children`, { method: 'GET' }),
    getQuestionGroupQuestions: (groupId) => request(`/api/question-group/${groupId}/questions`, { method: 'GET' }),
    getQuestion: (questionId) => request(`/api/question/${questionId}`, { method: 'GET' }),
});
