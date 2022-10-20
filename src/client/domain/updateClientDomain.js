const {
    UpdateClientCommand, SnsClientCommand
} = require('../schema/command/clientCommand');
const {
    UpdateCLientValidation
} = require('../schema/input/clientValidation');
const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    updateClient
} = require('../service/clientService');
const snsService = require('../service/snsService');

module.exports = async (commandPayload, commandMeta) => {



    new UpdateCLientValidation(commandPayload, commandMeta);
    const {
        dni,
        ...payload
    } = commandPayload;
    const validateIfuserExists = await getClient(dni);
    if (!validateIfuserExists) {
        throw new ErrorHandled(`User not exists.`, {
            code: 'UPDATE_USER',
        })
    }

    if (validateIfuserExists?.delete) {
        throw new ErrorHandled(`User was deleted!`, {
            code: 'UPDATE_USER',
        })
    }


    const validationPayloadCommand = new updateClientCommand(payload, commandMeta);

    const response = await updateClient(dni, validationPayloadCommand.get());

    validationPayloadCommand.validateResponse(response);

    if(payload?.birthday){
        await snsService(new snsClientCommand({
            dni: commandPayload?.dni,
            birthday: response?.birthday
        }, commandMeta))
    }




    return {
        body: response
    }
}