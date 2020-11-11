import { QUESTIONS, QUESTIONS_ORDER } from '../collections';

export const getQuestion = (db) => (id) => db
    .collection(QUESTIONS)
    .findOne({ id });

export const setQuestion = (db) => {
    const getDbQuestion = getQuestion(db);

    return async (question) => {
        const { id } = question;

        const existingQuestion = await getDbQuestion(id);

        if (existingQuestion) {
            return db.collection(QUESTIONS).updateOne({ id }, { $set: question });
        }

        return db.collection(QUESTIONS).insertOne(question);
    };
};

export const getAllQuestions = (db) => () => db
    .collection(QUESTIONS)
    .find()
    .toArray();

export const getQuestionIdByOrder = (db) => (index) => db
    .collection(QUESTIONS_ORDER)
    .findOne({ index })
    .then((result) => (result ? result.questionId : null));

export const setQuestionOrder = (db) => {
    const getDbQuestionIdByOrder = getQuestionIdByOrder(db);

    return async (index, questionId) => {
        const existingItem = await getDbQuestionIdByOrder(index);

        const item = { index, questionId };

        if (existingItem) {
            return db.collection(QUESTIONS_ORDER).updateOne({ index }, { $set: item });
        }

        return db.collection(QUESTIONS_ORDER).insertOne(item);
    };
};
