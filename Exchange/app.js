// const http = require('http');
const express = require('express');
const app = express();
// const server = createServer(app);
const cors = require('cors');

const PORT = 3000;

// 특정 도메인에 CORS 허용
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionSuccessStatus: 200,
    methods: 'GET'
}

// 모든 도메인에 CORS 허용
app.use(cors(corsOptions));
// 특정 도메인에 CORS 허용
// app.use(cors(corsOptions));

// for CSS, Javascript files
app.use(express.static(__dirname + "/"));

// index.html을 기본페이지로
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// 404에러 발생 시 사용할 페이지
app.use((req, res) => {
    res.sendFile(__dirname + "/404.html");
})

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
});