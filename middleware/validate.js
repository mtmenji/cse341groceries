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

const paymentValidation = (req, res, next) => {
  const validationRule = {
    user: 'required|string',
    card_number: 'required|string',
    expiration_date: 'required|string',
    security_code: 'required|string'
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

const saveOrder = (req, res, next) => {
  const validationRule = {
    user: 'required|string',
    date: 'required|string',
    items: 'required|string'
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

module.exports = {
  userValidation,
  paymentValidation,
  saveOrder,
  saveProduct
};