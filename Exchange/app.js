const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const ejs = require('ejs');

const PORT = 3000;
const apiUrl = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=lqnoRB6bPy49PWbH5KuV2dZwLfdSLT2s&data=AP01';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

// API 호출 결과값을 Route 결과로 전달 (json 형식으로 전달)
// request가 아닌 app의 res로 보내야 한다. (request에서 json 형식은 없다.)

app.get("/", (req, res) => {
    res.render("index.html");
})

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log("포트 3000으로 연결되었습니다.");
});