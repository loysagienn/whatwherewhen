const stylus = require('stylus');
const { moduleResolverConfig, classNameTemplate } = require('./buildConfig');

const isWebpackCaller = (api) => api && api.name === 'babel-loader';
const isBabelCaller = (api) => api && api.name === '@babel/cli';

// для серверной сборки, для клиентской все разруливает вебпак
const cssModulesTransform = [
    'css-modules-transform',
    {
        generateScopedName: classNameTemplate,
        extensions: ['.styl'],
        preprocessCss: (css, filename) => stylus(css).set('filename', filename).render(),
    },
];

module.exports = (api) => {
    const isWebpack = api.caller(isWebpackCaller);
    const isBabel = api.caller(isBabelCaller);
    // Еще этот файл используется для eslint'а, у него пустой caller, поэтому это ни isBabel, ни isWebpack
    // Для этого случая надо указать module-resolver, но там используется отдельная либа
    // eslint-import-resolver-babel-module и она как-то не понимает конфиг отсюда, а хочет чтобы конфиг был
    // в конфиге esling'а, а если он указан и тут и там, то возникают какие-то спецэффекты
    // Поэтому для eslint'а тут оставляем пустые presets и plugins

    api.cache.forever();

    const presets = ['@babel/preset-react'];
    const plugins = ['@babel/plugin-proposal-class-properties'];

    if (isWebpack) {
        plugins.push(['module-resolver', moduleResolverConfig({ isWebpack: true })]);
    }

    if (isBabel) {
        plugins.push(['module-resolver', moduleResolverConfig({ isBabel: true })]);
        plugins.push(['@babel/plugin-transform-modules-commonjs', {
            // noInterop: true,
        }]);
        plugins.push(cssModulesTransform);
    }

    return { presets, plugins };
};
