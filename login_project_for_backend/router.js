const express = require("express");
const Userinfo = require('../models/User')
const router = express.Router();
router.get('/user',function(req,res){
    var sess = req.session;
    if(sess.userid){
        res.status(200).json({
            userid : sess.userid,
            useremail : sess.useremail,
            username : sess.username,
        });
    }else{
        res.json({"success":"not login"})
    }
});
router.post("/login",function(req,res) {
    if((req.body.userid != '')&&(req.body.password != '')){
        sess = req.session;
        Userinfo.findOne({"userid":req.body.userid},function(err,user){
            if(err){
                throw Error
            }
            if(!user){
                return res.json({"success":"not user"});
            }else{
                Userinfo.comparePassword(req.body.password,function(err,result){
                    if(err){
                        throw Error;
                    }
                    if(result[result] = "ismatch"){
                        sess.username = req.body.username;
                        sess.userid = req.body.userid;
                        sess.useremail = req.body.useremail;
                        return res.json({"success":"user login"});
                    }else{
                        return res.json({"success":"dose not match"});
                    }
                })
            }
        });
    }else{
        return res.json({"success":"fill all item"});
    }
});

router.post('/logout',function(req,res){
    sess = req.session;
    if(sess.userid){
        req.session.destroy(function(err){
            if(err){
                throw Error
            }else{
                return res.json({"success":"logout success"})
            }
        })
    }else{
        return res.json({"success":"logout failed"})
    }
    return res.json({"success":"logout success"});
});

router.post('/register',function(req,res){
    if((req.body.userid != '')&&(req.body.password != '')&&(req.body.useremail != '')){
        if(req.body.password == req.body.password_check){
            Userinfo.find({"userid":req.body.userid},function(err,user){
                if(err){
                    throw Error
                }
                if(user.length!=0){
                    return res.json({"success":"user already exist"})
                }else{
                    const user = new User({"userid":req.body.userid,"username":req.body.username,"password":req.body.password,"useremail":req.body.useremail});
                    user.save((err,doc) => {
                        if(err) throw Error
                        return res.status(200).json({"success":"submit"})
                    })
                }
            });
        }else{
            return res.json({"success":"password does not match password_check"})
        }
    }else{
        return res.json({"success":"fill the all blank"})
    }
});


module.exports = router;