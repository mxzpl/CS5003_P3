$(document).ready(function() {
    //click add, trigger event 'add-record'
    $('#add_record').on('click', function(event) {
        event.preventDefault();

        //take out the value of input
        var date = $('#date').val().toString();
        console.log(date);
        //var start_place = $('#start_place').val();
        //var end_place = $('#end_place').val();
        var time = $('#time').innerHTML;
        var distance = $('#total').innerHTML;
        var speed = $('#speed').innerHTML;
        var calories = $('#kcal').innerHTML; 

        var record = {
            date: date,
            // start_place: start_place,
            // end_place: end_place,
            time: time,
            distance: distance,
            speed: speed,
            calories: calories
        }
        console.log(record);

        $.ajax({
            //post 'POST' require to the server, route is /record
            type: 'POST',
            url: '/record',
            data: record,
            success: function(data) {
                //do something with the data via front-end
                // $('#date').innerHTML = "";
                // $('#start_place').innerHTML = "";
                // $('#end_place').innerHTML = "";
                // $('#time').innerHTML = "";
                //if success, reload the page
                //location.reload();
            }
        });
        return false;
    })
})