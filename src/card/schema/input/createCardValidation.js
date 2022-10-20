const {
    InputValidation
} = require('ebased/schema/inputValidation');

class CreateCardValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'CARD.CREATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
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
    CreateCardValidation
};