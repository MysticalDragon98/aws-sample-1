const AWS = require('aws-sdk');

//set region 
AWS.config.update({
    region: 'us-east-1'
});

//intance dynamo db
const dynamo = new AWS.DynamoDB();

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
    return dynamo.updateItem(dto).promise();
}


exports.handler = async (event) => {

    if (event?.Records) {
        const qeue = JSON.parse(event?.Records[0].body);
        await updateUser("gift", qeue?.sk, qeue?.value);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "update was succesfully"
            })
        }
    }
    return {
        statusCode: 201,
        body: JSON.stringify(createuser)
    }

}