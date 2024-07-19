const router = require('express').Router();
const productsController = require('../controllers/products');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

router.post('/', validation.saveProduct, productsController.addProduct);
router.put('/:id', validation.saveProduct, productsController.updateproduct);
router.delete('/:id', productsController.deleteproduct);

module.exports = router;