$(document).ready(function() {
    //click add, trigger event 'add-record'
    $('#add_record').on('click', function(event) {
        event.preventDefault();

        //take out the value of input
        var date = $('#date').val();
        console.log(date);
        var start_place = $('#origin-input').val();
        var end_place = $('#destination-input').val();
        var time = $('#time').innerHTML;
        var distance = $('#total').innerHTML;
        var speed = $('#speed').innerHTML;
        var calories = $('#kcal').innerHTML;

        var record = {
            data: date,
            start_place: start_place,
            end_place: end_place,
            time: time,
            distance: distance,
            speed: speed,
            calories: calories
        }

        $.ajax({
            //post 'POST' require to the server, route is /record
            type: 'POST',
            url: '/index',
            data: record,
            success: function(data) {
                //do something with the data via front-end
                $('#date').innerHTML = "";
                $('#origin-input').innerHTML = "";
                $('#estination-input').innerHTML = "";
                $('#time').innerHTML = "";
                //if success, reload the page
                location.reload();
            }
        });
        return false;
    })
})