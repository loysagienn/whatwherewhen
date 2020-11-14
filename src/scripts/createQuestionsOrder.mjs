import { getDbInstance } from 'server/db';

const getAllQuestions = async () => {
    console.log('Get questions start');

    const db = await getDbInstance();

    const questions = [];
    let skip = 0;
    const limit = 1000;

    let part = await db.getQuestions({ skip, limit });

    while (part.length > 0) {
        questions.push(...part);

        skip = questions.length;

        console.log('get part', questions.length);

        part = await db.getQuestions({ skip, limit });
    }

    console.log('All questions length', questions.length);

    return questions;
};

const createQuestionsOrder = async () => {
    const db = await getDbInstance();

    const questions = await getAllQuestions();

    let index = 0;

    while (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);

        const [question] = questions.splice(randomIndex, 1);

        console.log(index, question.id);

        await db.setQuestionOrder(index, question.id);

        index += 1;
    }
};

export default createQuestionsOrder;
