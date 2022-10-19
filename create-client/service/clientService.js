const dynamo = require('ebased/service/storage/dynamo');



const createClient = async (getClientCommand) => {
    const {
        commandPayload
    } = getClientCommand.get()
    return await dynamo.getItem({
        TableName: process.env.DYNAMOTABLE,
        Item: commandPayload
    });
}


const getClient = async (getClientCommand) => {
    const {
        commandPayload
    } = getClientCommand.get()
    await dynamo.getItem({
        TableName: process.env.DYNAMOTABLE,
        Item: {

            Key: {
                dni: {
                    "S": commandPayload.dni
                }
            }
        }
    });
}

module.exports = {
    getClient,
    createClient
}