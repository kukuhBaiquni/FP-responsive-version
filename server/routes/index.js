var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var Comment = require('../models/comment')
var jwtDecode = require('jwt-decode');
var path = require('path');

router.get('/', function(req, res, next) {
  res.send('server\'s up')
});

module.exports = router;
