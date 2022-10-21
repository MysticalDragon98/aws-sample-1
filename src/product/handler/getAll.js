const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const getAllPurcharseDomain = require('../domain/getAllPurcharseDomain');

exports.handler = (command, context) => {
    return commandMapper({
        command,
        context
    }, inputMode, getAllPurcharseDomain, outputMode);
}