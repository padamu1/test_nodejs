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
		var username = req.body.username;
	        var password = req.body.password;
		if(sess.logincheck==0) sess.logincheck = 1;
		if((username != '')&&(password != '')){
			Userinfo.findOne({"userid":req.body.username},function(err,user){
				if(!user) {
					console.log("not exist");
					sess.logincheck =  0;
					res.redirect('/');
					
					}
				else {
					if(user.userpw == password) {
						sess.username = username;
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
		res.render('regist');
	});
	app.post('/regist_submit',function(req,res){
		var sess; //session variable
        	sess = req.session;
		if(sess.logincheck==0) sess.logincheck = 1;
		var username = req.body.username;
		var password = req.body.password;
		var useremail = req.body.useremail;
		if((username != '')&&(password != '')&&(useremail != '')){
			var users = new Userinfo();
			users.userid = username;
			users.userpw = password;
			users.useremail = useremail;
			users.save(function(err){
				if(err){
					console.error(err);
					res.json({result:0});
					return;
					}
				else{
					console.log("submit");
					console.log(users);
				}});			
			res.redirect('/');
		}else{
			res.render('regist');
		}
		
	});
	app.post('/reset',function(req,res){
		var sess; //session variable
        	sess = req.session;
		if(sess.logincheck==0) sess.logincheck = 1;
		res.redirect('/');	
	});
	
}
