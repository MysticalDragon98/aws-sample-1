const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const getClientDomain = require('../domain/getClientDomain');

exports.handler = (command, context) => {
    return commandMapper({
        command,
        context
    }, inputMode, getClientDomain, outputMode);
}