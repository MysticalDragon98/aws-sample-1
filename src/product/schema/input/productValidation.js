const {
    InputValidation
} = require('ebased/schema/inputValidation');


class CreateProductValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'PRODUCT.CREATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                dni: {
                    type: String,
                    required: true
                },
                products: {
                    type: Array,
                    required: true
                }
            },
        })
    }
}


class GetProductValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'PRODUCT.GET_ALL',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                dni: {
                    type: String,
                    required: true
                }
            },
        })
    }
}

class UpdateProductValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            type: 'PRODUCT.UPDATE',
            specversion: 'v1.0.0',
            source: meta.source,
            payload: payload,
            schema: {
                dni: {
                    type: String,
                    required: true
                },
                productId: {
                    type: String,
                    required: true
                },
                products: {
                    type: Array,
                    required: true
                }
            },
        })
    }
}



module.exports = {
    CreateProductValidation,
    GetProductValidation,
    UpdateProductValidation
};