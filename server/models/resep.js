var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resep = new Schema({
  resepid : Number,
  created: Number,
  namaresep : String,
  penulis : Number,
  namapenulis: String,
  bahan : [String],
  langkah: [String],
  gallery: [String],
  like: {type: Number, default: 0},
  likedby: [Number],
  favorite: {type: Number, default: 0},
  favoriteby: [Number],
  foto: String,
  comment: {type: Number, default: 0},
  kategori: String,
  fotopenulis: String,
  kesan: String,
  key: String,
})

module.exports = mongoose.model('Resep', resep)
