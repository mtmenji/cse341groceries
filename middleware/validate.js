const validator = require('../helpers/validate');

const userValidation = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email: 'required|email',
    phone: 'required|string',
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

const groceryValidation = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).send('Invalid grocery name');
  }
  if (!quantity || typeof quantity !== 'number') {
    return res.status(400).send('Invalid grocery quantity');
  }
  next();
};

module.exports = {
  userValidation,
  groceryValidation
};