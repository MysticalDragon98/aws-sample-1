const sns = require('ebased/service/downstream/sns');

module.exports = async (getClientCommand) => {
    const {
        commandPayload,
        commandMeta
    } = getClientCommand.get();

    return sns.publish({
        Message: commandPayload,
        TopicArn : process.env.CLIENT_TOPIC,
    }, commandMeta)
}