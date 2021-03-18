const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const bcrypt = require('bcryptjs');

// For A oAuth
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const config = require('./model/oAuth');

dotenv.config({
    path: './.env'
});

// 데이터 베이스 설정
const db = require('./model/db');

// 자바스크립트, CSS 등 정적 파일 설정
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse Url-Encoded Bodies (sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

// View 연결 (.hbs Files)
app.set('view engine', 'hbs');

// Mysql 연결
db.start.connect((err) => {
    if(err) console.log(err);
    else console.log("Mysql Connected");
});

// oAuth
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log('serializeUser', user);
    done(null, user.authid);
});

passport.deserializeUser((authid, done) => {
    console.log('deserializeUser', authid); // id 불러오는지 확인
    
    db.start.query('SELECT * FROM users WHERE authid = ?', [authid], (err, results) => {
        if(err) {
            console.log(err);
            done('회원정보가 없습니다.');
        } else {
            console.log("회원정보가 있습니다.");
            done(null, results[0]);
        }
    });
});

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'name', 'displayName'],
    }, function (accessToken, refreshToken, profile, done) {
       console.log(profile);

       const authid = 'facebook' + profile.id;

       db.start.query('SELECT * FROM users WHERE authid = ?', [authid], async (err, results) => {
            if(results.length > 0) {
                done(null, results[0]);
            } else {
                let hashedPassword = await bcrypt.hash(authid, 8);

                const newUser = {
                    'authid': authid,
                    'name': profile.displayName,
                    'email': profile.emails[0].value,
                    'password': hashedPassword,
                }

                db.start.query('INSERT INTO users SET ?', { authid: newUser.authid, name: newUser.name, email:newUser.email, password: newUser.password }, (err, results) => {
                    if(err) {
                        console.log(err);
                        done('Error');
                    } else {
                        done(null, newUser);
                    }
                })
            }
       });
    }

    // function(accessToken, refreshToken, profile, done) {
    //     return done(null, profile);
    // }
));

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL,
    passReqToCallback: true,
    }, function (req, accessToken, refreshToken, profile, done) {
       console.log(profile);

       const authid = 'google' + profile.id;

       db.start.query('SELECT * FROM users WHERE authid = ?', [authid], async (err, results) => {
            if(results.length > 0) {
                done(null, results[0]);
            } else {
                let hashedPassword = await bcrypt.hash(authid, 8);

                const newUser = {
                    'authid': authid,
                    'name': profile.displayName,
                    'email': profile.emails[0].value,
                    'password': hashedPassword,
                }

                db.start.query('INSERT INTO users SET ?', { authid: newUser.authid, name: newUser.name, email:newUser.email, password: newUser.password }, (err, results) => {
                    if(err) {
                        console.log(err);
                        done('Error');
                    } else {
                        done(null, newUser);
                    }
                })
            }
       });
    }
));

passport.use(new NaverStrategy({
    clientID: config.naverAuth.clientID,
    clientSecret: config.naverAuth.clientSecret,
    callbackURL: config.naverAuth.callbackURL,
    }, function (req, accessToken, refreshToken, profile, done) {
       console.log(profile);

       const authid = 'naver' + profile.id;

       db.start.query('SELECT * FROM users WHERE authid = ?', [authid], async (err, results) => {
            if(results.length > 0) {
                done(null, results[0]);
            } else {
                let hashedPassword = await bcrypt.hash(authid, 8);
                
                const newUser = {
                    'authid': authid,
                    'name': profile.displayName,
                    'email': profile.emails[0].value,
                    'password': hashedPassword,
                }

                db.start.query('INSERT INTO users SET ?', { authid: newUser.authid, name: newUser.name, email:newUser.email, password: newUser.password }, (err, results) => {
                    if(err) {
                        console.log(err);
                        done('Error');
                    } else {
                        done(null, newUser);
                    }
                })
            }
       });
    }
));

passport.use(new KakaoStrategy({
    clientID: config.kakaoAuth.clientID,
    callbackURL: config.kakaoAuth.callbackURL,
    }, function (req, accessToken, refreshToken, profile, done) {
       console.log(profile);

       const authid = 'kakao' + profile.id;

       db.start.query('SELECT * FROM users WHERE authid = ?', [authid], async (err, results) => {
            if(results.length > 0) {
                done(null, results[0]);
            } else {
                let hashedPassword = await bcrypt.hash(authid, 8);

                const newUser = {
                    'authid': authid,
                    'name': profile.displayName,
                    'email': profile._json.kakao_account.email,
                    'password': hashedPassword,
                }

                db.start.query('INSERT INTO users SET ?', { authid: newUser.authid, name: newUser.name, email:newUser.email, password: newUser.password }, (err, results) => {
                    if(err) {
                        console.log(err);
                        done('Error');
                    } else {
                        done(null, newUser);
                    }
                })
            }
       });
    }
));

// Router 사용하기 전

// index.hbs 출력
// app.get("/", (req, res) => {
//     // res.send("<h1>Home Page</h1>");
//     res.render("index");
// });

// app.get("/register", (req, res) => {
//     res.render("register");
// });

// Router 설정
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// 서버 연결
app.listen(5000, () => {
    console.log("Server started on Port 5000")
});