const {
    createClientCommand
} = require('../schema/command/createClientCommand');
const {
    CreateClientValidation
} = require('../schema/input/createClientValidation');
const {
    FaultHandled
} = require('ebased/util/error');
const {
    getClient,
    createClient
} = require('../service/clientService');
const snsService = require('../service/snsService');

module.exports = async (commandPayload, commandMeta) => {
    console.log("LLEGO HASTA AQUI")
    new CreateClientValidation(commandPayload, commandMeta);
    const validateIfuserExists = await getClient(commandPayload);
    if (validateIfuserExists) {
        throw new FaultHandled(`Error user exists!`, {
            code: 'CREATE_USER',
            layer: 'DOMAIN'
        });
    }

    const response = await createClient(new createClientCommand({
        PK: "USER",
        ...commandPayload
    }, commandMeta));


    await snsService(new createClientCommand({
        PK: "USER",
        ...commandPayload
    }, commandMeta))


    return {
        body: response
    }
}