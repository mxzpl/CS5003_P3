var express = require('express');
var recordController = require('./controllers/recordController');

var app = express();

//set template engin--ejs
app.set('view engine', 'ejs');
//set middlewave--static
app.use(express.static('./public'));

//execute recordController
recordController(app);

//listen on port 3000
app.listen(3000)
console.log("listening on port 3000");