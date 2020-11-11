import { wait } from 'app/utils';
import { getDbInstance } from 'server/db';

const createQuestionsOrder = async () => {
    const db = await getDbInstance();

    console.log('db', db);

    const questions = await db.getAllQuestions();

    console.log('questions length', questions.length);

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
