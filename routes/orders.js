const router = require('express').Router();
const orders = require('../controllers/orders');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all orders for a specific user
router.get('/user/:username/order', orders.getAllOrders);

// Get a specific order by ID
router.get('/user/:username/order/:id', orders.getOrderById);

// Create a new order for a specific user
router.post('/user/:username/order', isAuthenticated, validation.saveOrder, orders.createOrder);

// Update a specific grocery item in an order
router.put('/user/:username/order/grocery/:groceryId', isAuthenticated, validation.groceryValidation, orders.updateGroceryItem);

// Delete a specific grocery item from an order
router.delete('/user/:username/order/grocery/:groceryId', isAuthenticated, orders.deleteGroceryItem);

module.exports = router;