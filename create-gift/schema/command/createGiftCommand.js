const {
    DownstreamCommand
} = require('ebased/schema/downstreamCommand');

class createGiftCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'CREATE_GIFT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
                PK: {
                    type: String,
                    required: true
                },
                dni: {
                    type: String,
                    required: true
                },
                gift: {
                    type: String,
                    required: true
                },
            },
            responseSchema: {
                gift: {
                    type: String,
                    required: true
                },
            },
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SCHEMA OF USER'
                },
            }
        })
    }
}

module.exports = {
    createGiftCommand
};