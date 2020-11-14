import { USER_ANSWERS } from '../collections';

export const getChatAnswers = (db) => (chatId) => db
    .collection(USER_ANSWERS)
    .find({ chatId })
    .toArray();

export const getQuestionAnswers = (db) => (questionId) => db
    .collection(USER_ANSWERS)
    .find({ questionId })
    .toArray();

export const setUserAnswer = (db) => async ({ chatId, questionId, answer }) => db
    .collection(USER_ANSWERS)
    .insertOne({ chatId, questionId, answer });
