import { wait } from 'app/utils';
import { getDbInstance } from 'server/db';
import getGroup from './getGroup';

const addQuestions = async (questions, dbInstance) => {
    for (let i = 0; i < questions.length; i++) {
        await wait(100);

        const question = questions[i];

        await dbInstance.setQuestion(question);
    }
};

const parseGroup = async (groupId) => {
    const dbInstance = await getDbInstance();

    const { childGroups, questions, ...group } = await getGroup(groupId);

    if (childGroups) {
        group.children = childGroups.map(({ id }) => id);
    }

    if (questions) {
        group.questions = questions.map(({ id }) => id);
    }

    console.log('group', group);

    await dbInstance.setQuestionGroup(group);

    if (questions) {
        await addQuestions(questions, dbInstance);
    }

    if (childGroups) {
        for (let i = 0; i < childGroups.length; i++) {
            const childGroup = childGroups[i];

            await parseGroup(childGroup.id);
        }
    }
};

export default parseGroup;
