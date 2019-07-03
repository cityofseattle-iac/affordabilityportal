const fs = require('fs');
const winston = require('winston');
const expressWinston = require('express-winston');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config/config');

const LOG_FOLDER = `${__dirname}/../logs`;
if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

const ACCESS_LOG_LOCATION = `${LOG_FOLDER}/access.log`;
const APPLICATION_LOG_LOCATION = `${LOG_FOLDER}/log.txt`;
const ERROR_LOG_LOCATION = `${LOG_FOLDER}/${config.appName}.txt`;

const BASE_TRANSPORT_OPTIONS = {
  json: false,
  colorize: !config.isAWSEnvironment
};
const CONSOLE_TRANSPORT_OPTIONS = _.merge({}, BASE_TRANSPORT_OPTIONS);
const FILE_TRANSPORT_OPTIONS = _.merge({}, BASE_TRANSPORT_OPTIONS, {
  maxFiles: config.accessLog.keep,
  maxSize: config.accessLog.fileSize,
  zippedArchive: config.accessLog.compress,
  tailable: true
});

function getLogFormatterOptionsWithIdentifier(identifier) {
  return {
    timestamp: () => Date.now(),
    formatter: (options) => {
      const level = options.level || 'unknown';
      const meta = _.isEmpty(options.meta) ? '' : JSON.stringify(options.meta);
      return `${moment.utc(options.timestamp())
        .format()}: identifier="${identifier}" level="${level.toUpperCase()}" message="${options.message}" ${meta}`;
    }
  };
}

exports.withIdentifier = (identifier) => {
  if (!identifier) {
    throw new Error('Identifier is required while setting up a logger. For example, pass the module name that will use this logger.');
  }
  return winston.createLogger({
    transports: [
      config.isAWSEnvironment
        ? new winston.transports.File(_.merge({}, FILE_TRANSPORT_OPTIONS, getLogFormatterOptionsWithIdentifier(identifier), { filename: APPLICATION_LOG_LOCATION }))
        : new winston.transports.Console(_.merge({}, CONSOLE_TRANSPORT_OPTIONS, getLogFormatterOptionsWithIdentifier(identifier)))
    ]
  });
};

exports.REQUEST_LOGGER = expressWinston.logger({
  transports: [
    config.isAWSEnvironment
      ? new winston.transports.File(_.merge({}, FILE_TRANSPORT_OPTIONS, { filename: ACCESS_LOG_LOCATION }))
      : new winston.transports.Console(CONSOLE_TRANSPORT_OPTIONS)
  ],
  meta: true,
  colorize: !config.isAWSEnvironment
});

exports.ERROR_LOGGER = expressWinston.errorLogger({
  transports: [
    config.isAWSEnvironment
      ? new winston.transports.File(_.merge({}, FILE_TRANSPORT_OPTIONS, { filename: ERROR_LOG_LOCATION }))
      : new winston.transports.Console(CONSOLE_TRANSPORT_OPTIONS)
  ]
});
