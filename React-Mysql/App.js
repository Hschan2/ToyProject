const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

const app = express();

// 데이터 베이스 설정
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

// Css
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// View 연결
app.set('view engine', 'hbs');

// Mysql 연결
db.connect((err) => {
    if(err) console.log(err);
    else console.log("Mysql Connected");
});

// 출력
app.get("/", (req, res) => {
    // res.send("<h1>Home Page</h1>");
    res.render("index");
});

// 서버 연결
app.listen(5000, () => {
    console.log("Server started on Port 5000")
});