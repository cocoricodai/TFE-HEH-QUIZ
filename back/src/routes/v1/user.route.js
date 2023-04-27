const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../../controllers/v1/user.controller');

// Middlewares
const auth = require('../../middlewares/auth');

router.get('/', userController.getAllUsers);
router.get('/count', userController.getUsersCount);
// Me
router.get('/me', userController.getOwnUser);
router.put('/me', userController.modifyOwnUser);
router.patch('/me', userController.modifyOwnPassword);
router.patch('/me/suspend', userController.suspendOwnAccount);

router.get('/:id', userController.getOneUser);

// Only Admin can do this
router.put('/:id', auth.isAdmin, userController.modifyOneUser);
router.delete('/:id', auth.isAdmin, userController.deleteOneUser);

module.exports = router;
