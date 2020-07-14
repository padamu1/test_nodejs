module.exports = function(app,fs)
{
	app.get('/',function(req,res){
		var sess = req.session;
		res.render('index',{
			name : sess.name,
			username : sess.username
		})
	});
	app.post('/login', function(req, res){ //login function
        	var sess; //session variable
        	sess = req.session; //initial session

        	fs.readFile(__dirname + "/../data/data.json", "utf8", function(err, data){ // 
        		var users = JSON.parse(data);
	        	var username = req.body.username;
	        	var password = req.body.password;
			console.log(username);
			console.log(password);
			
	        	var result = {};
	        	if(!users[username]){ //users[username] == null
	        	    // USERNAME NOT FOUND
			        result["success"] = 0;
			        result["error"] = "not found";
				console.log("data not exist");
        		        //res.json(result);
				res.redirect('/'); //move page
        		        return;
     			}
	
                	if(users[username]["password"] == password){
                		result["success"] = 1;
                		sess.username = username;
                		sess.name = users[username]["name"];
				console.log("password incorrect");
                		//res.json(result);
				res.redirect('/');
	
                	}else{
                		result["success"] = 0;
                		result["error"] = "incorrect";
                		//res.json(result);
				res.redirect('/');
                	}	
        	})	
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
		fs.readFile(__dirname + "/../data/data.json", "utf8", function(err, data){
			users=JSON.parse(data);
			
			var username = req.body.username;
			var password = req.body.password;
			var justname = req.body.justname;
			users[username] = {"password" : password,"name":justname};
			users = JSON.stringify(users);
			fs.writeFileSync(__dirname + "/../data/data.json",users, "utf8");
			console.log(users);	
		});
		res.redirect('/');
	});
	
}
