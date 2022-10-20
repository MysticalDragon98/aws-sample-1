const dynamo = require('ebased/service/storage/dynamo');
const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getCardByuser
} = require('../helper');

const updateUserWithCard = async (getCardCommand) => {
    const {
        eventPayload
    } = getCardCommand.get();
    const params = {
        TableName: process.env.DYNAMOTABLE,
        Key: {
            PK: "USER",
            dni: eventPayload.dni
        },
        UpdateExpression: `set #card = :card`,
        ExpressionAttributeNames: {
            '#card': 'card'
        },
        ExpressionAttributeValues: {
            ':card': getCardByuser(eventPayload?.birthday)
        },
    }
    return dynamo.updateItem(params).catch(err => {
        throw new ErrorHandled(err.message)
    });
}


module.exports = {
    updateUserWithCard
}