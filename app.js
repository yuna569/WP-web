var express = require('express');
var http = require('http');
const https = require('https');
const fs - require(fs)
var path = require('path')
var static = require('serve-static');

const options = {
	key: fs.readFileSync("cert.key"),
	cert: fs.readFileSync("cert.crt")
};

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 8080);
app.set('host', '127.0.0.1');

app.use(static(__dirname));
app.use(express.urlencoded()); // post 해석
app.use(express.json());		// json 사용

http.createServer(app).listen(app.get('port'), app.get('host'), () => {
	console.log('Express server running at' + app.get('port') + app.get('host'));
});

const PORT = 8000;
https.createServer(app).listen(PORT, app.get('host'), () => {
	console.log('Express server running at' + PORT + app.get('host'));
});

// app.use(function(req, res, next) {
// 	console.log('첫 번째 미들웨어에서 요청을 처리함.');

// 	req.user = 'mike';
// 	next();
// });

// app.use('/', function(req, res, next) {
// 	console.log('두 번째 미들웨어에서 요청을 처리함.');

// 	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 	res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
// 	// next();
// });

router.route('/').get(function(req, res) {
	res.redirect('/source/jquery.html');
});

router.route('/routetest').get(function(req, res) {
	res.redirect('http://www.google.com');
});

app.use('/', router);