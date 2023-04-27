const buildDevLogger = require('./dev-logger');
const buildProdLogger = require('./prod-logger');
const envConfig = require('../../config/env.config');

const ENVIRONMENT = envConfig.NODE_ENV;
const isProduction = ENVIRONMENT === 'production';

const logger = isProduction ? buildProdLogger() : buildDevLogger();

module.exports = logger;
