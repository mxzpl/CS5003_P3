//import mongoose
var mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb+srv://cs5003public:javascript@p3-kz4ij.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost:27017/p3', {useNewUrlParser: true});

//define schema
var recordSchema = new mongoose.Schema({
    _distance: Number,
    username: String,
    date: String,
    // start_place: String,
    // end_place: String,
    time: Number,
    distance: Number,
    speed: Number,
    calories: Number
});

//define model -> collection
var recordModel = mongoose.model('Records', recordSchema);


module.exports.add = function(username, data, callback) {
    data.username = username;
    var record = new recordModel(data);
    if (data.date && data.time && data.distance && data.speed && data.calories) {
        record.save(callback);
    } else {
        if (callback) {
            callback(new Error("Lose some data"));
        }
    }
};

module.exports.getById = function(id, callback) {
    recordModel.findById(id, function(err, results) {
        if (err) {
            callback({error: err.message});
        } else {
            callback(null, results);
        }
    });
};

module.exports.getDistance = function(id, callback) {
    RunData.findById(id, function(err, results) {
        if (err) {
            callback({error: err.message});
        } else {
            callback(null, results);
        }
    });
};