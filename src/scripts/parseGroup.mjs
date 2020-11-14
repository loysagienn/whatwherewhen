import { wait } from 'app/utils';
import { getDbInstance } from 'server/db';
import getGroup from './getGroup';

const addQuestions = async (dbInstance, questions, parentGroupId) => {
    const questionsToSave = questions.map((question) => ({ ...question, parentGroupId }));

    await dbInstance.setQuestions(questionsToSave);
};

const parseGroup = async (groupId, parentGroupId) => {
    const dbInstance = await getDbInstance();

    const { childGroups, questions, ...group } = await getGroup(groupId);

    if (childGroups) {
        group.children = childGroups.map(({ id }) => id);
    }

    if (questions) {
        group.questions = questions.map(({ id }) => id);
    }

    group.parentGroupId = parentGroupId || null;

    console.log('group', group);

    await dbInstance.setQuestionGroup(group);

    if (questions) {
        await addQuestions(dbInstance, questions, groupId);
    }

    if (childGroups) {
        for (let i = 0; i < childGroups.length; i++) {
            const childGroup = childGroups[i];

            await wait(500);

            await parseGroup(childGroup.id, groupId);
        }
    }
};

export default parseGroup;
