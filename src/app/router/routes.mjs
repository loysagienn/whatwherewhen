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
