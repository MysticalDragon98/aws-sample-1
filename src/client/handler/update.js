const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const PatchClientDomain = require('../domain/updateClientDomain');

exports.handler = (command, context) => {
    return commandMapper({
        command,
        context
    }, inputMode, PatchClientDomain, outputMode);
}