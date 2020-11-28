export const getDate = (dateStr) => {
    if (!dateStr) {
        return new Date();
    }

    return new Date(dateStr);
};

export const getTimestamp = (date) => {
    if (date) {
        return date.getTime();
    }

    return Date.now();
};

export const getDateDay = (date = getDate()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthStr = month < 10 ? `0${month}` : String(month);
    const dayStr = day < 10 ? `0${day}` : String(day);

    return `${year}-${monthStr}-${dayStr}`;
};

export const getDateHour = (date = getDate()) => {
    const dateDay = getDateDay(date);

    const hours = date.getHours();

    const hourStr = hours < 10 ? `0${hours}` : String(hours);

    return `${dateDay}T${hourStr}:00`;
};

export const getDateMinute = (date = getDate()) => {
    const dateDay = getDateDay(date);

    const hours = date.getHours();

    const hourStr = hours < 10 ? `0${hours}` : String(hours);

    const minutes = date.getMinutes();

    const minutesStr = minutes < 10 ? `0${minutes}` : String(minutes);

    return `${dateDay}T${hourStr}:${minutesStr}`;
};
