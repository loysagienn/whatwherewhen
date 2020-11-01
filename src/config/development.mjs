export * from './common';

export const IS_PRODUCTION = false;
export const IS_DEVELOPMENT = true;
export const DOMAIN = 'localhost';
export const HTTP_PORT = 3478;
export const DB_URL = 'mongodb://127.0.0.1:27017';
export const DB_ID = 'what_when_where';

export const CDN_URLS = {
    REACT: 'https://unpkg.com/react@16/umd/react.development.js',
    REACT_DOM: 'https://unpkg.com/react-dom@16/umd/react-dom.development.js',
    REDUX: 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.js',
    RAMDA: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.27.0/ramda.js',
    REACT_REDUX: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.js',
    REDUX_THUNK: 'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.3.0/redux-thunk.js',
};
