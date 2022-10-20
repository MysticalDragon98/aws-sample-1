const {
    commandMapper
} = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const createClientDomain = require('../domain/createClientDomain');
const DeleteClientDomain = require('../domain/DeleteClientDomain');
const errorDomain = require('../domain/errorDomain');
const getClientDomain = require('../domain/getClientDomain');
const PatchClientDomain = require('../domain/updateClientDomain');

exports.handler = (command, context) => {

    console.log(JSON.stringify(command))

    if ([`${command?.routeKey}`, `${command?.httpMethod} ${command?.resource}`].includes(`POST /${process.env.ENVIRONMENT}/client`)) {
        return commandMapper({
            command,
            context
        }, inputMode, createClientDomain, outputMode);
    }

    if ([`${command?.routeKey}`, `${command?.httpMethod} ${command?.resource}`].includes(`GET /${process.env.ENVIRONMENT}/client/{dni}`)) {
        return commandMapper({
            command,
            context
        }, inputMode, getClientDomain, outputMode);
    }
    if ([`${command?.routeKey}`, `${command?.httpMethod} ${command?.resource}`].includes(`PATCH /${process.env.ENVIRONMENT}/client/{dni)}`)) {
        return commandMapper({
            command,
            context
        }, inputMode, PatchClientDomain, outputMode);
    }
    if ([`${command?.routeKey}`, `${command?.httpMethod} ${command?.resource}`].includes(`DELETE /${process.env.ENVIRONMENT}/client/{dni}`)) {
        return commandMapper({
            command,
            context
        }, inputMode, DeleteClientDomain, outputMode);
    }
    return commandMapper({
        command,
        context
    }, inputMode, errorDomain, outputMode);
}