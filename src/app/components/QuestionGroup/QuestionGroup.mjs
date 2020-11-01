/** @jsx createElement */

import { createElement, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestionGroupChildren } from 'app/selectors';
import css from './QuestionGroup.styl';
import withGroupChildren from './withGroupChildren';

const Child = ({ group, activeId, setActiveId }) => {
    const { id, title } = group;

    return (
        <div>
            <div className={css.groupTitle} onClick={() => setActiveId(id)}>
                {title}
            </div>
            {
                id === activeId && (
                    <QuestionGroup groupId={id} />
                )
            }
        </div>
    );
};

const QuestionGroupBase = ({ groupId }) => {
    const children = useSelector(selectQuestionGroupChildren(groupId));
    const [activeId, setActiveId] = useState(null);

    const handleActiveId = (id) => (activeId === id ? setActiveId(null) : setActiveId(id));

    return (
        <div className={css.root}>
            {
                children.map((group) => (
                    <Child key={group.id} group={group} activeId={activeId} setActiveId={handleActiveId} />
                ))
            }
        </div>
    );
};

const QuestionGroup = withGroupChildren(QuestionGroupBase);

export default QuestionGroup;
