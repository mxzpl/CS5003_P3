var express = require('express');
var recordController = require('./controllers/recordController');
var eventController = require('./controllers/eventController');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//set template engin--ejs
app.set('view engine', 'ejs');
//set middlewave--static
app.use(express.static('./public'));

//execute recordController
recordController(app);
eventController(app, io);

//listen on port 3000
app.listen(4000)
console.log("listening on port 4000");