const sns = require('ebased/service/downstream/sns');

module.exports = async (getClientCommand) => {
    const {
        commandPayload,
        commandMeta
    } = getClientCommand.get();

    return sns.publish({
        Message: commandPayload,
        TopicArn: "arn:aws:sns:us-east-1:610955275297:juanTorres-dev-create-topic" // process.env.CLIENT_TOPIC,
    }, commandMeta)
}