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

    const queue = event.Records.map((record) => JSON.parse(record.body)?.Message);




    for (let item of queue) {
        item = JSON.parse(item);
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
            await updateUserWithGift("gift", item?.dni, gift);

            console.log("update")
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "update was succesfully"
                })
            }
        } catch (error) {
            console.log("errpr ", JSON.stringify(error))
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: error
                })
            }
        }

    }

}