export const getQuestionGroupHandler = async (koaCtx) => {
    const { api, route } = koaCtx.state;

    const { groupId } = route.params;

    const questionGroup = await api.getQuestionGroup(groupId);

    if (!questionGroup) {
        return null;
    }

    return {
        questionGroup,
    };
};

export const getQuestionHandler = async (koaCtx) => {
    const { api, route } = koaCtx.state;

    const { questionId } = route.params;

    const question = await api.getQuestion(questionId);

    if (!question) {
        return null;
    }

    return {
        question,
    };
};
