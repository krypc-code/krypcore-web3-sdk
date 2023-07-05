const winston = require('winston');

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info', // Set the log level to 'info'. You can adjust it as per your requirements.
    format: winston.format.json(), // Use JSON format for logs
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs.log' }), // Log to a file
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