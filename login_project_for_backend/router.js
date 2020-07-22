const router = require("../../blockCrawl_backend/src/routes/users");
const { userInfo } = require("os");

router.post("/login",function(req,res) {
    if((req.body.username != '')&&(req.body.password != '')){
        UserInfo.findOne({"userid":req.body.username},function(err,user){
            if(err){
                throw res.json(err);
            }
            if(!user){
                throw res.json({"success":"not user"})
            }else{
                if(user.userpw == req.body.password){
                    return res.json({"success":"user login"})
                }else{
                    throw res.json({"success":"password incorrect"})
                }
            }
        })
    }else{
        throw res.json({"success":"fill all item"})
    }
})

router.post('/logout',function(req,res){
    return res.json({"success":"logout success"})
})

router.post('/register',function(req,res){
    if((req.body.username != '')&&(req.body.password != '')&&(req.body.useremail != '')){
        if(req.body.password == req.body.password_check){
            Userinfo.find({"userid":req.body.username},function(err,user){

            })
        }
    }
})