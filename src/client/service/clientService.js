const dynamo = require('ebased/service/storage/dynamo');
const {
    ErrorHandled
} = require('ebased/util/error');

const createClient = async (createPayload) => {
   
    const {
        commandPayload
    } = createPayload.get();
    await dynamo.putItem({
        TableName: process.env.DYNAMOTABLECLIENT,
        Item: {
            PK:"USER",
            ...commandPayload,
            delete: false,
            points: 0
        }
    }).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "CREATE USER"
        })
    });
    return getClient(commandPayload?.dni);
}


const getClient = async (dni) => {
    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni
        },
    }
    const payload = await dynamo.getItem(params).then( r => {
       
        if(r?.Item){
            const { delete: D,  PK , ...Image}  = r?.Item;

            if(D){
                return { delete: D, ...Image};
            }
            return Image
        }
        return r?.Item;

    }  ).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "GET AN USER"
        })
    });

    return payload
}

const updateClient = async (dni, { commandPayload }) => {
    let UpdateExpression = 'set ';
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    Object.keys(commandPayload).forEach((key, i) => {
        if (i === 0) {
            UpdateExpression += `#${key} = :${key}`;
        } else {
            UpdateExpression += `, #${key} = :${key}`;
        }

        ExpressionAttributeNames[`#${key}`] = key;
        ExpressionAttributeValues[`:${key}`] = commandPayload[key];
    })


    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni: dni
        },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues
    }

    await dynamo.updateItem(params).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "UPDATE USER"
        })
    });

    return getClient(dni)
}


const deleteClient = async (dni) => {
    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni
        },
        UpdateExpression: `set #delete = :delete`,
        ExpressionAttributeNames: {
            '#delete': 'delete'
        },
        ExpressionAttributeValues: {
            ':delete': true
        },
    }

    await dynamo.updateItem(params).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "UPDATE USER"
        })
    });

    return {
        message: "Was deleted"
    }
}

module.exports = {
    getClient,
    createClient,
    updateClient,
    deleteClient
}