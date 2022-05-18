const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function(next){
    let user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        //salt를 생성
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) 
                return next(err);
            //salt로 암호화
            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) 
                    return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

});

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 와 암호화된 DB상 비밀번호 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;
    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })

}

userSchema.statics.findByToken = function (token, callback) {
    //Token Decoding
    let user = this;
    jwt.verify(token, "secretToken", function (error, decoded) {
      //유저 아이디 이용해 유저 찾은 후,
      //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일지하는지 확인.
      user.findOne({ _id: decoded, token: token }, function (error, user) {
        if (error) return callback(error);
        callback(null, user);
      });
    });
  };

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};