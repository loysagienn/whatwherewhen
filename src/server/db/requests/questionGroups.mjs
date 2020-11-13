import { QUESTION_GROUPS } from '../collections';

export const getQuestionGroup = (db) => (id) => db
    .collection(QUESTION_GROUPS)
    .findOne({ id });

export const getQuestionGroupChildren = (db) => (parentGroupId) => db
    .collection(QUESTION_GROUPS)
    .find({ parentGroupId })
    .toArray();

export const setQuestionGroup = (db) => async (questionGroup) => db
    .collection(QUESTION_GROUPS)
    .insertOne(questionGroup);
