const winston = require('winston');


// Create a custom Winston log format for better readability
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    })
  );
  
  // Create a Winston logger with desired log levels and transports.
const logger = winston.createLogger({
level: 'debug', // Set the desired log level (e.g., 'info', 'debug', 'error')
format: logFormat,
transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: './logs/combined.log' }), // Log all levels to a separate file
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }), // Log 'info' level to a separate file
],
});

// Helper function to log errors
function logError(message, error) {
    logger.error({
        message,
        error: error.message,
        stack: error.stack,
    });
}

module.exports = logger