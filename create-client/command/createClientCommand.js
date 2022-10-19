const {
    DownstreamCommand
} = require('ebased/schema/downstreamCommand');

class createClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'CREATE_CLIENT_COMMAND',
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
                name: {
                    type: String,
                    required: true
                },
                lastname: {
                    type: String,
                    required: true
                },
                birthday: {
                    type: Date,
                    required: true
                },

            },
            responseSchema: {
                name: {
                    type: String,
                    required: true
                },
                lastname: {
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
    createClientCommand
};