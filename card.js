const DynamoDB = require('aws-sdk/clients/dynamodb');


const REGION = 'us-east-1';
const YEAR = 1000 * 60 * 60 * 24 * 365;


const dynamo = new DynamoDB({
    region: REGION
});


const updateUserWithCard = async (attribute, dni, value) => {


    value = DynamoDB.Converter.marshall(value)

    const dto = {
        TableName: process.env.DYNAMOTABLE,
        Key: {
            PK: {
                S: "USER"
            },
            dni: {
                S: dni
            },
        },
        UpdateExpression: `set #${attribute} = :${attribute}`,
        ExpressionAttributeNames: {
            [`#${attribute}`]: attribute
        },
        ExpressionAttributeValues: {
            [`:${attribute}`]: {
                M: value
            }
        },
    }
    console.log("ENTRO AQUI")
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
                expireDate: new Date(randomDate(new Date(2022, 4, 1), new Date())).toISOString(),
                cvv: Math.floor(Math.random() * 1000),
                cardType: (dateNow - dateInit) < 45 * YEAR ? "CLASSIC" : "GOLD",
            }

            await updateUserWithCard("card", queue?.dni, card);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "update was succesfully"
                })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
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