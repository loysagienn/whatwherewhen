export * from './common';

export const IS_PRODUCTION = true;
export const IS_DEVELOPMENT = false;
export const DOMAIN = 'wweb.pro';
export const HTTP_PORT = 3456;
export const DB_URL = 'mongodb://127.0.0.1:27017';
export const DB_ID = 'what_when_where';

export const CDN_URLS = {
    REACT: 'https://unpkg.com/react@16/umd/react.production.min.js',
    REACT_DOM: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
    REDUX: 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js',
    RAMDA: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.27.0/ramda.min.js',
    REACT_REDUX: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.0/react-redux.min.js',
    REDUX_THUNK: 'https://cdnjs.cloudflare.com/ajax/libs/redux-thunk/2.3.0/redux-thunk.min.js',
};
