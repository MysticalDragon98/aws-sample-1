const dynamo = require('ebased/service/storage/dynamo');
const { uuid } = require('uuidv4');
const {
    ErrorHandled
} = require('ebased/util/error');

const getClient = async (dni) => {
    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni
        },
    }

    console.log("per user", params)
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

const createPurchase = async (createPayload) => {
   
const params = {
    TableName: process.env.DYNAMOTABLEPRODUCT,
    Item: {
        PK:"PURCHASE",
        SK: uuid(),
        ...createPayload,
        delete: false
    }
}
   return await dynamo.putItem(params).then(e => e?.Item).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "CREATE PURCHASE"
        })
    });

}

const getPurcharse =async (SK, dnix, user)=> {
    const params = {
        TableName: process.env.DYNAMOTABLEPRODUCT,
        Key: {
            PK: "PURCHASE",
            SK
        },
    }
    const payload = await dynamo.getItem(params).then( r => {
       
        if(r?.Item){
            const { delete: D,  PK , dni, ...Image}  = r?.Item;

            if(dni !== dnix){
                return undefined
            }

            if(D){
                return { delete: D, ...Image};
            }
            return {...user , ...Image}
        }
        return r?.Item;

    }  ).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "GET AN PURCHASE"
        })
    });

    return payload
}

const getPurcharses =async ()=> {
    const params = {
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
            ":PK": "PURCHASE"
        },
        TableName: process.env.DYNAMOTABLEPRODUCT,
    }
    const payload = await dynamo.queryTable(params).then( r => {
        return r.Items.filter((purchase) => {
            const {
                delete: D,
            } = purchase;

            if (D) {
                return false
            }
            return true
        }).map((purchase) => {
            const {
                delete: D,
                PK,
                ...Image
            } = purchase;
            return Image
        })


    }  ).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "GET PURCHASES"
        })
    });

    return payload
}


const updatePurcharse =async (commandPayload , sk)=> {
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
        TableName: process.env.DYNAMOTABLEPRODUCT,
        Key: {
            PK: "PURCHASE",
            SK: sk
        },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues
    }
    console.log("UPDATE PARAMS", params)

    return await dynamo.updateItem(params).then(e => e?.Item).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "UPDATE PURCHASE"
        })
    });
}


const deletePurchase = async (SK) => {
    const params = {
        TableName: process.env.DYNAMOTABLEPRODUCT,
        Key: {
            PK: "PURCHASE",
            SK
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
            code: "UPDATE PURCHASE"
        })
    });

    return {
        message: "Purchase was deleted"
    }
}


const updatePoints = async (dni, points) => {
    const params = {
        TableName: process.env.DYNAMOTABLECLIENT,
        Key: {
            PK: "USER",
            dni
        },
        UpdateExpression: `set #points = :points`,
        ExpressionAttributeNames: {
            '#points': 'points'
        },
        ExpressionAttributeValues: {
            ':points': points
        },
    }

    await dynamo.updateItem(params).catch(err => {
        throw new ErrorHandled(err.message, {
            status: 500,
            code: "UPDATE USER"
        })
    });

    return;
}


module.exports = {
    getClient,
    createPurchase, 
    getPurcharse,
    updatePurcharse,
    deletePurchase,
    updatePoints,
    getPurcharses
}