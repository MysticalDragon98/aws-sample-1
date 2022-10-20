const {
    createCardCommand
} = require('../schema/command/createCardCommand');
const {
    CreateCardValidation
} = require('../schema/input/createCardValidation');
const {
    updateUserWithCard
} = require('../service/CardService');

module.exports = async (commandPayload, commandMeta) => {
    const payload = JSON.parse(commandPayload.Message);
    new CreateCardValidation(payload, commandMeta);

    const response = await updateUserWithCard(new createCardCommand(payload, commandMeta));

    return {
        body: {
            message: "creaate succesfully",
            payload: response
        }
    }
}