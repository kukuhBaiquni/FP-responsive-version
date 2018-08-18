'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const User = require('../models/user');
const Resep = require('../models/resep');
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const should = chai.should();
chai.use(chaiHTTP);

describe('users', function(){

  beforeEach(function(done){
    done();
  })

  afterEach(function(done){
    done()
  })
  var token = '';

  it('Add user should have response status 200 & type JSON', function(done){
    chai.request(server)
    .post('/api/finalp/users/register')
    .send({userid : 1528045517419})
    .send({namadepan : 'usertest123'})
    .send({namabelakang : 'usertest123'})
    .send({email : 'user@123.test'})
    .send({password : 'secretpassword'})
    .send({created : '22-05-2018'})
    .end(function(err, res){
      token = jwt.sign({data: res.body.user}, 'gabonlatoz', {})
      res.should.have.status(200)
      res.should.be.json;
      res.body.status.should.equal('Success');
      res.body.user.should.be.a('object');
      done();
    })
  })

  it('Load all users should have response status 200 & type array', function(done){
    chai.request(server)
    .get('/api/finalp/users/alluser')
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      done()
    })
  })

  // it('uploading user profile picture', function(done){
  //   chai.request(server)
  //   .post('/api/finalp/users/uploadfp')
  //   .set('Content-Type', 'multipart/form-data')
  //   .field('token', token)
  //   .attach('files', 'C:/Users/user/Downloads/FP/DENEW.png')
  //   .end(function(err, res){
  //     res.should.have.status(200)
  //     res.should.be.json;
  //     res.body.status.should.equal('Success')
  //     done()
  //   })
  // })

  it('Load specific user should have status 200 & type array', function(done){
    chai.request(server)
    .get(`/api/finalp/users/${token}`)
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      done()
    })
  })

  it('Login should have response status 200', function(done){
    chai.request(server)
    .post('/api/finalp/users/login')
    .send({email: 'user@123.test'})
    .send({password: 'secretpassword'})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.user.should.be.a('array')
      res.body.should.have.property('token')
      done()
    })
  })

  //===========================================RESEP==================================================================

  // it('Add resep should have response status 200 & type array', function(done){
  //   chai.request(server)
  //   .post('/api/finalp/resep/tambahresep')
  //   .write('Content-Disposition: form-data; name="image"; filename="'+'filename.jpg'+'"\r\n')
  //   .write('Content-Type: image/png\r\n')
  //   .write('\r\n')
  //   .send({resepid: 1999999999})
  //   .
  //   .end((err, res)=>{
  //     res.should.have.status(200)
  //     res.should.be.json;
  //     res.body.status.should.equal('Success')
  //     done()
  //   })
  // })

  it('Load All Recipe should have response status 200 and type array', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, res)=>{
      res.should.have.status(200)
      res.should.be.json;
      res.body.resep.should.be.a('array')
      res.body.status.should.equal('Success')
      done()
    })
  })

  it('Load specific Recipe should have response status 200 and type array', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, res)=>{
      chai.request(server)
      .get('/api/finalp/resep/resepdetail/' + res.body.resep[0].resepid)
      .end((err, data)=>{
        data.should.have.status(200)
        data.should.be.json;
        data.body.should.be.a('object')
        data.body.status.should.equal('Success')
        done()
      })
    })
  })

  it('Load user Recipe should have response status 200 & data type array', function(done){
    chai.request(server)
    .get('/api/finalp/resep/myrecipe/' + token)
    .end((err, res)=>{
      res.should.have.status(200)
      res.should.be.json;
      res.body.data.should.be.a('array')
      res.body.status.should.equal('Success')
      done()
    })
  })

  //=================================================COMMENT & LIKE=====================================

  it('Load comments of a recipe should have status 200 & data type array', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, res)=>{
      chai.request(server)
      .get('/api/finalp/likeandcomment/loadcomment/' + res.body.resep[0].resepid)
      .end((err, res)=>{
        res.should.have.status(200)
        res.should.be.json;
        res.body.comment.should.be.a('array')
        res.body.status.should.equal('Success')
        done()
      })
    })
  })

  it('Submiting user comment should have status 200', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, res)=>{
      chai.request(server)
      .post('/api/finalp/likeandcomment/submitcomment')
      .send({resepid: res.body.resep[res.body.resep.length-1].resepid})
      .send({userid: 291380823})
      .send({username: 'Master Gabon'})
      .send({userfoto: 'initialfp.jpg'})
      .send({content: 'This is valuable comment'})
      .send({created: '22-2-2012'})
      .end((err, res)=>{
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.status.should.equal('Success')
        done()
      })
    })
  })

  it('Submiting user favourite should have status 200', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, resep)=>{
      chai.request(server)
      .get('/api/finalp/users/alluser')
      .end((err, res)=>{
        chai.request(server)
        .post('/api/finalp/likeandcomment/submitlike')
        .send({userid: res.body.user[0].userid})
        .send({resepid: resep.body.resep[resep.body.resep.length-1].resepid})
        .end((err, res)=>{
          res.should.have.status(200)
          res.should.be.json;
          res.body.status.should.equal('Liking Success')
          done()
        })
      })
    })
  })

  it('Unliking a content should have status 200', function(done){
    chai.request(server)
    .get('/api/finalp/resep/allresep')
    .end((err, resep)=>{
      chai.request(server)
      .get('/api/finalp/users/alluser')
      .end((err, res)=>{
        chai.request(server)
        .post('/api/finalp/likeandcomment/unliking')
        .send({userid: res.body.user[0].userid})
        .send({resepid: resep.body.resep[resep.body.resep.length-1].resepid})
        .end((err, res)=>{
          res.should.have.status(200)
          res.should.be.json;
          res.body.status.should.equal('Unliking Success')
          done()
        })
      })
    })
  })

})
