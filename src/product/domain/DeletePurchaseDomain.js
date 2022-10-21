const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    getPurcharse,
    deletePurchase,
} = require('../service/productService');
const {
    GetProductValidation
} = require('../schema/input/productValidation');

module.exports = async (commandPayloadX, commandMeta) => {
    new GetProductValidation(commandPayloadX, commandMeta);

    const user = await getClient(commandPayloadX?.dni);
    if (!user) {
        throw new ErrorHandled(`User not found.`, {

        })
    }

    if (user?.delete) {
        throw new ErrorHandled(`User not found.`, {

        })
    }

    const purcharse = await getPurcharse(commandPayloadX?.productId, commandPayloadX?.dni, user);

    if (!purcharse) {
        throw new ErrorHandled(`Purcharse not found.`, {
            status: 400
        })
    }

    if (purcharse?.delete) {
        throw new ErrorHandled(`Purchase not found.`, {

        })
    }

    const response =  await deletePurchase(commandPayloadX?.productId)
    return {
        body: response
    }
}