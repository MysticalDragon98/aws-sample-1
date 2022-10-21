const { getClients } = require("../service/clientService");


module.exports = async (commandPayloadX, commandMeta) => {


    const clients = await getClients();
    return {
        body: clients
    }
}