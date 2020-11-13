export const getQuestionGroup = (db, state, groupId) => db.getQuestionGroup(groupId);

export const getQuestionGroupChildren = (db, state, groupId) => db.getQuestionGroupChildren(groupId);

export const getQuestionGroupQuestions = (db, state, groupId) => db.getQuestionGroupQuestions(groupId);

export const getQuestion = (db, state, questionId) => db.getQuestion(questionId);
