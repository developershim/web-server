var express = require('express');
var app = express();
var PORT = 3000;

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('private route hit');
		next();
	},
	logger: function (req, res, next) {
		console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

// Order is important. Put middleware at the top.
// Application-level middleware.
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

// app.get('/', function (req, res) {
// 	res.send('Hello Express!');
// });

// /about
// send back text "About Us"
// app.get('/about', function (req, res) {
// 	res.send("About Us");
// });

// Route-specific middleware
app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send("About Us!");
});

// Expose public folder
//console.log(__dirname);
// index.html inside public will be shown as the main page
app.use(express.static(__dirname + '/public'));

//app.listen(3000);
app.listen(PORT, function () {
	console.log('Express server started on port ' + PORT + '!');
})