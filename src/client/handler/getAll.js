const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const getAllClientDomain = require('../domain/getAllClientDomain');

exports.handler = (command, context) => {
    return commandMapper({
        command,
        context
    }, inputMode, getAllClientDomain, outputMode);
}