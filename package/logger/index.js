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
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
  ],
});

function logInfo(message, data = {}) {
  logger.info(message, data);
}

function logError(message, error) {
  logger.error({
    message,
    error: error.message,
    stack: error.stack,
  });
}

module.exports = {
  logger,
  logInfo, 
  logError
};