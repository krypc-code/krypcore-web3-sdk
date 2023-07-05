const winston = require('winston');


  
  // Create a Winston logger with desired log levels and transports.
const logger = winston.createLogger({
level: 'error', // Set the desired log level (e.g., 'info', 'debug', 'error')
transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: './logs/combined.log' }), // Log all levels to a separate file
    new winston.transports.File({ filename: './logs/info.log', level: 'info' }), // Log 'info' level to a separate file
],
});


module.exports = logger