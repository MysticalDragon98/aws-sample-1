const dynamo = require('ebased/service/storage/dynamo');
const {
    ErrorHandled
} = require('ebased/util/error');
const {
    getGiftByuser
} = require('../helper');

const updateUserWithGift = async (getClientCommand) => {
    const {
        eventPayload
    } = getClientCommand.get();
    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni: eventPayload.dni
        },
        UpdateExpression: `set #gift = :gift`,
        ExpressionAttributeNames: {
            '#gift': 'gift'
        },
        ExpressionAttributeValues: {
            ':gift': getGiftByuser(eventPayload.birthday)
        },
    }
    return dynamo.updateItem(params).catch(err => {
        throw new ErrorHandled(err.message)
    });
}


module.exports = {
    updateUserWithGift
}