const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증처리를 하는 곳

    //client cookie에서 token을 가져옴
    let token = req.cookies.x_auth;
    //token을 복호화한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();
    });
    
}

module.exports = { auth }; 