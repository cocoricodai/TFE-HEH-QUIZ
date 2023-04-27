const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../../controllers/v1/auth.controller');

router.post('/signup', authController.signup);
router.put('/verify', authController.verifyAccount);
router.post('/signin', authController.signin);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password', authController.resetPassword);
router.put('/refresh-token', authController.refreshToken);

module.exports = router;
