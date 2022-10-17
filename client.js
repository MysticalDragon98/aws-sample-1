const SQSClient = require('aws-sdk/clients/sqs');
const DynamoDB = require('aws-sdk/clients/dynamodb');

//? Instance Dependencies
const REGION = 'us-east-1';
const YEAR = 1000 * 60 * 60 * 24 * 365;
const SQSURLGIFT = process.env.SQSURLCARD;
const SQSURLCARD =  process.env.SQSURLGIFT;

const dynamo = new DynamoDB({ region: REGION});
const sqs = new SQSClient({ region: REGION });

//? Helper Functions
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function parseBody (data) {
    return DynamoDB.Converter.marshall(data);
}

function putItem (tableName, data) {
    return dynamo.putItem({
        TableName: tableName,
        Item: parseBody(data)
    })
}

function error (msg) {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: msg
        })
    }
}

const createUser = async (userDto, card, gift) => {
    const dni = userDto.dni;

    await putItem("juanTorres-Client", {
        dni: dni,
        name: userDto.name,
        lastname: userDto.lastname,
        birthday: userDto.birthday
    }).promise();
    
    await sqs.sendMessage({
        MessageBody: JSON.stringify(gift),
        QueueUrl: SQSURLGIFT
    }).promise();

    await sqs.sendMessage({
        MessageBody: JSON.stringify(card),
        QueueUrl: SQSURLCARD
    }).promise();
}


exports.handler = async (event) => {
    
    if (typeof event !== 'object') return error("Body must be of type object.");
    if (!event.name) return error("name must be of type string.");
    if (!event.lastname) return error("lastname must be of type string.");
    if (!event.birthday) return error("birthday must be of type string and in the format MM-DD-AAAA.");
    if (!event.dni) return error("dni must be of type string.");

    const user = await dynamo.getItem({
        TableName: "juanTorres-Client",
        Key: {
            dni: {"S": event.dni }
        }
    }).promise();

    if(user.Item) return error("User already exists with the same dni.");

    const dateInit = new Date(event?.birthday).getTime();
    const dateNow = new Date().getTime();

    if ((dateNow - dateInit) < 18 * YEAR || dateNow - dateInit > 68 * YEAR)
        return error("Usuario debe ser mayor de 18 o menor de 68 años.");


    const card = {
        value: {
            cardNumber: Math.floor(Math.random() * 1000000000000000),
            expireDate: randomDate(new Date(2022, 4, 1), new Date()),
            cvv: Math.floor(Math.random() * 1000),
            cardType: dateNow - dateInit < 45 ? "CLASSIC" : "GOLD",
        },
        sk: event?.dni
    }

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

    try {
        await createUser(event, card, gift);

        return {
            statusCode: 201,
            body: "ok"
        }
    } catch (exc) {
        return error(exc.message);
    }

}