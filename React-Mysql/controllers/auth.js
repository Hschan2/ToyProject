const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../model/db');
const { promisify } = require('util');
const moment = require('moment-timezone');
const { connect } = require('http2');

exports.login = async (req, res, next) => {
    // form, submit으로 넘겨진 Parameter 값 받기 (req.body)
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
            };

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
                // return res.render('register', {
                //     message: '회원가입 성공'
                // });

                db.start.query('SELECT id FROM users WHERE email = ?', [email], (email, result) => {
                    const id = result[0].id;
                    const token = jwt.sign({id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    // httpOnly => 쿠키를 훔쳐가는 행위를 막는 방법
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
                        ),
                        httpOnly: true
                    };
                    res.cookie('jwt', token, cookieOptions);
                    res.status(201).redirect('/');
                });
            }
        })
    });

    // res.send('Form Submitted'); => 응답하는 것. 버튼을 누르면 결과로 실행 (에러가 발생 유무 상관 없이)
};

// Render Pages
exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);

    if(req.cookies.jwt) {
        try {
            // Token 확인
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 유저가 여전히 존재하는지 확인
            db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
                if(!result) return next();
                
                // 로그인한 사용자가 있을 때
                req.user = result[0];

                return next();
            });
        } catch(err) {
            return next();
        }
    } else {
        next();
    }
};

// 로그아웃
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    req.logout();
    res.status(200).redirect('/');
};

exports.update = async (req, res, next) => {
    const { name, email, password } = req.body;

    // 비밀번호 입력 안했을 시
    if(!name || !password) {
        return res.status(400).render('update', {
            message: '이름과 비밀번호를 입력해주세요.',
            name: name,
            email: email,
        })
    } else {
        if(req.cookies.jwt) {
            let hashedPassword = await bcrypt.hash(password, 8);

            try {
                // Token 확인
                const decoded = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    process.env.JWT_SECRET
                );

                db.start.query('UPDATE users SET name = ?, password = ? WHERE id = ? ', [name, hashedPassword, decoded.id], async (err, result) => {
                    res.status(201).redirect('/profile');
                });
    
                // db.start.query('SELECT * FROM users WHERE email = ?', [decoded.id], async (err, result) => {
                //     if(!result) {
                //         return next();
                //     } else {
                //         db.start.query('UPDATE users SET name = ?, password = ? WHERE id = ? ', [name, hashedPassword, decoded.id], async (err, result) => {
                //             res.status(200).redirect('/profile');
                //         });
                //     }
                // });
            } catch(err) {
                return next();
            }
        } else {
            next();
        }
    }
};

exports.withdrawal = async (req, res, next) => {
    const { password } = req.body;

    // 비밀번호 입력 안했을 시
    if(!password) {
        return res.status(400).render('withdrawal', {
            message: '비밀번호를 입력해주세요.'
        })
    } else {
        if(req.cookies.jwt) {
            try {
                // Token 확인
                const decoded = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    process.env.JWT_SECRET
                );
    
                db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], async (err, result) => {
                    if(!result) {
                        return next();
                    } else {
                        const isMatch = await bcrypt.compare(password, result[0].password);

                        if(!isMatch) {
                            res.status(401).render('withdrawal', {
                                message: '비밀번호가 틀립니다.'
                            })
                        } else {
                            db.start.query('DELETE FROM users WHERE id = ?', [result[0].id], (err, result) => {
                                res.cookie('jwt', 'loggedout', {
                                    expires: new Date(Date.now() + 10 * 1000),
                                    httpOnly: true
                                });

                                res.status(201).redirect('/');
                            });
                        }
                    }
                });
            } catch(err) {
                return next();
            }
        } else {
            next();
        }
    }
};

// boardRead 페이지에서 새로고침할 때, 조회수 증가하는 문제 방지 변수
let refreshCheck = false;

exports.boardData = async (req, res, next) => {
    const { id } = req.query;

    if(req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            if(!id) {
                refreshCheck = false;

                db.start.query('SELECT * FROM board ORDER BY date DESC', (err, result) => {
                    if(!result) return next();
            
                    req.boards = result;
                });
            } else {
                db.start.query('SELECT * FROM board WHERE id = ?', [id], (err, result) => {
                    if(!result) return next();
            
                    // result[0].date = result[0].date.toLocaleDateString() + " " + result[0].date.toLocaleTimeString();
                    result[0].date = moment(result[0].date).format("YYYY년 M월 D일 HH시 mm분");
                    req.board = result[0];
                    checkBoard = result[0].userid;
    
                    let updateCount = result[0].count;
    
                    // 조회수 증가
                    if(refreshCheck === false) updateCount = result[0].count + 1;
                    
                    // 조회수 중복 증가 방지, true면 조회수 증가 X
                    refreshCheck = true;
    
                    db.start.query('UPDATE board SET count = ? WHERE id = ? ', [updateCount, id], async (err, result) => {
                        if(!result) return next();
                    });
                });
            }

            db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
                if(!result) return next();

                req.user = result[0];

                if(id) {
                    checkUser = result[0].id;

                    if(checkBoard === checkUser) req.userid = true;
                    else req.userid = false;
                }

                return next();
            });
        } catch(err) {
            return next();
        }
    } else {
        next();
    }
}

// exports.boardList = async (req, res, next) => {
//     // 조회수 중복 증가 방지, false는 조회수 증가 가능
//     refreshCheck = false;

//     if(req.cookies.jwt) {
//         try {
//             const decoded = await promisify(jwt.verify)(
//                 req.cookies.jwt,
//                 process.env.JWT_SECRET
//             );

//             db.start.query('SELECT * FROM board', (err, result) => {
//                 if(!result) return next();
        
//                 req.board = result;
//             });

//             db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
//                 if(!result) return next();

//                 req.user = result[0];

//                 return next();
//             });
//         } catch(err) {
//             return next();
//         }
//     } else {
//         next();
//     }
// }

exports.boardWrite = async (req, res, next) => {
    const { title, password, content } = req.body;

    if(req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], async (err, result) => {
                if(err) console.log(err);

                userId = result[0].id;
                userName = result[0].name;

                db.start.query('INSERT INTO board SET ?', {userid: userId, name: userName, title: title, content: content, password: password}, async (err, result) => {
                    if(err) console.log(err);
                    
                    else res.status(201).redirect('/boardList');
                });
            });
        } catch(err) {
            return next();
        }
    }
}

// exports.boardRead = async (req, res, next) => {
//     // a 태그로 Parameter 넘겨진 값 받기 (req.query)
//     let { id } = req.query;

//     if(req.cookies.jwt) {
//         try {
//             const decoded = await promisify(jwt.verify)(
//                 req.cookies.jwt,
//                 process.env.JWT_SECRET
//             );

//             db.start.query('SELECT * FROM board WHERE id = ?', [id], (err, result) => {
//                 if(!result) return next();
        
//                 // result[0].date = result[0].date.toLocaleDateString() + " " + result[0].date.toLocaleTimeString();
//                 result[0].date = moment(result[0].date).format("YYYY년 M월 D일 HH시 mm분");
//                 req.board = result[0];
//                 checkBoard = result[0].userid;

//                 let updateCount = result[0].count;

//                 // 조회수 증가
//                 if(refreshCheck === false) updateCount = result[0].count + 1;
                
//                 // 조회수 중복 증가 방지, true면 조회수 증가 X
//                 refreshCheck = true;

//                 db.start.query('UPDATE board SET count = ? WHERE id = ? ', [updateCount, id], async (err, result) => {
//                     if(!result) return next();
//                 });
//             });

//             db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
//                 if(!result) return next();

//                 req.user = result[0];
//                 checkUser = result[0].id;

//                 if(checkBoard === checkUser) req.userid = true;
//                 else req.userid = false;

//                 return next();
//             });
//         } catch(err) {
//             return next();
//         }
//     } else {
//         next();
//     }
// }

exports.boardUpdate = async (req, res) => {
    const { id, title, content } = req.body;

    let dateUpdate = new Date();
    dateUpdate = moment(dateUpdate).format("YYYY-MM-DD HH:mm:ss");

    db.start.query('UPDATE board SET title = ?, content = ?, date = ? WHERE id = ? ', [title, content, dateUpdate, id], async (err, result) => {
        res.status(201).redirect('/boardRead?id=' + id);
    });
}

exports.boardDelete = async (req, res) => {
    const { id } = req.body;

    db.start.query('DELETE FROM board WHERE id = ?', [id], async (err, result) => {
        if(err) console.log(err);

        res.status(201).redirect('/boardList?check=true');
    });
}

exports.boardSearch = async (req, res, next) => {
    const { search } = req.body;

    if(req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.start.query('SELECT * FROM board WHERE title LIKE ? ORDER BY date DESC', ['%'+search+'%'], (err, result) => {
                if(!result) return next();
        
                req.searchResult = result;
            });

            db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
                if(!result) return next();

                req.user = result[0];

                return next();
            });
        } catch(err) {
            return next();
        }
    } else {
        next();
    }
}