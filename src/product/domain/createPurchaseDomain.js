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
        throw new ErrorHandled(`User not exists.`, {
            code: 'UPDATE_USER',
        })
    }

    if (user?.delete) {
        throw new ErrorHandled(`User was deleted!`, {
            code: 'GET_USER',
        })
    }

    const products = commandPayload.products.map((product) => ({
        ...product,
        finalPrice: getfinalPrice(user?.card?.cardType, product?.price)
    }))
    const Total_value = products.reduce((acc, cur) => acc + cur?.finalPrice, 0)

    
    const purchase = await createPurchase({
        products,
        dni: user.dni,
        Total_value
    })

    await updatePoints(commandPayload?.dni, Math.floor(Total_value / 200))

    return {
        body: {
            message: "purchase succesfully",
            payload: purchase
        }
    }
}