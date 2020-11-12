import path from 'path';
import { ROOT_DIR } from './common';

let config = {};

const privateConfigPath = path.resolve(ROOT_DIR, 'privateConfig.js');

try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    config = require(privateConfigPath);
} catch (error) {
    console.log('No private config was found:');
    console.log(privateConfigPath);
}

const PRIVATE = config;

export default PRIVATE;
