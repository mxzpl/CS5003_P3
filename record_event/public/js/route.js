var map, infoWindow,ren;
var routes_data = {};
function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 50.736129, lng: -1.988229 }
    });
    //find user's location
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here now:)');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    //auto complete address
    new AutocompleteDirectionsHandler(map);
}


//function enable user input 
function AutocompleteDirectionsHandler(map) {
    var me=this;
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    ren=this.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
	

    // when user change routes, calculations will change as well
    this.directionsDisplay.addListener('directions_changed', function () {
        var result=this.getDirections();
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        startTimeArray=document.getElementById('start-time-input').value.split(":")
        endTimeArray=document.getElementById('end-time-input').value.split(":")
        startTimeHour= parseInt(startTimeArray[0])+parseInt(startTimeArray[1])/60;
        endTimeHour= parseInt(endTimeArray[0])+parseInt(endTimeArray[1])/60;
        // calculations
        var diffTime = endTimeHour-startTimeHour;
        var speed=total/diffTime;
        var weight=document.getElementById('weight').value;
        var k1=(total*10)/400
        var k=30/((diffTime*60)/k1)
        var kcal=weight*diffTime*k
        var diffTimeFloat=parseFloat(diffTime).toFixed(3);
        var speedFloat=parseFloat(speed).toFixed(3);
        var kcalFloat=parseFloat(kcal).toFixed(3);
        
        
        // var diffTime = (new Date(startTime).getTime() - new Date(endTime).getTime())/(3600*1000);
        document.getElementById('total').innerHTML = total + ' km';
        document.getElementById('time').innerHTML =  diffTimeFloat+ 'h'
        document.getElementById('speed').innerHTML = speedFloat+ ' km/h';
        document.getElementById('kcal').innerHTML = kcalFloat+ 'kcal';
    });
    

    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');

    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete =
        new google.maps.places.Autocomplete(destinationInput);
    destinationAutocomplete.setFields(['place_id']);

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
        destinationInput);

        
};

var saveRoute = function save_route()
{
	var w=[],wp;
	var rleg = ren.directions.routes[0].legs[0];
	routes_data.start = {'lat': rleg.start_location.lat(), 'lng':rleg.start_location.lng()}
	routes_data.end = {'lat': rleg.end_location.lat(), 'lng':rleg.end_location.lng()}
	var wp = rleg.via_waypoints	
	for(var i=0;i<wp.length;i++)w[i] = [wp[i].lat(),wp[i].lng()]	
	routes_data.waypoints = w;	
	var str = JSON.stringify(routes_data)
	console.log(routes_data);
};


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

getData.prototype.setupClickListener = function (
    id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;

    radioButton.addEventListener('click', function () {
        me.travelMode = mode;
        me.route();
    });
};

getData.prototype.route = function () {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route(
        {
            origin: { 'placeId': this.originPlaceId },
            destination: { 'placeId': this.destinationPlaceId },
            travelMode: 'WALKING',
            waypoints: [{ location: 'St Andrews, UK' }, { location: 'Craigtoun Park, UK' }],
            avoidTolls: true
        },
        function (response, status) {
            if (status === 'OK') {
                me.directionsDisplay.setDirections(response);
                
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
};

getData.prototype.setupPlaceChangedListener = function (
    autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            window.alert('Please select an option from the dropdown list.');
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
};



