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

class UpdateCLientValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'UPDATE.CREATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                name: {
                    type: String,
                    required: false
                },
                lastname: {
                    type: String,
                    required: false
                },
                dni: {
                    type: String,
                    required: true
                },
                birthday: {
                    type: Date,
                    required: false
                },

            },
        })
    }
}



module.exports =  {
    CreateClientValidation,
    UpdateCLientValidation
};