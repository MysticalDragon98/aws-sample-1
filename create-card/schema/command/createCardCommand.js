const {
    DownstreamEvent
} = require('ebased/schema/downstreamEvent');

class createCardCommand extends DownstreamEvent {
    constructor(payload, meta) {
        super({
            type: 'CREATE_CARD_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
                dni: {
                    type: String,
                    required: true
                },
                card: {
                    type: Object,
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
                    code: 'ERROR IN SCHEMA OF CARD'
                },
            }
        })
    }
}

module.exports = {
    createCardCommand
}