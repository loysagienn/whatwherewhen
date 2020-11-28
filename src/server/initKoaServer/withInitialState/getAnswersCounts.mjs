import { getTimestamp, getDateMinute } from 'app/utils/date';

const step = 10 * 60 * 1000;
const split = 24 * 60 * 60 * 1000;

const getCurrentTimestamp = () => {
    const timestamp = getTimestamp();

    return timestamp - (timestamp % step) + step;
};

const getAnswersCounts = async (db) => {
    const currentTimestamp = getCurrentTimestamp();
    const startTimeStamp = currentTimestamp - split;

    const answers = await db.getAnswersAfter(startTimeStamp);

    const result = [];
    let index = 0;
    let currentCount = 0;
    let activeTimestamp = startTimeStamp + step;

    while (index < answers.length) {
        const answer = answers[index];

        if (answer.timestamp) {
            if (answer.timestamp < activeTimestamp) {
                currentCount += 1;
            } else {
                result.push({
                    count: currentCount,
                    timeStr: getDateMinute(new Date(activeTimestamp)),
                });

                activeTimestamp += step;

                while (answer.timestamp >= activeTimestamp) {
                    result.push({
                        count: 0,
                        timeStr: getDateMinute(new Date(activeTimestamp)),
                    });

                    activeTimestamp += step;
                }

                currentCount = 1;
            }
        }

        index += 1;
    }

    result.push({
        count: currentCount,
        timeStr: getDateMinute(new Date(activeTimestamp)),
    });

    activeTimestamp += step;

    while (currentTimestamp >= activeTimestamp) {
        result.push({
            count: 0,
            timeStr: getDateMinute(new Date(activeTimestamp)),
        });

        activeTimestamp += step;
    }

    return result;
};

export default getAnswersCounts;
