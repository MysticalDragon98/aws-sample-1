const sns = require('ebased/service/downstream/sns');

module.exports = async (getClientCommand) => {
    const {
        commandPayload,
        commandMeta
    } = getClientCommand.get();
    delete commandPayload?.PK
    return sns.publish({
        Message: commandPayload,
        TopicArn: process.env.CLIENT_TOPIC,
    }, commandMeta)
}