const {
    InputValidation
} = require('ebased/schema/inputValidation');

class CreateClientValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'CLIENT.CREATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                name: {
                    type: String,
                    required: true
                },
                lastname: {
                    type: String,
                    required: true
                },
                dni: {
                    type: String,
                    required: true
                },
                birthday: {
                    type: Date,
                    required: true
                },

            },
        })
    }
}

module.exports = {
    CreateClientValidation
};