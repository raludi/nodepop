'use strict'

const i18n = require('i18n');

module.exports = (char, lang) => {
    return i18n.__({phrase: char, locale: (lang !== undefined ? locale : 'es')});
}