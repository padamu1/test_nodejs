var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userid: String,
	userpw: String,
	useremail: String});

module.exports = mongoose.model('userinfo',userSchema);
