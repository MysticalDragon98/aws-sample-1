const dynamo = require('ebased/service/storage/dynamo');
const {
    FaultHandled
} = require('ebased/util/error');
const {
    getGiftByuser
} = require('../helper');

const updateUserWithGift = async (getClientCommand) => {
    const {
        commandPayload
    } = getClientCommand.get();

    const params = {
        TableName: process.env.DYNAMOTABLE,
        Key: {
            PK: {
                S: commandPayload.PK
            },
            dni: {
                S: commandPayload.dni
            },
        },
        UpdateExpression: `set #${attribute} = :${attribute}`,
        ExpressionAttributeNames: {
            [`#${attribute}`]: attribute
        },
        ExpressionAttributeValues: {
            [`:${attribute}`]: {
                S: getGiftByuser()
            },
        },
    }

    return dynamo.updateItem(params).catch(err => {
        throw new FaultHandled()
    });
}


module.exports = {
    updateUserWithGift
}