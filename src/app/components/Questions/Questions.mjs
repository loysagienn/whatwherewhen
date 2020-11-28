/** @jsx createElement */

import { createElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRootQuestionGroupId, selectQuestionGroupChildren, selectGroupQuestions } from 'app/selectors';
import css from './Questions.styl';
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

const Question = ({ question }) => (
    <div className={css.question}>
        {question.question}
    </div>
);

const QuestionGroupBase = ({ groupId }) => {
    const children = useSelector(selectQuestionGroupChildren(groupId));
    const questions = useSelector(selectGroupQuestions(groupId));
    const [activeId, setActiveId] = useState(null);

    const handleActiveId = (id) => (activeId === id ? setActiveId(null) : setActiveId(id));

    return (
        <div className={css.group}>
            {
                children.map((group) => (
                    <Child key={group.id} group={group} activeId={activeId} setActiveId={handleActiveId} />
                ))
            }
            {
                questions.map((question) => (
                    <Question key={question.id} question={question} />
                ))
            }
        </div>
    );
};

const QuestionGroup = withGroupChildren(QuestionGroupBase);

const Questions = () => {
    console.log('render questions');
    const rootQuestionGroupId = useSelector(selectRootQuestionGroupId);

    return (
        <div className={css.root}>
            <div className={css.wrapper}>
                <QuestionGroup groupId={rootQuestionGroupId} />
            </div>
        </div>
    );
};

export default Questions;
