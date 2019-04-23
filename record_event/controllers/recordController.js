//import middlewave -- body-parser
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

//import mongoose
var mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb+srv://cs5003public:javascript@p3-kz4ij.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

//define schema
var recordSchema = new mongoose.Schema({
    date: String,
    start_place: String,
    end_place: String,
    time: Number,
    distance: Number,
    speed: Number,
    calories: Number
});

//define model -> collection
var recordModel = mongoose.model('Records', recordSchema);

var data = [
    {
        date: '2019.04.12',
        start_place: 'start place',
        end_place: 'end_place',
        time: 30,
        distance: 1,
        speed: 0.5,
        calories: 500
    },
    {
        date: '2019.04.12',
        start_place: 'start place',
        end_place: 'end_place',
        time: 30,
        distance: 1,
        speed: 0.5,
        calories: 500
    }
]


module.exports = function(app) {
    //request the list
    app.get('/record', function(req, res) {
        //take out all data
        recordModel.find({}, function(err, data) {
            if (err) throw err;
            res.render('record', {records: data})
        })
        //rend record.ejs
        //put the data inthe 'records', take the records out in the views
        //res.render('record', {records: data});
    });

    //add record
    app.post('/record', urlencodeParser, function(req, res) {
        var recordOne = recordModel(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
        //input data
        //data.push(req.body);
        //res.json(data);
    });
    app.get('/index', function(req, res) {
        //take out all data
        recordModel.find({}, function(err, data) {
            if (err) throw err;
            res.render('index', {records: data})
        })
        //rend record.ejs
        //put the data inthe 'records', take the records out in the views
        //res.render('record', {records: data});
    });

    //add record
    app.post('/index', urlencodeParser, function(req, res) {
        var recordOne = recordModel(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })
        //input data
        //data.push(req.body);
        //res.json(data);
    });
};