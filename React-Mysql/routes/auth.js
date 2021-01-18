const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// 'auth/register'
router.post('/register', authController.register);

// 'auth/login'
router.post('/login', authController.login);

// 'auth/logout'
router.get('/logout', authController.logout);

// 'auth/Withdrawal'
router.post('/withdrawal', authController.withdrawal);

// 'auth/update'
router.post('/update', authController.update);

module.exports = router;