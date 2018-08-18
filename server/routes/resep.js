var express = require('express');
var router = express.Router();
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var Comment = require('../models/comment')
var Resep = require('../models/resep')
var jwtDecode = require('jwt-decode');
var path = require('path');


// '/api/finalp/resep/'
router.get('/allresep/:offset', function(req, res){
  let p = req.params.offset;
  let x = p * 20
  let y = 20 * Number(p)

  Resep.find().sort({resepid: -1}).limit(20).skip(y).exec(function(err, resep){
    if (err) {
      res.json({
        status: 'Tercyduk',
        message: 'error level 1'
      })
    }else{
      Resep.count().exec(function(err, total){
        if (err) {
          res.json({
            status: 'Tercyduk',
            message: 'error level 2'
          })
        }else{
          let pages = Math.ceil(total/20)
          res.json({
            status: 'Success',
            resep: resep,
            summary: {
              pages: pages,
              currentPage: p,
              totalResep: total
            }
          })
        }
      })
    }
  })
})

//getResepdetail
router.get('/resepdetail/:resepid', function(req, res){
  let resepid = req.params.resepid
  Resep.find({resepid}, function(err, resep){
    if (err) {
      res.json({
        status: 'Failed',
        message: 'request timed out'
      })
    }else{
      User.find({userid: resep[0].penulis}, function(err, user){
        if (err) {
          res.json({
            status: 'Tercyduk'
          })
        }else{
          res.json({
            status: 'Success',
            resep: resep
          })
        }
      })
    }
  })
})

router.post('/tambahresep', function(req, res){
  var resource = req.body.penulis
  var decode = jwtDecode(resource)
  var penulis = decode.userid
  var namapenulis = decode.namadepan.concat(' ' + decode.namabelakang)
  var imageFile = req.files
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`
  let bahan = [];
  let langkah = [];

  if (typeof req.body.bahan === 'string') {
    bahan.push(req.body.bahan)
  }else{
    req.body.bahan.map(x=> bahan.push(x))
  }
  if (typeof req.body.langkah === 'string') {
    langkah.push(req.body.langkah)
  }else{
    req.body.langkah.map(x=> langkah.push(x))
  }

  if (!decode || decode === undefined || decode === '' || penulis === undefined) {
    res.json({
      status: 'Failed'
    })
  }else{
    const newResep = new Resep({
      resepid: req.body.resepid,
      created: Date.now(),
      namaresep: req.body.nama,
      penulis: penulis,
      namapenulis: namapenulis,
      bahan: bahan,
      langkah: langkah,
      gallery: [],
      like: 0,
      likedby: [],
      foto: '',
      comment: 0,
      kategori: req.body.kategori,
      fotopenulis: req.body.fotopenulis,
      kesan: req.body.kesan,
      key: req.body.nama.trim().toLowerCase()
    })

    newResep.save(function(err, resep){
      if (err) {
        res.json({status: 'Tercyduk'})
      }else{
        imageFile.foto.mv(`${destination}/${filename}.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }else{
            return new Promise(
              (resolve, reject) => {
                resep.update({$set: {foto: `${filename}.jpg`}}).exec(function(err, ok){
                  resep.save(function(err){
                    if (err) {
                      reject(res.json({status: 'Tercyduk'}))
                    }else{
                      resolve(res.json({status: 'OK', resep: resep}))
                    }
                  })
                })
              }
            )
          }
        })
      }
    })


    // newResep.save(function(err, resep){
    //   if (err) {
    //     res.json({
    //       status: 'Failed, try again later'
    //     })
    //   }else{
    //     if (typeof req.body.bahan === 'string') {
    //       resep.bahan.push(req.body.bahan)
    //     }else{
    //       req.body.bahan.map(x=> resep.bahan.push(x))
    //     }
    //     if (typeof req.body.langkah === 'string') {
    //       resep.langkah.push(req.body.langkah)
    //     }else{
    //       req.body.langkah.map(x=> resep.langkah.push(x))
    //     }
    //     imageFile.foto.mv(`${destination}/${filename}.jpg`, function(err) {
    //       if (err) {
    //         return res.status(500).send(err);
    //       }
    //       resep.update({$set: {foto: `${filename}.jpg`}}).exec(function(err, gabon){
    //         resep.save(function(err){
    //           if (err) {
    //             res.json({
    //               status: 'Tercyduk'
    //             })
    //           }else{
    //             User.findOne({userid: penulis}, function(err, user){
    //               resep.update({$set: {fotopenulis: user.fotoprofil}}).exec(function(err, jadi){
    //                 if (err) {
    //                   res.json({
    //                     status: 'K.O'
    //                   })
    //                 }else{
    //                   res.json({
    //                     status: 'Success',
    //                     resep : resep
    //                   })
    //                 }
    //               })
    //             })
    //           }
    //         })
    //       })
    //     })
    //   }
    // })
  }
})

router.put('/gallery/:resepid', function(req, res, next){
  let resepid = req.params.resepid
  let imageFile = req.files.file
  let destination = path.join(__dirname, '../public/images')
  let filename = `${Date.now()}img`

  imageFile.mv(`${destination}/${filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    Resep.findOne({resepid}, function(err, resep){
      if (err) {
        res.json({
          status: 'Failed',
          message: 'error when updated to database'
        })
      }else if(resep){
        resep.gallery.push(filename)
        resep.save(function(){
          res.json({file: `images/${filename}.jpg`});
        })
      }else{
        res.json({
          status: 'Failed',
          message: 'cannot found the specified data'
        })
      }
    })
  })
})



router.get('/myrecipe/:token', function(req, res){
  let token = req.params.token
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    if (decoded === undefined) {
      res.json({
        status: 'Someone trying to hack our system'
      })
    }else{
      let penulis = decoded.userid
      Resep.find({penulis}).count().exec(function(err, total){
        if (err) {
          res.json({status: 'Tercyduk'})
        }else{
          Resep.find({penulis}).sort({resepid: -1}).limit(21).skip(0).exec(function(err, recipes){
            if (err) {
              res.json({
                status: 'Failed'
              })
            }else if (!recipes) {
              res.json({
                status: 'User belum pernah menulis resep'
              })
            }else{
              res.json({
                status: 'Success',
                data: recipes,
                total: total
              })
            }
          })
        }
      })
    }
  })
})

router.get('/loadmoreresep/:token/:stage', function(req, res){
  let token = req.params.token;
  let stage = req.params.stage;
  jwt.verify(token, 'gabonlatoz', function(err, decoded){
    let penulis = decoded.userid
    let skip = 21 * stage
    Resep.find({penulis}).sort({resepid: -1}).limit(21).skip(skip).exec(function(err, resep){
      if (err) {
        res.json({
          status: 'Failed'
        })
      }else if (!resep) {
        res.json({
          status: 'No resep found'
        })
      }else{
        res.json({
          status: 'Success',
          resep: resep
        })
      }
    })
  })
})

router.post('/searching', function(req, res){
  let mode = req.body.mode;
  let p = req.body.offset
  let x = p * 20
  let y = 20 * Number(p)

  if (mode === 'manual') {
    let query = req.body.query.trim().toLowerCase();
    Resep.find({key: {$regex: '.*' + query + '.*'}}).count().exec(function(err, total){
      if (err) {
        res.json({
          status: 'Tercyduk'
        })
      }else{
        Resep.find({key: {$regex: '.*' + query + '.*'}}).sort({resepid: -1}).limit(20).skip(y).exec(function(err, resep){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else{
            let pages = Math.ceil(total/20)
            res.json({
              status: 'Success',
              resep: resep,
              summary: {
                pages: pages,
                currentPage: p,
                totalResep: total,
                query: query,
                mode: mode
              }
            })
          }
        })
      }
    })
  }else{
    let query = req.body.query
    Resep.find({kategori: query}).count().exec(function(err, total){
      if (err) {
        res.json({
          status: 'Tercyduk'
        })
      }else{
        Resep.find({kategori: query}).sort({resepid: -1}).limit(20).skip(y).exec(function(err, resep){
          if (err) {
            res.json({
              status: 'Tercyduk'
            })
          }else{
            let pages = Math.ceil(total/20)
            res.json({
              status: 'Success',
              resep: resep,
              summary: {
                pages: pages,
                currentPage: p,
                totalResep: total,
                query: query,
                mode: mode
              }
            })
          }
        })
      }
    })
  }
})

// DELETING
router.post('/myrecipe/:resepid', function(req, res){
  let resepid = req.params.resepid

  Resep.deleteOne({resepid}, function(err){
    if (err) {
      res.json({
        status: 'Failed'
      })
    }
  })
})

module.exports = router;
