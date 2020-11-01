import { QUESTIONS } from '../collections';

export const getQuestion = (db) => (id) => db
    .collection(QUESTIONS)
    .find({ id })
    .toArray()
    .then(([question]) => question);

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
