const express = require('express');
const router = express.Router();

const paymentsController = require('../controllers/payments')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', paymentsController.getAll);
router.get('/:id', paymentsController.getSingle);
router.post("/", isAuthenticated, validation.paymentValidation, paymentsController.createPayment);
router.put("/:id", isAuthenticated, validation.paymentValidation, paymentsController.updatePayment);
router.delete("/:id", isAuthenticated, paymentsController.deletePayment);

module.exports = router;