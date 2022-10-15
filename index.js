const AWS = require('aws-sdk');

//set region 
AWS.config.update({
    region: 'us-east-1'
});

//intance dynamo db
const dynamo = new AWS.DynamoDB();
const sqs = new AWS.SQS();
//Create User 

//random date

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const createUser = async (userDto, messaeCardg, gift) => {
    const dni = userDto.dni;
    delete userDto.dni;
    
    
    
    const dto = {
        TableName: "JuanCamilo-Client",
        Item:  AWS.DynamoDB.Converter.marshall({PK: "USER", SK: dni, ...userDto})
    }

    try {
        await dynamo.putItem(dto).promise();
    } catch (error) {
        console.log("PUTITEM ", JSON.stringify(error))
    }

    try {
        const paramsGift = {
            MessageBody: JSON.stringify(gift),
            QueueUrl: process.env.SQSURLGIFT
        }
        await sqs.sendMessage(paramsGift).promise();
        const paramsCard = {
            MessageBody: JSON.stringify(messaeCardg),
            QueueUrl: process.env.SQSURLCARD
        }
        await sqs.sendMessage(paramsCard).promise();
    } catch (error) {
        console.log("PUTITEM ", JSON.stringify(error))
    }

    return "ok";
}

const updateUser = async (attribute, sk, value) => {
    
    if(typeof value === 'object'){
      value =  AWS.DynamoDB.Converter.marshall(value)
    }
    const dto = {
        TableName: "JuanCamilo-Client",
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

    console.log("updateItem", JSON.stringify(dto) )
    return dynamo.updateItem(dto).promise();
}


exports.handler = async (event) => {

    if (event?.Records) {
        const qeue = JSON.parse(event?.Records[0].body);

        const attribute = qeue?.type;
        await updateUser(attribute, qeue?.sk, qeue?.value);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "update was succesfully"
            })
        }
    }

    const dateInit = new Date(event?.birthday).getFullYear();
    const dateNow = new Date().getFullYear();

    if (dateNow - dateInit < 18 || dateNow - dateInit > 68) {
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Usuario debe ser mayor de 18 o menor de 68 años."
            })
        }
    }


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

    const createuser = await createUser(event, card, {
        value: gift,
        sk: event?.dni
    });
    return {
        statusCode: 201,
        body: JSON.stringify(createuser)
    }

}