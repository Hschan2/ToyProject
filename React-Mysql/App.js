const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// For A oAuth
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
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

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
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