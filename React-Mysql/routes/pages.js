const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

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

module.exports = router;