const DynamoDB = require('aws-sdk/clients/dynamodb');


const REGION = 'us-east-1';
const dynamo = new DynamoDB({
    region: REGION
});
const updateUserWithGift = async (attribute, dni, value) => {
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
                S: value
            },
        },
    }
    return dynamo.updateItem(dto).promise();
}


exports.handler = async (event, context, callback) => {
    if (event?.Records) {
        const queue = JSON.parse(event?.Records[0].body);
        try {
            const getSeason = d => Math.floor((d.getMonth() / 12 * 4)) % 4
            const season = ['Summer', 'Autumn', 'Winter', 'Spring'][getSeason(new Date())];

            let gift = '';
            switch (season) {
                case "Summer":
                    gift = "remera"
                    break;
                case "Autumn":
                    gift = "buzo"
                    break;
                case "Winter":
                    gift = "sweater"
                    break;
                case "Spring":
                    gift = "camisa"
                    break;
            }
            await updateUserWithGift("gift", queue?.dni, gift);
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