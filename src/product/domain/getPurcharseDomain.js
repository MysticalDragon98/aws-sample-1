const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    getPurcharse,
} = require('../service/productService');
const {
    GetProductValidation
} = require('../schema/input/productValidation');

module.exports = async (commandPayloadX, commandMeta) => {
    new GetProductValidation(commandPayloadX, commandMeta);

    const user = await getClient(commandPayloadX?.dni);
    if (!user) {
        throw new ErrorHandled(`User not exists.`, {

        })
    }

    if (user?.delete) {
        throw new ErrorHandled(`User was deleted!`, {

        })
    }

    const purcharse = await getPurcharse(commandPayloadX?.productId, commandPayloadX?.dni, user);

    if (purcharse?.delete) {
        throw new ErrorHandled(`Purchase was deleted!`, {

        })
    }

    return {
        body: purcharse
    }
}