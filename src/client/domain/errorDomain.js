const {
    ErrorHandled
} = require('ebased/util/error');

module.exports = async (commandPayload, commandMeta) => {
    throw new ErrorHandled("Route Not Found", { status: 404})
}