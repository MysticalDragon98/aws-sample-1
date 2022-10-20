const {
    batchEventMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');
const createCardDomain = require('../domain/createCardDomain');

exports.handler = (events, context) => {
    return batchEventMapper({
        events,
        context
    }, inputMode, createCardDomain, outputMode);
}