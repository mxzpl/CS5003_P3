//import middlewave -- body-parser
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var recordModel = require("../mdoel/record");

// var data = [
//     {
//         date: '2019.04.12',
//         start_place: 'start place',
//         end_place: 'end_place',
//         time: 30,
//         distance: 1,
//         speed: 0.5,
//         calories: 500
//     },
//     {
//         date: '2019.04.12',
//         start_place: 'start place',
//         end_place: 'end_place',
//         time: 30,
//         distance: 1,
//         speed: 0.5,
//         calories: 500
//     }
// ]


module.exports = function(app) {
    //render record
    app.get('/record', function(req, res) {
        res.render('record');
    });
    //request the list
    app.get('/record/:id', function(req, res) {
        var id = req.params.id;
        //take out all data
        recordModel.getById(id, function(err, data) {
            if (err) {
                throw err;
            } else {
                res.render('record', {records: data})
            }
        })
        //rend record.ejs
        //put the data in the 'records', take the records out in the views
        //res.render('record', {records: data});
    });

    //add record
    app.post('/record/:id', urlencodeParser, function(req, res) {
        var id = req.params.id;
        recordModel.add(id, req.body, function(err, data) {
            if (err) throw err;
            res.json(data);
        })
        //input data
        //data.push(req.body);
        //res.json(data);
    });
    
    //get distance
    app.get('/record:id', function(req, res) {
        //take out all data
        recordModel.find({username: id}, function(err, data) {
            if (err) throw err;
            res.json(data)
        })
        //rend record.ejs
        //put the data in the 'records', take the records out in the views
        //res.render('record', {records: data});
    });
}