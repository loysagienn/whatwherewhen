/** @jsx createElement */

import { createElement } from 'react';
import Questions from 'app/components/Questions';
import NotFound from 'app/components/NotFound';
import Logs from 'app/components/Logs';
import Route from 'app/components/Route';
import Main from 'app/components/Main';
import { ROUTES_IDS } from 'app/router';
import css from './Root.styl';

const Root = () => (
    <div className={css.root}>
        <Route id={ROUTES_IDS.QUESTIONS}>
            <Questions />
        </Route>
        <Route id={ROUTES_IDS.INDEX}>
            <Main />
        </Route>
        <Route id={ROUTES_IDS.LOGS}>
            <Logs />
        </Route>
        <Route id={ROUTES_IDS.NOT_FOUND}>
            <NotFound />
        </Route>
    </div>
);

export default Root;
