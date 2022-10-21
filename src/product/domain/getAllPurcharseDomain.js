const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getClient,
    getPurcharses
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

    const purcharses = await getPurcharses(commandPayloadX?.productId);

    return {
        body: purcharses
    }
}