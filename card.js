
const DynamoDB = require('aws-sdk/clients/dynamodb');


const REGION = 'us-east-1';
const YEAR = 1000 * 60 * 60 * 24 * 365;


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


//utils 
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

exports.handler = async (event, context, callback) => {
    if (event?.Records) {
        const queue = JSON.parse(event?.Records[0].body);
        try {

            const dateInit = new Date(queue?.birthday).getTime();
            const dateNow = new Date().getTime();

            const card = {
                cardNumber: Math.floor(Math.random() * 1000000000000000),
                expireDate: randomDate(new Date(2022, 4, 1), new Date()),
                cvv: Math.floor(Math.random() * 1000),
                cardType: (dateNow - dateInit) < 45 * YEAR ? "CLASSIC" : "GOLD",
            }
            
            await updateUserWithCard("card", queue?.sk, card);
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