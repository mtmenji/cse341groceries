const express = require('express');
const router = express.Router();

const paymentsController = require('../controllers/payments')
const validation = require('../middleware/validate')

router.get('/', paymentsController.getAll);
router.get('/:id', paymentsController.getSingle);
router.post("/", validation.paymentValidation, paymentsController.createPayment);
router.put("/:id", validation.paymentValidation, paymentsController.updatePayment);
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;