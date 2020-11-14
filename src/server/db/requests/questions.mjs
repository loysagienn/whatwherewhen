import { QUESTIONS, QUESTIONS_ORDER } from '../collections';

export const getQuestion = (db) => (id) => db
    .collection(QUESTIONS)
    .findOne({ id });

export const getQuestions = (db) => ({ skip = 0, limit = 10 }) => db
    .collection(QUESTIONS)
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

export const getQuestionGroupQuestions = (db) => (parentGroupId) => db
    .collection(QUESTIONS)
    .find({ parentGroupId })
    .toArray();

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

export const setQuestions = (db) => (questions) => db
    .collection(QUESTIONS)
    .insertMany(questions);

export const getQuestionIdByOrder = (db) => (index) => db
    .collection(QUESTIONS_ORDER)
    .findOne({ index })
    .then((result) => (result ? result.questionId : null));

export const setQuestionOrder = (db) => (index, questionId) => db
    .collection(QUESTIONS_ORDER)
    .insertOne({ index, questionId });

export const getQuestionsCount = (db) => () => db
    .collection(QUESTIONS_ORDER)
    .countDocuments();
