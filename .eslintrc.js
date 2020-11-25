const { moduleResolverConfig } = require('./buildConfig');

module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'airbnb/hooks',
    ],
    env: {
        node: true,
    },
    plugins: [
        'import',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.js',
                    '.mjs',
                ],
            },
            'babel-module': moduleResolverConfig(), // для eslint'а используем серверный конфиг
        },
    },
    ignorePatterns: [
        'lib/**/*.js',
        'static/**/*.js',
    ],
    rules: {
        'max-len': ['error', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
        indent: ['error', 4],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.mjs'] }],
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'no-await-in-loop': 'off',
        'no-plusplus': 'off',
        camelcase: 'off',
    },
    overrides: [
        {
            files: [
                'src/app/**/*.mjs',
            ],
            env: {
                'shared-node-browser': true,
            },
        },
        {
            files: [
                'src/client/**/*.mjs',
            ],
            env: {
                browser: true,
            },
        },
        {
            files: [
                'src/server/**/*.mjs',
            ],
            env: {
                node: true,
            },
        },
    ],
};
