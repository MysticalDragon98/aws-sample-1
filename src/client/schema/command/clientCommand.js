const {
    DownstreamCommand
} = require('ebased/schema/downstreamCommand');

class SnsClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'SNS_CLIENT',
            payload: payload,
            meta: meta,
            requestSchema: {
                dni: {
                    type: String,
                    required: true
                },
                birthday: {
                    type: Date,
                    required: true
                }
            },
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SNS OF USER'
                },
            }
        })
    }
}


const getClientResponseSchema = {
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
    points: {
        type: Number,
        required: false
    },

    card: {
        type: Object,
        required: false
    },
    gift: {
        type: String,
        required: false
    }
}

class CreateClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'CREATE_CLIENT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
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
            responseSchema: getClientResponseSchema,
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SCHEMA OF USER'
                },
            }
        })
    }
}
class GetClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'GET_CLIENT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
                dni: {
                    type: String,
                    required: true
                }
            },
            responseSchema:  getClientResponseSchema,
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SCHEMA OF USER'
                },
            }
        })
    }
}

class DeleteClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'DELETE_CLIENT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
                dni: {
                    type: String,
                    required: true
                }
            },
            responseSchema:  {
                message: {
                    type: String,
                    require: true
                }
            },
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SCHEMA OF USER'
                },
            }
        })
    }
}
class UpdateClientCommand extends DownstreamCommand {
    constructor(payload, meta) {
        super({
            type: 'UPDATE_CLIENT_COMMAND',
            payload: payload,
            meta: meta,
            requestSchema: {
                name: {
                    type: String,
                    required: false
                },
                lastname: {
                    type: String,
                    required: false
                },
                birthday: {
                    type: Date,
                    required: false
                }
            },
            responseSchema: getClientResponseSchema,
            errorCatalog: {
                'INVALID_BASE_ERROR': {
                    code: 'ERROR IN SCHEMA OF USER'
                },
            }
        })
    }
}

module.exports = {
    CreateClientCommand,
    UpdateClientCommand,
    GetClientCommand,
    SnsClientCommand,
    DeleteClientCommand
};