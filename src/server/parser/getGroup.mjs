import request from './request';

const getGroup = async (id, retries = 0) => {
    try {
        const { tournament } = await request(`/tour/${id}/xml`);

        return tournament;
    } catch (error) {
        if (retries > 10) {
            console.log(`Fail get /tour/${id}/xml`);

            throw error;
        }

        console.log(`Retry get /tour/${id}/xml`);

        return getGroup(id, retries + 1);
    }
};

export default getGroup;
