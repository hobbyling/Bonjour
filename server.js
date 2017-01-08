// node 預設模組
var path = require('path');

// NPM 模組
var app = require('express')();
var partials = require('express-partials');
var static = require('serve-static');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');

// router設定
 // var page = require('./routes/page');

// parse application/x-www-form-urlencoded 
// 讓回傳的值可以解析 json與 urlencoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

var sess;
//session

// app.use(session({
// 	secret: 'keyboard cat', // 用来对session id相关的cookie进行签名
//   	saveUninitialized: true,  // 是否自动保存未初始化的会话，建议false
//   	resave: false,  // 是否每次都重新保存会话，建议false
//     cookie: {
//         maxAge: 10 * 1000  // 有效期，单位是毫秒
//     }
// }));

// 版型設定
app.use(partials());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

//設定預設指定目錄
app.use( static( path.join( __dirname, 'public' )));

/*****************FIREBASE*****************/
var firebase = require("firebase");
var config = {
   apiKey: "AIzaSyD0isme4EL9lNEjL0jHsmSrR8XScPYl3mk",
   authDomain: "bonjour-5d9d0.firebaseapp.com",
   databaseURL: "https://bonjour-5d9d0.firebaseio.com",
   storageBucket: "bonjour-5d9d0.appspot.com"
 };
 firebase.initializeApp(config);
 var database = firebase.database();


app.get('/', function(req, res){
 	var note = "";
 	
 	if(req.session.sign == true){
		res.location('pages/index');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/index', function(req, res){
 	var note = "";
 	if(req.session.sign == true){
 		res.render('pages/index');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/goosip', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/goosip');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/fashion', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/fashion');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/game', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/game');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/movie', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/movie');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/music', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/music');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/news', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/news');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/sport', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/sport');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

app.get('/trip', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "請登入";
 	if(req.session.sign){
		res.render('pages/trip');
	}else{
		res.render('pages/login',{
	 		tagline_login: note
 		});
 	}
});

// var user_count=0;

//當新的使用者進入聊天室
io.on('connection',function(socket){
	//新user
 	socket.on('add user',function(msg){		
 		socket.username=msg;
 		console.log("new user:"+msg+"logged.");
 		io.emit('add user',{
 			username:socket.username
 		});
 	});
 	//監聽新訊息事件
 	socket.on('chat message',function(msg){
 		console.log(socket.username+":"+msg);
 		//發佈新訊息
 		io.emit('chat message',{
 			username:socket.username,
 			msg:msg
 		});
 	});
 	//離開聊天室
 	socket.on('disconnect',function(){
 		console.log(socket.username+"left.");
 		io.emit('user left',{
 			username:socket.username
 		});
 	});
});

//login page
 app.get('/login', function(req, res){
 	var note = "";
 	res.render('pages/login',{
 		tagline_login: note
 	});
 });

//取得登入表單資料
app.post('/loginform', function(req, res){
	console.log("id:"+req.body.login_id);
 	console.log("pw:"+req.body.login_pw);

 	database.ref('/user/').orderByChild("id").equalTo(req.body.login_id).on('child_added',function(snapshot){
 		var data = JSON.stringify(snapshot.val());  //將陣列轉換成字串
 		var result1  = data.indexOf("\"id\":\""+req.body.login_id+"\"");   //將陣列與ID進行比對
 		var result2  = data.indexOf("\"password\":\""+req.body.login_pw+"\"");   //將陣列與ID進行比對
 		// console.log("data:"+data);
 		console.log(result1+" & "+result2);
 		
 		if(result1 == -1 || result2 == -1){
			var note = "--ID或密碼輸入錯誤!--";
			res.render('pages/login', {
		        tagline_login: note
		    });
		}else{
			req.session.sign = true;
			req.session.name = req.body.login_id;
			console.log("session name:"+req.session.name);
		    res.render('pages/index',{
		    	loginid: req.session.name
		    });
		}
	});
});

//logon page
 app.get('/logon', function(req, res){ 	
 	var note = "";
 	res.render('pages/logon',{
 		tagline: note
 	});
 });


//取得註冊表單資料
app.post('/logonform', function(req, res){
	console.log("1."+req.body.id);
 	console.log("2."+req.body.pw);
 	
 	database.ref('/user/').orderByChild("id").equalTo(req.body.id).on('value',function(snapshot){
 		var data = snapshot.val()
       	console.log("3."+data);
 		
		if(data !== null){
			console.log('4.ID已存在');
		    var note = "--此ID已存在--";
			res.render('pages/logon', {
		        tagline: note
		    });
		    res.end();
		    return;
		}
		return;
	});
	
	database.ref('/user/').orderByChild("id").equalTo(req.body.id).on('value',function(snapshot){
		var data = snapshot.val()
       	console.log("5."+data);

		if(data == null){
		// else{
		    console.log('6.ID不存在');
		    req.session.sign = true;
			req.session.name = req.body.id;
			console.log("7.session name:"+req.session.name);
			   
		    // res.render('pages/index');
		    res.end('<a href='+'/login'+'>註冊成功,請重新登入</a>');
		    reg(req.body.id, req.body.pw);	//寫入DB 
		 	console.log("8.login ok");	      
		    return;
		}
		return;
	});
	return;
});


//將表單資料寫入資料庫  
function reg(id, pw){
	firebase.database().ref('user/').push({
		id: id,
	    password: pw,
	}).key;
	console.log("9.db ok");
};

app.post('/backhome', function(req, res){
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
 	res.render('pages/index',{
 		loginid: req.session.name
 	});
});

app.post('/logout', function(req, res){
	req.session.sign = false;
	console.log("session sign:"+req.session.sign);
	console.log("session name:"+req.session.name);
	var note = "";
 	res.render('pages/login',{
 		tagline_login: note
 	});
 	res.end();
});

http.listen(process.env.PORT || 3000, function() {  
  console.log('Listening on port 3000');  
});