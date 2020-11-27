export const getDate = (dateStr) => {
    if (!dateStr) {
        return new Date();
    }

    return new Date(dateStr);
};

export const getDateDay = (date = getDate()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const monthStr = month < 10 ? `0${month}` : String(month);
    const dayStr = day < 10 ? `0${day}` : String(day);

    return `${year}-${monthStr}-${dayStr}`;
};
