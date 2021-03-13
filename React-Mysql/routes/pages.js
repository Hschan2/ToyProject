const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

router.get('/boardList', authController.boardList, (req, res) => {
    res.render('boardList', {
        user: req.user,
        board: req.board,
    });
});

router.get('/boardWrite', authController.isLoggedIn, (req, res) => {
    res.render('boardWrite', {
        user: req.user,
    });
});

router.get('/boardRead', authController.boardRead, (req, res) => {

    res.render('boardRead', {
        user: req.user,
        board: req.board,
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// router.get('/auth/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));


router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        const id = req.user.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
            ),
            httpOnly: true
        };

        console.log('페이스북 로그인');
        res.cookie('jwt', token, cookieOptions);
        res.status(201).redirect('/');
    }
);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// router.get('/auth/google/callback', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const id = req.user.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
            ),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(201).redirect('/');
    }
);

router.get('/auth/naver', passport.authenticate('naver', {
    scope: ['profile', 'email', 'displayName']
}));

router.get('/auth/naver/callback', passport.authenticate('naver', { failureRedirect: '/login' }),
    (req, res) => {
        const id = req.user.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
            ),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(201).redirect('/');
    }
);

router.get('/auth/kakao', passport.authenticate('kakao', {
    scope: ['account_email profile', 'gender profile', 'age_range profile', 'birthday profile']
}));

router.get('/auth/kakao/callback', passport.authenticate('kakao', { failureRedirect: '/login' }),
    (req, res) => {
        const id = req.user.id;

        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
            ),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(201).redirect('/');
    }
);

module.exports = router;