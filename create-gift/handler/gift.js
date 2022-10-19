
const {
    batchEventMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const createGiftDomain = require('../domain/createGiftDomain')

exports.handler = (command, context) => {
    return batchEventMapper({
        command,
        context
    }, inputMode, createGiftDomain, outputMode);
}

