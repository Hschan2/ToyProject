const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');

// router.get('/', authController.isLoggedIn, (req, res) => {
//   console.log("inside");
//   res.render('index');
// });

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user,
    });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    // 로그인이 되어 있으면 profile 페이지로
    if(req.user) {
        res.render('profile', {
            user: req.user
        });
        // 로그인이 되어 있지 않으면 로그인 페이지로
    } else {
        res.redirect('/login');
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/withdrawal', authController.isLoggedIn, (req, res) => {
    res.render('withdrawal', {
        user: req.user,
    });
});

router.get('/update', authController.isLoggedIn, (req, res) => {
    res.render('update', {
        user: req.user,
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
}));

module.exports = router;