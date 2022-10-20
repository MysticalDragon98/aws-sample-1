const dynamo = require('ebased/service/storage/dynamo');
const {
    FaultHandled
} = require('ebased/util/error');

const createClient = async (getClientCommand) => {
    const {
        commandPayload
    } = getClientCommand.get();
    return dynamo.putItem({
        TableName: process.env.DYNAMOTABLE,
        Item: commandPayload
    }).catch(err => {
        throw new FaultHandled()
    });
}


const getClient = async (payload) => {
    const params = {
        TableName: process.env.DYNAMOTABLE,
        Key: {
            PK:  "USER",
            dni:  payload.dni
        },
        ReturnConsumedCapacity: "TOTAL"
    }
    return dynamo.getItem(params).catch(err => {
        throw new FaultHandled()
    });
}

module.exports = {
    getClient,
    createClient
}