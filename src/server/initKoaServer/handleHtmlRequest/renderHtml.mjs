import { renderToString } from 'react-dom/server';
import { compose, always } from 'ramda';

import { renderApp, getStore } from 'app';

import { CDN_URLS, IS_PRODUCTION } from 'config';

const bodyStyle = 'background-color: #ffffff;';

const bundleRoot = '/static/';

// const serverRenderingOn = always(IS_PRODUCTION);
const serverRenderingOn = () => false;

const renderAppContent = compose(renderToString, renderApp, getStore);

const render = (initialState) => (
    serverRenderingOn()
        ? renderAppContent(initialState)
        : ''
);

// <meta name="apple-mobile-web-app-capable" content="yes">
// <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

export default (koaCtx) => `<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <meta name="theme-color" content="#1f2c3b">
    <link rel="stylesheet" href="${bundleRoot}app.css">
    <link rel="icon" type="image/png" href="/static/favicon.png" sizes="32x32">
</head>
<body style="${bodyStyle}">
    <div id="app">${render(koaCtx.state.initialState)}</div>

    <script src="${CDN_URLS.REACT}"></script>
    <script src="${CDN_URLS.REACT_DOM}"></script>
    <script src="${CDN_URLS.REDUX}"></script>
    <script src="${CDN_URLS.RAMDA}"></script>
    <script src="${CDN_URLS.REACT_REDUX}"></script>
    <script src="${CDN_URLS.REDUX_THUNK}"></script>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(koaCtx.state.initialState)}</script>
    <script src="${bundleRoot}app.js"></script>
</body>
</html>`;
