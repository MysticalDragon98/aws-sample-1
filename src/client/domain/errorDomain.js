const {
    ErrorHandled
} = require('ebased/util/error');

module.exports = async (commandPayload, commandMeta) => {
    return {
        status: 404,
        body: {
            message: "Route not found"
        }
    }
}