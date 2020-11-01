import { QUESTION_GROUPS } from '../collections';

export const getQuestionGroup = (db) => (id) => db
    .collection(QUESTION_GROUPS)
    .find({ id })
    .toArray()
    .then(([questionGroup]) => questionGroup);

export const setQuestionGroup = (db) => {
    const getDbQuestionGroup = getQuestionGroup(db);

    return async (questionGroup) => {
        const { id } = questionGroup;
        const existingQuestionGroup = await getDbQuestionGroup(id);

        if (existingQuestionGroup) {
            return db.collection(QUESTION_GROUPS).updateOne({ id }, { $set: questionGroup });
        }

        return db.collection(QUESTION_GROUPS).insertOne(questionGroup);
    };
};
