var express = require('express');
var app = express();
//var PORT = 3000;
// Heroku sets an environment variable for PORT
var PORT = process.env.PORT || 3000;

var middleware = require('./middleware.js');

// Order is important. Put middleware at the top.
// Application-level middleware.
//app.use(middleware.requireAuthentication);
app.use(middleware.logger);

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