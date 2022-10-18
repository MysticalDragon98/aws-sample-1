const SQSClient = require('aws-sdk/clients/sqs');
const DynamoDB = require('aws-sdk/clients/dynamodb');

//? Instance Dependencies
const REGION = 'us-east-1';
const YEAR = 1000 * 60 * 60 * 24 * 365;
const SQSURLGIFT = process.env.SQSURLCARD;
const SQSURLCARD = process.env.SQSURLGIFT;

const dynamo = new DynamoDB({
    region: REGION
});
const sqs = new SQSClient({
    region: REGION
});

//? Helper Functions

function parseBody(data) {
    return DynamoDB.Converter.marshall(data);
}

function putItem(tableName, data) {

    return dynamo.putItem({
        TableName: tableName,
        Item: parseBody(data)
    })
}

function error(msg) {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: msg
        })
    }
}

const createUser = async (userDto) => {
    await putItem(process.env.DYNAMOTABLE, {
        PK: "USER",
        dni: userDto.dni,
        name: userDto.name,
        lastname: userDto.lastname,
        birthday: userDto.birthday
    }).promise();

    await sns.publish({
        Message: JSON.stringify(userDto),
        TopicArn: process.env.CLIENT_TOPIC,
    }).promise();
}


exports.handler = async (event) => {

    event = JSON.parse(event.body);

    if (typeof event !== 'object') return error("Body must be of type object.");
    if (!event.name) return error("name must be of type string.");
    if (!event.lastname) return error("lastname must be of type string.");
    if (!event.birthday) return error("birthday must be of type string and in the format MM-DD-AAAA.");
    if (!event.dni) return error("dni must be of type string.");

    try {
        const user = await dynamo.getItem({
            TableName: "juanTorres-Client",
            Key: {
                dni: {
                    "S": event.dni
                }
            }
        }).promise();
        if (user.Item) return error("User already exists with the same dni.");
    } catch (error) {}




    const dateInit = new Date(event?.birthday).getTime();
    const dateNow = new Date().getTime();

    if ((dateNow - dateInit) < 18 * YEAR || dateNow - dateInit > 68 * YEAR)
        return error("Usuario debe ser mayor de 18 o menor de 68 años.");

    try {
        await createUser(event);

        return {
            statusCode: 201,
            body: "ok"
        }
    } catch (exc) {
        return error(exc.message);
    }

}