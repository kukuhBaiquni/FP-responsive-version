var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  userid : Number,
  namadepan : String,
  namabelakang : String,
  email : String,
  password : String,
  joined : Number,
  fotoprofil : String,
  liking: [Number],
  favorite: [Number],
  message: {content: String, created: Number},
})

module.exports = mongoose.model('User', user)
