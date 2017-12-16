'use strict'

module.exports = function CustomError(message, status, language) {
    this.message = message;
    this.status = status;
    this.language = language;
}