var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../models/user')
var Resep = require('../models/resep')
var Comment = require('../models/comment')
var jwtDecode = require('jwt-decode');

router.get('/liked/:token', function(req, res){
  let token = req.params.token;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        alert: 'Intruder'
      })
    }else{
      var target = []
      var userid = decoded.userid
      User.findOne({userid}, function(err, user){
        Resep.find({}, function(err, resep){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else{
            for (var i = 0; i < user.liking.length; i++) {
              resep.map(function(x){
                if (x.resepid === user.liking[i]) {
                  target.push(x)
                }
                return x
              })
            }
            res.json({
              status: 'Cool',
              liked: target
            })
          }
        })
      })
    }
  })
})

router.get('/favorited/:token', function(req, res){
  let token = req.params.token;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        alert: 'Intruder'
      })
    }else{
      var target = []
      var userid = decoded.userid
      User.findOne({userid}, function(err, user){
        Resep.find({}, function(err, resep){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else{
            for (var i = 0; i < user.favorite.length; i++) {
              resep.map(function(x){
                if (x.resepid === user.favorite[i]) {
                  target.push(x)
                }
                return x
              })
            }
            res.json({
              status: 'Cool',
              favorite: target
            })
          }
        })
      })
    }
  })
})

router.get('/loadcomment/:resepid', function(req, res){
  let resepid = req.params.resepid
  Comment.find({resepid}, function(err, comment){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else if(comment){
      res.json({
        status: 'Success',
        comment: comment
      })
    }else{
      res.json({
        status: 'Resep is missing'
      })
    }
  })
})

router.post('/submitcomment', function(req, res){
  let resepid = req.body.resepid

  const newComment = new Comment({
    resepid: req.body.resepid,
    userid : req.body.userid,
    username: req.body.username,
    userfoto: req.body.userfoto,
    content: req.body.content,
    created : req.body.created,
    reply: [],
    likecount: 0,
    likedbyC: [],
  })

  newComment.save(function(err, comment){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      Resep.find({resepid}, function(err, resep){
        if (err) {
          res.json({status: 'Tercyduk'})
        }else if(resep){
          resep[0].comment = resep[0].comment + 1
          resep[0].save(function(){
            res.json({
              status : 'Success',
              comment : comment
            })
          })
        }
      })
    }
  })
})

router.post('/submitlike', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.findOne({resepid}, function(err, resep){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else if(resep){
      resep.like = resep.like + 1
      resep.likedby.push(userid)
      resep.save(function(){
        User.findOne({userid}, function(err, user){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else if(user){
            user.liking.push(resepid)
            user.save(function(){
              res.json({
                status: 'Liking Success'
              })
            })
          }else{
            res.json({
              status: 'Tercyduk2'
            })
          }
        })
      })
    }else{
      res.json({
        status: 'Data Tercyduk'
      })
    }
  })
})

router.post('/submitfavorite', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.findOne({resepid}, function(err, resep){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else if(resep){
      resep.favorite = resep.favorite + 1
      resep.favoriteby.push(userid)
      resep.save(function(){
        User.findOne({userid}, function(err, user){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else if(user){
            user.favorite.push(resepid)
            user.save(function(){
              res.json({
                status: 'Favorite Success'
              })
            })
          }else{
            res.json({
              status: 'Tercyduk2'
            })
          }
        })
      })
    }else{
      res.json({
        status: 'Data Tercyduk'
      })
    }
  })
})

router.post('/unliking', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.update({resepid}, {$pullAll: {likedby: [userid]}}).exec(function(err, gabon){
    Resep.findOne({resepid}, function(err, resep){
      if (err) {
        res.json({
          status: 'Tercyduk'
        })
      }else if(resep){
        resep.like = resep.like -1
        resep.save(function(){
          User.update({userid}, {$pullAll: {liking: [resepid]}}).exec(function(err, master){
            res.json({
              status: 'Unliking Success'
            })
          })
        })
      }else{
        res.json({
          status: 'Resep tidak ditemukan'
        })
      }
    })
  })
})

router.post('/unfavorite', function(req, res){
  let userid = req.body.userid
  let resepid = req.body.resepid

  Resep.update({resepid}, {$pullAll: {favoriteby: [userid]}}).exec(function(err, gabon){
    Resep.findOne({resepid}, function(err, resep){
      if (err) {
        res.json({
          status: 'Tercyduk'
        })
      }else if(resep){
        resep.favorite = resep.favorite -1
        resep.save(function(){
          User.update({userid}, {$pullAll: {favorite: [resepid]}}).exec(function(err, master){
            res.json({
              status: 'Unliking Success'
            })
          })
        })
      }else{
        res.json({
          status: 'Resep tidak ditemukan'
        })
      }
    })
  })
})

module.exports = router;
