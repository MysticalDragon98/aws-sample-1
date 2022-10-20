const {
    DownstreamEvent
} = require('ebased/schema/downstreamEvent');

class createGiftCommand extends DownstreamEvent {
    constructor(payload, meta) {
        super({
            type: 'CREATE_GIFT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
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
                    code: 'ERROR IN SCHEMA OF GIFT'
                },
            }
        })
    }
}

module.exports = {
    createGiftCommand
};