const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
  ],
});

function logInfo(message, data = {}) {
  logger.info(message, data);
}

function logError(message, error) {
  logger.error({
    message,
    error: error,
  });
}

module.exports = {
  logger,
  logInfo,
  logError
};