var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var Comment = require('../models/comment')
var Resep = require('../models/resep')
var jwtDecode = require('jwt-decode');
var path = require('path');
var User = require('../models/user')

// '/api/finalp/user/register'
router.post('/register', function(req, res){

  const newUser = new User({
    userid : req.body.userid,
    namadepan : req.body.namadepan,
    namabelakang : req.body.namabelakang,
    email : req.body.email,
    password : req.body.password,
    joined : Date.now(),
    fotoprofil: 'initialfp.jpg'
  })

  let toToken = {
    userid: req.body.userid,
    namadepan: req.body.namadepan,
    namabelakang: req.body.namabelakang,
    email: req.body.email,
  }
  let token = jwt.sign(toToken, 'gabonlatoz', {})

  newUser.save(function(err, user){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }else{
      res.json({
        status : 'Success',
        user : user,
        token: token
      })
    }
  })
})

router.post('/uploadfp', function(req, res){
  let imageFile = req.files.file
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`
  var token = req.body.token
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (err) {
      res.json({
        status: 'Tercyduk'
      })
    }else{
      var luser = decoded.userid
      imageFile.mv(`${destination}/${filename}.jpg`, function(err){
        if (err) {
          return res.status(500).send(err);
        }
        User.findOne({userid: luser}, function(err, user){
          if (err) {
            res.json({
              status: 'Failed',
              message: 'error when updated to database'
            })
          }else if(user){
            user.update({$set: {fotoprofil: `${filename}.jpg`}}).exec(function(err, gabon){
              user.save(function(err){
                if (err) {
                  res.json({
                    status: 'Tercyduk'
                  })
                }else{
                  res.json({
                    status: 'Success',
                    data : user
                  })
                }
              })
            })
          }else{
            res.json({
              status: 'Failed',
              message: 'cannot found the specified data'
            })
          }
        })
      })
    }
  })

})

router.get('/alluser', function(req, res){
  User.find({}, function(err, users){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }else{
      res.json({
        status: 'Success',
        user: users
      })
    }
  })
})

//LOAD SPECIFIC USER
router.get('/:token', function(req, res){
  let token = req.params.token;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        status: 'Someone trying to hack our system'
      })
    }else{
    var decoded = jwtDecode(token);
      User.find({userid: decoded.userid}, function(err, user){
        if (err) {
          res.json({
            status: 'Failed'
          })
        }
        if (!user) {
          res.json({
            status: 'User doesn\'t exist'
          })
        }
        if (user) {
          res.json({
            status: 'Success',
            user : user
          })
        }
      })
    }
  })
})

router.post('/login', function(req, res, next){
  let data = {
    email: req.body.email,
    password: req.body.password
  }

  User.find(data, function(err, user){
    if (err) {
      res.json({
        status: 'Failed, try again later'
      })
    }

    if (!user) {
      res.json({
        status: 'User doesn\'t exist!'
      })
    }

    if (user) {
      let toToken = {
        userid:user[0].userid,
        namadepan:user[0].namadepan,
        namabelakang:user[0].namabelakang,
        email:user[0].email,
        created:user[0].created
      }
      let token = jwt.sign(toToken, 'gabonlatoz', {})
      res.json({
        status: 'Success',
        user: user,
        token: token
      })
    }
  })
})

module.exports = router;
