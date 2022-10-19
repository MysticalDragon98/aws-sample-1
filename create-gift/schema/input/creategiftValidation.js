const {
    InputValidation
} = require('ebased/schema/inputValidation');

class CreateGiftValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'GIFT.CREATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                PK: {
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
    CreateGiftValidation
};