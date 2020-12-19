const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../model/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) { // email or password 데이터가 없을 때
        return res.status(400).render('login', {
            message: '이메일과 비밀번호를 입력해주세요.'
        })
    }

    db.start.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        const isMatch = await bcrypt.compare(password, results[0].password);

        if( !results || !isMatch ) {
            res.status(401).render('login', {
                message: '이메일과 비밀번호가 틀립니다.'
            })
        } else {
            const id = results[0].id;

            // 쿠키와 세션 대신 토큰 기반 인증 방식
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            console.log(token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect("/"); // index.hbs로
        }
    });
};

exports.register = (req, res) => {
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // 위를 간단하게
    const { name, email, password, passwordConfirm } = req.body;

    db.start.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
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

        db.start.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
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