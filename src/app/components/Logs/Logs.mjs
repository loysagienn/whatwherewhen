import React, {
    useRef, useState, useEffect, useCallback, useMemo,
} from 'react';
import Chart from 'app/components/Chart';
import { useSelector } from 'react-redux';
import { selectAnswersCounts, selectGetAnswersCountsTime } from 'app/selectors';
import css from './Logs.styl';

const Logs = () => {
    const answersCounts = useSelector(selectAnswersCounts);
    const getAnswersCountsTime = useSelector(selectGetAnswersCountsTime);

    console.log('getAnswersCountsTime', getAnswersCountsTime);

    const values = useMemo(() => answersCounts.map(({ count }) => count), [answersCounts]);

    const maxValue = useMemo(() => Math.max(Math.max(...values), 10), [values]);

    const lines = useMemo(() => ([{
        values,
        color: '#E64A19',
        maxValue,
    }]), [values, maxValue]);

    const chartRef = useRef();

    const [{ width, height }, setSizes] = useState({});

    const updateSizes = useCallback(() => {
        const { offsetWidth, offsetHeight } = chartRef.current;

        setSizes({ width: offsetWidth, height: offsetHeight });
    }, []);

    useEffect(() => {
        updateSizes();

        window.addEventListener('resize', updateSizes);

        return () => window.removeEventListener('resize', updateSizes);
    }, [updateSizes]);

    return (
        <div className={css.root}>
            <div className={css.maxValue}>
                {maxValue}
            </div>
            <div className={css.chartWrapper} ref={chartRef}>
                {
                    width && height && (
                        <Chart
                            className={css.chart}
                            width={width}
                            height={height}
                            lines={lines}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Logs;
