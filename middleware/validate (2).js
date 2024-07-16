const validator = require('../../helpers/validate');

const saveProduct = (req, res, next) => {
    const validationRule = {
    name: 'required|string',
    category: 'required|string',
    description: 'required|string',
    price: 'required|numeric',
    unit: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { saveProduct };