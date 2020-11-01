/** @jsx createElement */

import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { selectRootQuestionGroupId } from 'app/selectors';
import QuestionGroup from 'app/components/QuestionGroup';
import css from './Root.styl';

const Root = () => {
    const rootQuestionGroupId = useSelector(selectRootQuestionGroupId);

    return (
        <div className={css.root}>
            <div className={css.wrapper}>
                <QuestionGroup groupId={rootQuestionGroupId} />
            </div>
        </div>
    );
};

export default Root;
