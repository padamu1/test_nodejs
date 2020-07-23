const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createBrotliCompress } = require("zlib");

const userSchema = mongoose.Schema({
    userid: {
      type: String,
      maxlength: 50,
    },
    useremail: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minglength: 5,
    },
    username: {
      type: String,
      maxlength: 50,
    },
});

userSchema.pre("save",function(next){
    var user = this;
    var new_salt = bcrypt.genSalt();
    new_password = user.password.encode('utf-8');
    hashpass = bcrypt.hashpw(new_password,new_salt);
    user.password = hashpass.decode('utf-8');
    next();
});

userSchema.methods.comparePassword = function(in_password,cb){
    bcrypt.compare(in_password,this.password,function(err,ismath){
        if(err)return cb(err);
        if (ismatch = true){
            cb({"result":"ismatch"})
        }else{
            cb({"result":"does not match"})
        }
    });
}

const User = mongoose.model("userinfo",userSchema);
module.exports = User;