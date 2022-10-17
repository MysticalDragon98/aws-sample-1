
const DynamoDB = require('aws-sdk/clients/dynamodb');


const REGION = 'us-east-1';
const dynamo = new DynamoDB({ region: REGION});

const updateUserWithCard = async (attribute, sk, value) => {
    
    if(typeof value === 'object'){
      value = DynamoDB.Converter.marshall(value)
    }
    const dto = {
        TableName: "JuanTorre-Client",
        Key: {
            PK: {
                S: "USER"
            },
            SK: {
                S: sk
            },
        },
        UpdateExpression: `set #${attribute} = :${attribute}`,
        ExpressionAttributeNames:{
            [`#${attribute}`] : attribute
        },
        ExpressionAttributeValues: {
            [`:${attribute}`]: {
                ...typeof value === 'object' ? { M: value } : { S : value  }
            },
        },
    }
    return dynamo.updateItem(dto).promise();
}


exports.handler = async (event, context, callback) => {
    if (event?.Records) {
        const qeue = JSON.parse(event?.Records[0].body);
        try {
            await updateUserWithCard("card", qeue?.sk, qeue?.value);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "update was succesfully"
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: error
                })
            }
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Not Authorized"
        })
    }
}