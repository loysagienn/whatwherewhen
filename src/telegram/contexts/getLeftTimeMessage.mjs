import { pluralize } from 'app/utils';

const getLeftTimeMessage = (leftTime) => {
    const seconds = leftTime % 60;
    const minutes = Math.round((leftTime - seconds) / 60);

    const prefix = pluralize(['Осталась', 'Осталось', 'Осталось'], minutes || seconds || 0);

    const minutesStr = minutes === 0 ? null : `${minutes} ${pluralize(['минута', 'минуты', 'минут'], minutes)}`;
    const secondsStr = seconds === 0 ? null : `${seconds} ${pluralize(['секунда', 'секунды', 'секунд'], seconds)}`;

    const time = [minutesStr, secondsStr].filter(Boolean).join(' ');

    return `${prefix} ${time}`;
};

export default getLeftTimeMessage;
