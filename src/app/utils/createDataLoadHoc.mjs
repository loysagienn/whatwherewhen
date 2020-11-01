/** @jsx createElement */

import { createElement, useEffect } from 'react';
import { connect } from 'react-redux';

import { LOADER } from 'app/constants';

const DefaultLoadError = () => (
    <div>Ошибка при загрузке</div>
);

const Preloader = () => (
    <div>Загрузка...</div>
);
/**
 * Можно использовать эту функцию для всех мест, где нам нужно что-то загрузить для того чтобы отобразить комопнент,
 * чтобы не размазывать такие места по проекту
 */
const createDataLoadHoc = ({
    selectLoader,
    loadAction,
    Loading = Preloader,
    LoadError = DefaultLoadError,
}) => {
    const connectHoc = connect(
        (state, props) => ({ dataLoader: selectLoader(state, props) }),
        (dispatch, props) => ({ dispatchLoadAction: () => loadAction && dispatch(loadAction(props)) }),
    );

    return (
        Wrapped,
        {
            Loading: LoadingComponent = Loading,
            LoadError: LoadErrorComponent = LoadError,
        } = {},
    ) => {
        const Wrapper = (props) => {
            const { dataLoader, dispatchLoadAction, ...restProps } = props;

            useEffect(() => {
                if (dataLoader === LOADER.IDLE || dataLoader === LOADER.ERROR) {
                    dispatchLoadAction();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []); // намеренно оставляем пустой массив, чтобы выполнилось только в первый раз

            if (dataLoader === LOADER.LOADED) {
                return (
                    <Wrapped {...restProps} />
                );
            }

            if (dataLoader === LOADER.LOADING) {
                return (
                    <LoadingComponent {...restProps} />
                );
            }

            if (dataLoader === LOADER.ERROR) {
                return (
                    <LoadErrorComponent {...restProps} />
                );
            }

            return null;
        };

        return connectHoc(Wrapper);
    };
};

export default createDataLoadHoc;
