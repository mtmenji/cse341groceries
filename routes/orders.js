const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');

router.post('/user/:username/order', ordersController.createOrder);
router.get('/user/:username/order', ordersController.getOrder);
router.put('/user/:username/order/grocery/:groceryId', validation.groceryValidation, ordersController.addOrUpdateGrocery);
router.delete('/user/:username/order/grocery/:groceryId', ordersController.deleteGrocery);

module.exports = router;