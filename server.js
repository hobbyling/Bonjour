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

// router設定
 // var page = require('./routes/page');

// parse application/x-www-form-urlencoded 
// 讓回傳的值可以解析 json與 urlencoded
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true}));

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
 	res.render('pages/index');
});

//login page
 app.get('/login', function(req, res){
 	res.render('pages/login');
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
	console.log(req.body.id);
 	console.log(req.body.pw);
	firebase.database().ref('/user/').ref.once('value', function(snapshot) {
		console.log(snapshot.val());
		if(id = req.body.id){
			var note = "--此ID已存在--";
			res.render('pages/logon', {
		        tagline: note
		    });
		}else{
			//將表單資料寫入資料庫
		 	var key = firebase.database().ref('user/').push({
		        id: req.body.id,
		        password: req.body.pw,
		    }).key;
		    res.render('pages/index');
		}
	});
 });



http.listen(process.env.PORT || 3000, function() {  
  console.log('Listening on port 3000');  
});