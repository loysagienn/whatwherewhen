import got from 'got';
import xmlParser from 'fast-xml-parser';

const keysMap = {
    URL: 'URL',
    tour: 'childGroups',
    question: 'questions',
    QuestionId: 'id',
};

const lowerCaseFirstChar = (key) => `${key.charAt(0).toLowerCase()}${key.slice(1)}`;

const getValue = (key, val) => {
    if (key === 'questions' || key === 'childGroups') {
        if (!Array.isArray(val)) {
            return [val];
        }
    }

    if (key === 'id' || key === 'parentId') {
        return String(val);
    }

    return val;
};

const prepareResult = (value) => {
    if (Array.isArray(value)) {
        return value.map(prepareResult);
    }

    if (typeof value !== 'object') {
        return value;
    }

    return Object.entries(value).reduce((acc, [key, val]) => {
        const newKey = keysMap[key] || lowerCaseFirstChar(key);

        const newVal = getValue(newKey, val);
        acc[newKey] = prepareResult(newVal);

        return acc;
    }, {});
};

const request = async (path) => {
    const response = await got(`https://db.chgk.info/${path}`);

    const result = xmlParser.parse(response.body);

    return prepareResult(result);
};

export default request;
