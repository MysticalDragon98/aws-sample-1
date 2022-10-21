const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getfinalPrice
} = require('../helper');
const {
    CreateProductValidation
} = require('../schema/input/productValidation');
const {
    getClient,
    createPurchase,
    updatePoints
} = require('../service/productService');
module.exports = async (commandPayload, commandMeta) => {
    new CreateProductValidation(commandPayload, commandMeta);
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

    const products = commandPayload.products.map((product) => ({
        ...product,
        finalPrice: getfinalPrice(user?.card?.cardType, product?.price)
    }))

    const totalValue = products.reduce((acc, cur) => acc + cur?.finalPrice, 0)
    
    const purchase = await createPurchase({
        products,
        dni: user.dni,
        totalValue
    })

    await updatePoints(commandPayload?.dni, (user.points ?? 0) + Math.floor(totalValue / 200))

    return {
        body: {
            message: "purchase succesfully",
            payload: purchase
        }
    }
}