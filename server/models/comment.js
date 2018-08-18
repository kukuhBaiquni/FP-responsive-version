var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comment = new Schema({
  commentid: Number,
  resepid : Number,
  userid: Number,
  username : String,
  userfoto: String,
  content : String,
  created : Number,
  reply: [{
    userid: Number,
    username: String,
    userfoto: String,
    content: String,
    created: Number,
  }],
  likecount: {type: Number, default: 0},
  likedbyC: [Number]
})

module.exports = mongoose.model('Comment', comment)
