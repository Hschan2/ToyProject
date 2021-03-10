const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');

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

// 'auth/boardList'
router.post('/boardList', authController.boardList);

// 'auth/boardList'
router.post('/boardWrite', authController.boardWrite);

// 'auth/boardRead'
router.post('/boardRead', authController.boardRead);

// 'auth/facebook'
// router.post('/facebook', passport.authenticate('facebook', { session: false }), authController.facebook);

module.exports = router;