const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 movieId로 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);
        //클라이언트에 숫자 정보 보내주기
        res.status(200).json({success: true, favoriteNumber: info.length});
    });
});

router.post('/favorited', (req, res) => {

    // mongoDB에서 현재 로그인 유저가 좋아요 누른 유저 리스트에 들어있는지 확인
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info) => {
        if(err) return res.status(400).send(err);
        //클라이언트에 정보 보내주기
        let result = false;
        if(info.length !== 0){
            result = true;
        }
        res.status(200).json({success: true, favorited: result});
    });
});


module.exports = router;