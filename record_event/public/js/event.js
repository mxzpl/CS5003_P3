var socket = io("ws://localhost:4000/");

socket.on('enter', function(str) {
    console.log(str);
})

var user_name = prompt('please enter your user name','user1')
$(document).ready(function() {
   
  
    $('#submit').click(function() {
        let event = [];
        // event[0] is title, [1] is date, [2] is time, [3] is route, [4] is Des, [5] is Partici, [6] is publisher
        let title = document.getElementById('title').value
        event.push(title)
        let data = document.getElementById('date').value
        event.push(data)
        let time = document.getElementById('time').value
        event.push(time)
        let route = document.getElementById('route').value
        event.push(route)
        let des = document.getElementById('des').value
        event.push(des)
        let partci = [];
        event.push(partci)
        event.push(user_name)
        // let wait = document.getElementById('wait').value
        // event.push(wait)
        console.log(event)
        socket.emit('insert', [event, user_name])
    })

    // $('#show').click(function() {
    //     // console.log("show is clicked")
    //     socket.emit('show')
    //     // $('#show').hide()
    // //     // show all the event
    // // })
    // $('#show_Myevent').click(function(){
    //     console.log("my event button is clicked")
    //     socket.emit('show_mine', user_name)

    // })


    socket.on('show_result', function(data) {
        console.log(data)
        let length = data.length
        // Object.entries(data[1]).forEach(([key, value]) => console.log(`${key}: ${value}`));
        for (var i = 0; i < length; i++) {
            DispalyTable(data[i]);
        }
    })

    socket.on('joined_confirm', function(data){
        if (data) {
            alert('join successful')
        }else{
            alert('already join this event')
        }
    })

    socket.on('show_my_result', function(data){
        // after data[0] is the real event
   console.log(data)
    for (var i = 0; i < data.length; i++) {
        console.log('this is '+(i+1) + " event")
        console.log(data[i][0])
    }
    })

});



function DispalyTable(data) {
    var table = document.getElementById('hitsTable');
    var tr = document.createElement("tr")
    Addcell(data.Title, tr)
    Addcell(data.Date, tr)
    Addcell(data.Time, tr)
    Addcell(data.Route, tr)
    Addcell(data.Description, tr)
    Addcell(data.Participant, tr, 'refers')
    Addcell(data.Publisher, tr)
    var joint_button = document.createElement('button')
    joint_button.innerHTML = 'join'
    var att = document.createAttribute("id")
    att.value = data._id
    joint_button.setAttributeNode(att)
    tr.appendChild(joint_button)

    table.appendChild(tr)
    $("#" + data._id).click(function() {
        $("#" + data._id).attr("disabled", true);
        Addcell(data._id, tr)
        socket.emit('joined', [data._id, user_name])
    })
}



// table format, auto showevent, ? : to confirm if button is visible



function Addcell(data, tr,type) {
    var td = document.createElement("td");
    var txt = document.createTextNode(data);
    if ('refers') {
		let setting_id = 'event_participant'
		let att_P = document.createAttribute("class")
		att_P.value = setting_id;
		td.setAttributeNode(att_P)
	}
    td.appendChild(txt);
    tr.appendChild(td);

}