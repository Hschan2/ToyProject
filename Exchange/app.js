// const http = require('http');
const express = require('express');
const { request } = require('http');
const app = express();
// const server = createServer(app);
// const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3000;
const apiUrl = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=lqnoRB6bPy49PWbH5KuV2dZwLfdSLT2s&data=AP01';

// 모든 도메인에 CORS 허용
// app.use(cors());
// 특정 도메인에 CORS 허용
// app.use(cors(corsOptions));

// for CSS, Javascript files
// app.use(express.static(__dirname + "/"));

// index.html을 기본페이지로
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// 404에러 발생 시 사용할 페이지
// app.use((req, res) => {
//     res.sendFile(__dirname + "/404.html");
// })

app.use(bodyParser.json());

app.get('/', (req, res) => {
    request(apiUrl, (err, res, body) => {
        if (body == null) console.log(err);

        // API 호출 결과값을 Route 결과로 전달 (json 형식으로 전달)
        res.json(body);
        console.log(body);
    })
})

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log("포트 3000으로 연결되었습니다.");
});