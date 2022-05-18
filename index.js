const express = require('express')
const app = express()

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const config = require('./server/config/key');

const { auth } = require('./server/middleware/auth');

const { User } = require('./server/models/User');

app.use(cookieParser());

//client에서 보낸 application/x-www-form-urlencoded를 분석해서 가져옴
app.use(bodyParser.urlencoded({extend: true}));

//application/json
app.use(bodyParser.json()); 

//mongoDB와 app을 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hi everyone')
})

app.get('/api/hello', (req, res) => {
    res.send("안녕하세요.");
});

app.post('/api/users/register', (req, res) => {

  // 회원가입시 필요한 정보들을 client에 서 가져오면
  // DB에 저장

    const user = new User(req.body);

    user.save((err, userInfo) => {
      if(err) return res.json({ successs: false, err});
      //request 요청 수행 완료(200)
      return res.status(200).json({
        success: true
      })
    });
});

app.post('/api/users/login', (req, res) => {
   
  //요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        });
    }
    
    //요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인.

    user.comparePassword(req.body.password, (err, isMatch) => {
        if(err) console.log(err);
        if(!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});

        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);

          //토큰을 저장함(쿠키)
          res.cookie("x_auth",user.token)
          .status(200)
          .json({loginSuccess: true, userId: user._id});
        });
    })
  });

});

app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는건 Authentication이 True
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
      { token: ""},
      (err, user) => {
        if(err) return res.json({sucess: false, err});
        return res.status(200).send({
          success: true
        });
      }
      )
});

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  