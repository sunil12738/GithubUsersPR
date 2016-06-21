var express = require('express');
var app = express();
var path = require('path');
var request = require('request');

app.use(express.static(__dirname));

var server = app.listen(8000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("API listening at http://%s:%s", host, port)

});


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});