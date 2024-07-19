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

// Update a specific grocery item in an order
router.put('/:id', isAuthenticated, validation.groceryValidation, orders.updateGroceryItem);

// Delete a specific grocery item from an order
router.delete('/:id', isAuthenticated, orders.deleteGroceryItem);

module.exports = router;