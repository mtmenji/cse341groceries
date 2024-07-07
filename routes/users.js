const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users')
const validation = require('../middleware/validation')

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post("/", validation.userValidation, usersController.createUser);
router.put("/:id", validation.userValidation, usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;