const router = require("../../blockCrawl_backend/src/routes/users");
const { userInfo } = require("os");

router.post("/login",function(req,res) {
    if((req.body.username != '')&&(req.body.password != '')){
        UserInfo.findOne({"userid":req.body.username},function(err,user){
            if(!user){
                return res.json({"success":"not user"})
            }else{
                if(user.userpw == req.body.password){
                    return res.json({"success":"user login"})
                }else{
                    return res.json({"success":"password incorrect"})
                }
            }
        })
    }else{
        return res.json({"success":"fill all item"})
    }
})

router.post('logout',function(req,res){
    return res.json({"success":"logout success"})
})