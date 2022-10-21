const {
    createGiftCommand
} = require('../schema/command/createGiftCommand');
const {
    CreateGiftValidation
} = require('../schema/input/creategiftValidation');
const {
    updateUserWithGift
} = require('../service/giftService');

module.exports = async (commandPayload, commandMeta) => {
    const _payload = JSON.parse(commandPayload.Message);
    const payload = {
        dni: _payload.dni,
        birthday: _payload.birthday
    };
    new CreateGiftValidation(payload, commandMeta);

    const response = await updateUserWithGift(new createGiftCommand(payload, commandMeta));

    return {
        body: {
            message: "succesfully created",
            payload: response
        }
    }
}