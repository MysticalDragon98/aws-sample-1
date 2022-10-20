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
    const payload = JSON.parse(commandPayload.Message);
    new CreateGiftValidation(payload, commandMeta);

    const response = await updateUserWithGift(new createGiftCommand(payload, commandMeta));

    return {
        body: {
            message: "creaate succesfully",
            payload: response
        }
    }
}