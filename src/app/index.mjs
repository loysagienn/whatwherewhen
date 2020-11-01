import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'app/reducer';
import Root from 'app/components/Root';

export const renderApp = (store) => (
    <Provider store={store}>
        <Root />
    </Provider>
);

export const getStore = (initialState, api, composeEnhancers = compose) => createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))),
);
