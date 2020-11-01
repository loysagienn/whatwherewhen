import request from './request';

const getGroup = async (id) => {
    const { tournament } = await request(`/tour/${id}/xml`);

    return tournament;
};

export default getGroup;
