var app = require('http').createServer()
var url = 'mongodb://localhost:27017/runoob';
var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

var $ = require("jquery");
var io = require('socket.io')(app)

var port = 3000;
app.listen(port);

io.on('connection', function(socket) {
    var connecting_status = 'connect successful'
    io.emit('enter', connecting_status)

    socket.on('insert', async function(data) {
        // data[0] is event detail
        // data[1] is id
       await intract_with_db('insert', data[0], data[1])
    
    })

    socket.on('show', async function(){
        let show_result = await intract_with_db('show')
        io.emit('show_result', show_result)
    })

    socket.on('joined', async function(data){
        // data[0] is unique id, data[1] is user name
      let show_result = await intract_with_db('joined', data[0], data[1])
      socket.emit('joined_confirm', show_result)
    })


    socket.on('show_mine', async function(data){
        let show_result = await intract_with_db('show_my_event', 0, data)
        socket.emit('show_my_result', show_result)
    })

})



async function intract_with_db(type, data, iden) {
        let db = await MongoClient.connect(url, { useNewUrlParser: true });
        var dbo = db.db("runoob")

        let result;
        if (type== 'insert') {
            await insert_data(data, db, dbo, iden);
        } else if (type == 'show') {
           result = await show_data(db,dbo);
        } else if (type == 'joined'){
            result = await join_event_data(data, db, dbo, iden);
        }else if(type == 'show_my_event'){
            result = await show_my_event(db,dbo,iden)
        }
         db.close();
         return result;

}

async function show_my_event(db,dbo,iden){
    let init_data = await dbo.collection('user').find({"name": iden}).toArray();
    let event_list = init_data[0].MyEvent
    let list = [];
    for(var x = 0; x <event_list.length; x++){
        let temp_event = event_list[x]
        let refind_result = await dbo.collection('site').find({"_id": ObjectID(temp_event)}).toArray();
        list.push(refind_result)
        console.log(list)
    }
    return list
}

async function join_event_data(data, db, dbo, iden){

    let init_data = await dbo.collection('user').find({"name": iden}).toArray();
      // console.log(init_data)
    let init_event = init_data[0].MyEvent;
    // console.log(init_event.indexOf(data))
    let event_data = await dbo.collection('site').find({"_id":ObjectID(data)}).toArray();
    let partici_list = event_data[0].Participant
    // console.log(partici_list)

    // console.log("This is data: "  + data )
    if(init_event.indexOf(data) < 0){
        // joined_event_data_partici.push(iden)
        init_event.push(data)
        partici_list.push(iden)
        await dbo.collection("user").updateOne({name: init_data[0].name}, {$set: { "MyEvent" : init_event }});
        await dbo.collection('site').updateOne({_id: ObjectID(data)}, {$set:{"Participant" : partici_list}})
        // console.log("already pulished")
        // console.log(init_event)
        return true
    }else{
        return false
    }


}



async function insert_data(data,db, dbo, iden) {  
        var temp_obj = {
        "Title": data[0],
        "Date": data[1],
        "Time": data[2],
        "Route": data[3],
        "Description": data[4],
        "Participant": data[5],
        "Publisher": data[6],
        // "Accepted": data[7]
    }

    let result = await dbo.collection('site').insertOne(temp_obj);
    console.log(result.insertedId)
    let insert_id = result.insertedId.toString();
    let init_data = await dbo.collection('user').find({"name": iden}).toArray();
    // console.log(init_data)
    let init_event = init_data[0].MyEvent;
    console.log(init_event)
    init_event.push(insert_id);
    await dbo.collection("user").updateOne({name: iden}, {$set: { "MyEvent" : init_event }});
    console.log('MyEvent already update')
}



async function show_data(db,dbo){
        let result = await dbo.collection('site').find({}).toArray();
        return result;
}




