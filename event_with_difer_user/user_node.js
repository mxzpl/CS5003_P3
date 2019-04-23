var url = 'mongodb://localhost:27017/runoob';
var MongoClient = require('mongodb').MongoClient;

 MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("runoob")
        // dbo.createCollection('user',function(err,res){
        // 	if(err) throw err;
        // 	console.log("create successful")
        //  db.close();

        // })

        dbo.collection('user').insertOne({"name":"user2","password":"12345", "MyEvent":[]}, function(err, res) {
        if (err) throw (err);
        console.log('insert successful');  
        db.close(); 
    })
      	

 })