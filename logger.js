/**
 * Simple centralized logging utility for site-evaluation-tools
 * Provides consistent logging with configurable verbosity levels
 */

const config = require('./config');
const { DEBUG } = config;

// Log levels
const LOG_LEVELS = {
  ERROR: 0,   // Always shown - critical errors
  WARN: 1,    // Always shown - warnings
  INFO: 2,    // Always shown - important information  
  SUCCESS: 3, // Always shown - success messages
  DEBUG: 4,   // Only shown when DEBUG=true - detailed info
  VERBOSE: 5  // Only shown when VERBOSE=true - very detailed
};

const VERBOSE = process.env.VERBOSE === 'true';

class Logger {
  constructor(name = '') {
    this.name = name;
  }

  _shouldLog(level) {
    if (level <= LOG_LEVELS.SUCCESS) return true; // Always show ERROR, WARN, INFO, SUCCESS
    if (level === LOG_LEVELS.DEBUG) return DEBUG;
    if (level === LOG_LEVELS.VERBOSE) return VERBOSE;
    return false;
  }

  _formatMessage(level, message, ...args) {
    const prefix = this.name ? `[${this.name}] ` : '';
    return `${prefix}${message}`;
  }

  error(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.ERROR)) {
      console.error(`❌ ${this._formatMessage('ERROR', message)}`, ...args);
    }
  }

  warn(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.WARN)) {
      console.warn(`⚠️ ${this._formatMessage('WARN', message)}`, ...args);
    }
  }

  info(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.INFO)) {
      console.log(`ℹ️ ${this._formatMessage('INFO', message)}`, ...args);
    }
  }

  success(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.SUCCESS)) {
      console.log(`✅ ${this._formatMessage('SUCCESS', message)}`, ...args);
    }
  }

  debug(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.DEBUG)) {
      console.log(`🔧 ${this._formatMessage('DEBUG', message)}`, ...args);
    }
  }

  verbose(message, ...args) {
    if (this._shouldLog(LOG_LEVELS.VERBOSE)) {
      console.log(`🔍 ${this._formatMessage('VERBOSE', message)}`, ...args);
    }
  }

  // Convenience methods for specific types of operations
  progress(message, ...args) {
    this.debug(message, ...args);
  }

  operation(message, ...args) {
    this.info(message, ...args);
  }

  result(message, ...args) {
    this.success(message, ...args);
  }
}

// Factory function to create loggers with context
function createLogger(name) {
  return new Logger(name);
}

// Default logger
const logger = new Logger();

module.exports = {
  createLogger,
  logger,
  LOG_LEVELS
};
