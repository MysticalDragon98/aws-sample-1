

const { createGiftCommand } = require('../schema/command/createGiftCommand');
const { CreateGiftValidation } = require('../schema/input/creategiftValidation');
const { updateUserWithGift } = require('../service/giftService');

module.exports = async (commandPayload, commandMeta) => {
    new CreateGiftValidation(commandPayload, commandMeta);

    const response = await updateUserWithGift(new createGiftCommand({
        ...commandPayload
    }, commandMeta));

    return {
        body: {
            message: "creaate succesfully",
            payload: response
        }
    }
}