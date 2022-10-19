const DynamoDB = require('aws-sdk/clients/dynamodb');
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
            PK: {
                S: "USER"
            },
            dni: {
                S: payload.dni
            }

        },
        ReturnConsumedCapacity: "TOTAL"
    }
    const dynamoxx = new DynamoDB();
    return dynamoxx.getItem(params).promise().catch(e => undefined)
    //no funciona correctamente para traer un Item. 
    // return dynamo.getItem(params).then(e=> console.log( "result sucess ", e)).catch(err => console.log("ERRROR GETITEM => ", err));
}

module.exports = {
    getClient,
    createClient
}