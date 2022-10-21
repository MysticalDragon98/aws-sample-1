const {
    DeleteClientCommand
} = require('../schema/command/clientCommand');

const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    deleteClient
} = require('../service/clientService');

module.exports = async (commandPayloadX, commandMeta) => {
    const getClientCommand = new DeleteClientCommand(commandPayloadX, commandMeta);

    const {
        commandPayload
    } = getClientCommand.get()

    const validateIfuserExists = await getClient(commandPayload?.dni);
    if (!validateIfuserExists) {
        throw new ErrorHandled(`User not found.`, {
			code: 'USER_NOT_FOUND'
        })
    }

    if (validateIfuserExists?.delete) {
        throw new ErrorHandled(`User is already deleted!`, {
            code: 'USER_ALREADY_DELETED',
        })
    }

    const response = await deleteClient(commandPayload?.dni)
    getClientCommand.validateResponse(response);
    return {
        body: response
    }
}