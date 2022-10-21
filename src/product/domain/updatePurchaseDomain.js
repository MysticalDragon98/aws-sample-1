const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getfinalPrice
} = require('../helper');
const {
    UpdateProductValidation
} = require('../schema/input/productValidation');
const {
    getClient,
    getPurcharse,
    updatePurcharse
} = require('../service/productService');
module.exports = async (commandPayload, commandMeta) => {
    new UpdateProductValidation(commandPayload, commandMeta);
    const user = await getClient(commandPayload?.dni);
    if (!user) {
        throw new ErrorHandled(`User not found.`, {
			code: 'USER_NOT_FOUND'
        })
    }

    if (user?.delete) {
        throw new ErrorHandled(`User not found.`, {
			code: 'USER_NOT_FOUND'
        })
    }

    const purcharse = await getPurcharse(commandPayload?.productId, commandPayload?.dni);
    if (!purcharse) {
        throw new ErrorHandled(`Purcharse not found.`, {
            status: 400
        })
    }
    if (purcharse?.delete) {
        throw new ErrorHandled(`Purchase not found.`, {
            status: 400
        })
    }


    const products = commandPayload.products.map((product) => ({
        ...product,
        finalPrice: getfinalPrice(user?.card?.cardType, product?.price)
    }))
    const Total_value = products.reduce((acc, cur) => acc + cur?.finalPrice, 0)


    const purchase = await updatePurcharse({
        products,
        Total_value
    }, commandPayload?.productId)


    return {
        body: {
            message: "purchase update succesfully",
            payload: purchase
        }
    }
}