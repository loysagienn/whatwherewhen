const path = require('path');

const isProductionMode = process.env.NODE_ENV === 'production';

const srcRoot = path.resolve(__dirname, '../src');
const libRoot = path.resolve(__dirname, '../lib');

const commonAlias = (root) => ({
    app: path.resolve(root, 'app'),
    config: path.resolve(root, 'config', isProductionMode ? 'production' : 'development'),
    client: path.resolve(root, 'client'),
    server: path.resolve(root, 'server'),
    telegram: path.resolve(root, 'telegram'),
});

const serverAlias = (root) => ({
    env: path.resolve(root, 'server'),
});

const clientAlias = (root) => ({
    env: path.resolve(root, 'client'),
});

const moduleResolverConfig = ({ isWebpack = false, isBabel = false } = {}) => {
    const envAlias = isWebpack ? clientAlias : serverAlias;

    const root = isBabel ? libRoot : srcRoot;

    const alias = {
        ...commonAlias(root),
        ...envAlias(root),
    };

    return { alias };
};

module.exports = moduleResolverConfig;
