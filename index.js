const AWS = require('aws-sdk');

//set region 
AWS.config.update({
    region: 'us-east-1'
});

//intance dynamo db
const dynamo = new AWS.DynamoDB();

//Create User 

const createUser = async (userDto) => {
    const dni = userDto.dni;
    delete userDto.dni;
    const dto = {
        TableName: "JuanCamilo-Client",
        Item: {
            primaryKey: { S: "USER"},
            sortKey:{ S: dni} ,
            firstName: {S: userDto.firstName},
            lastName: {S: userDto.lastName},
            birthday: {S: userDto.birthday},
        }
    }
    const putItem = await  dynamo.putItem(dto).promise();
    return putItem;
}



exports.handler = async (event) => {
    try {
        const createuser = await createUser(event);
        return {
            statusCode: 201,
            body:JSON.stringify(createuser)
        }
    } catch (error) {
        return {
            statusCode: error.status || 500,
            body: JSON.stringify({message: error?.message })
        }
    }
}