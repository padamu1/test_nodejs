module.exports = function(app,Userinfo)
{
	app.get('/',function(req,res){
		var sess = req.session;
		res.render('index',{
			username : sess.username,
			logincheck : sess.logincheck
		})
	});
	app.post('/login', function(req, res){ //login function
        	var sess; //session variable
        	sess = req.session; //initial session		
		if(sess.logincheck==0) sess.logincheck = 1;
		if((req.body.username != '')&&(req.body.password != '')){
			Userinfo.findOne({"userid":req.body.username},function(err,user){
				if(!user) {
					console.log("not exist");
					sess.logincheck =  0;
					res.redirect('/');					
					}
				else {
					if(user.userpw == req.body.password) {
						sess.username = req.body.username;
						console.log("correct");
						res.redirect('/');
					}else{
						sess.logincheck =  0;
						res.redirect('/');
					}
				}
			});
        	}else res.redirect('/');
	});
        app.post('/logout', function(req, res){
    	        sess = req.session;
    	        if(sess.username){
                        req.session.destroy(function(err){
                        if(err){
                                console.log(err);
                        }else{
                                res.redirect('/');
                	}
            	})
        	}else{
        	        res.redirect('/');
        	}
        });

	app.post('/register',function(req,res){
		var sess = req.session;
		res.render('regist',{
			registcheck : sess.registcheck	
		});
	});
	app.post('/regist_submit',function(req,res){
		var sess; //session variable
        	sess = req.session;
		sess.registcheck = 0;
		if(sess.logincheck!=1) sess.logincheck = 1;
		if((req.body.username != '')&&(req.body.password != '')&&(req.body.useremail != '')){
			if(req.body.password == req.body.password_check){
				Userinfo.find({"userid":req.body.username},function(err,user){
					if(user.length!=0){
						console.log("user already exist");
						
						res.render('regist',{
							registcheck : sess.registcheck	
						});
					}else{
						var users = new Userinfo();
						users.userid = req.body.username;
						users.userpw = req.body.password;
						users.useremail = req.body.useremail;
						users.save(function(err){
							if(err){
								console.error(err);
								res.json({result:0});
								return;
								}
							else{
								
								console.log("submit");
								console.log(users);
							}
						});
						sess.registcheck =1;
						res.redirect('/');
						return;		
					}
				
				});
			}else{
				sess.registcheck = 2;
				res.render('regist',{
					registcheck : sess.registcheck
				});
			}
		}else{
			res.render('regist',{
				registcheck : sess.registcheck	
			});
		}
	});
	app.post('/reset',function(req,res){
		var sess; //session variable
        	sess = req.session;
		if(sess.registcheck==0) sess.registcheck=1;
		if(sess.logincheck==0) sess.logincheck = 1;
		res.redirect('/');	
	});
	
}
