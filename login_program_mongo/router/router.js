module.exports = function(app,fs)
{
	app.get('/',function(req,res){
		var sess = req.session;
		res.render('index',{
			name : sess.name,
			username : sess.username
		})
	});
	app.get('/login/:username/:password',function(req,res){
		
	});
	
}
