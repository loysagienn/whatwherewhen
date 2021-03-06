export default [
    {
        id: 'INDEX',
        pattern: '/',
    },
    // {
    //     id: 'ACTIVITY',
    //     pattern: '/activity/:activityId',
    //     processParams: ({ activityId }) => ({ activityId: Number(activityId) }),
    // },
    // {
    //     id: 'API_GET_ACTIVITIES',
    //     pattern: '/api/activities/summary/:monthKey',
    //     processParams: ({ monthKey }) => ({ monthKey }),
    // },
    // {
    //     id: 'API_GET_ACTIVITY_INFO',
    //     pattern: '/api/activities/info/:activityId',
    //     processParams: ({ activityId }) => ({ activityId: Number(activityId) }),
    // },
    // {
    //     id: 'LOG',
    //     pattern: '/api/log',
    // },
    {
        id: 'LOGS',
        pattern: '/logs',
    },
    {
        id: 'QUESTIONS',
        pattern: '/questions',
    },
    {
        id: 'API_GET_QUESTION_GROUP_CHILDREN',
        pattern: '/api/question-group/:groupId/children',
        processParams: ({ groupId }) => ({ groupId }),
    },
    {
        id: 'API_GET_QUESTION_GROUP_QUESTIONS',
        pattern: '/api/question-group/:groupId/questions',
        processParams: ({ groupId }) => ({ groupId }),
    },
    {
        id: 'API_GET_QUESTION_GROUP',
        pattern: '/api/question-group/:groupId',
        processParams: ({ groupId }) => ({ groupId }),
    },
    {
        id: 'API_GET_QUESTION',
        pattern: '/api/question/:questionId',
        processParams: ({ questionId }) => ({ questionId }),
    },
    {
        id: 'NOT_FOUND',
        pattern: '*',
    },
];
