const {
    CreateClientCommand, SnsClientCommand
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
const snsService = require('../service/snsService');

module.exports = async (commandPayload, commandMeta) => {
    new CreateClientValidation(commandPayload, commandMeta);
    const validateIfuserExists = await getClient(commandPayload?.dni);
    if (validateIfuserExists) {
        throw new ErrorHandled(`Error user exists!`, {
            code: 'CREATE_USER',
            layer: 'CLIENT_DOMAIN'
        })
    }

    if (validateIfuserExists?.delete) {
        throw new ErrorHandled(`User exists! was innactive, please active your user. `, {
            code: 'CREATE_USER',
            layer: 'CLIENT_DOMAIN'
        })
    }

    const response = await createClient(new CreateClientCommand(commandPayload, commandMeta));


    await snsService(new SnsClientCommand({
        dni: commandPayload?.dni,
        birthday: commandPayload?.birthday
    }, commandMeta))


    return {
        body: {
            message: "creaate succesfully",
            payload: response
        }
    }
}