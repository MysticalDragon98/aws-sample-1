const {
    createClientCommand, GetClientCommand
} = require('../schema/command/clientCommand');
const {
    CreateClientValidation
} = require('../schema/input/clientValidation');
const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    createClient
} = require('../service/clientService');

module.exports = async (commandPayloadX, commandMeta) => {
    const getClientCommand = new GetClientCommand(commandPayloadX, commandMeta);

    const { commandPayload  } = getClientCommand.get()
    const client = await getClient(commandPayload?.dni)
    if (client?.delete) {
        throw new ErrorHandled(`User not found.`, {
			code: 'USER_NOT_FOUND'
        })
    }
    getClientCommand.validateResponse(client);
    return {
        body: client
    }
}