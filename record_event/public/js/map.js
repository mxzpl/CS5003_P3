function initMap() {
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
}


/**
 * @constructor
 */
