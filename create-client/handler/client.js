const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const createClientDomain = require('../domain/createCalientDomain')

exports.handler = (command, context) => {

    console.log(JSON.stringify(command))

    return commandMapper({
        command,
        context
    }, inputMode, createClientDomain, outputMode);
}