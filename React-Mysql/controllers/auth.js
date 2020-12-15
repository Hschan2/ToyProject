const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.register = (req, res) => {
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // 위를 간단하게
    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) console.log(error);

        if(results.length > 0) { // 이메일이 이미 존재할 때
            return res.render('register', {
                message: '이미 사용한 이메일입니다.'
            });
        } else if(password != passwordConfirm) { // 패스워드와 확인 패스워드가 다를 때
            return res.render('register', {
                message: '패스워드가 같지 않습니다.'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                return res.render('register', {
                    message: '회원가입 성공'
                });
            }
        })

    });

    // res.send('Form Submitted'); => 응답하는 것. 버튼을 누르면 결과로 실행 (에러가 발생 유무 상관 없이)
}