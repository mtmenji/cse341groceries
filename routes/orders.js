const router = require('express').Router();
const orders = require('../controllers/orders');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all orders for a specific user
router.get('/', orders.getAllOrders);

// Get a specific order by ID
router.get('/:id', orders.getOrderById);

// Create a new order for a specific user
router.post('/', isAuthenticated, validation.saveOrder, orders.createOrder);

// Update a specific order
router.put('/:id', isAuthenticated, validation.saveOrder, orders.updateOrder);

// Delete a specific grocery item from an order
router.delete('/:id', isAuthenticated, orders.deleteOrder);

module.exports = router;