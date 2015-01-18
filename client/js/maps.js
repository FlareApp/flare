// this accepts the format {lat: 0.0, lng: 0.0}
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: GoogleMaps.maps.gmap.instance
  });
}
if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
    Tracker.autorun(function () {
      console.info(Geolocation.latLng());
      if (Geolocation.error() !== null) {
        var center = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
        GoogleMaps.maps.gmap.instance.panTo(center);
      };
    })
  });
  Template.page_map.helpers({
    gmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // We can use the `ready` callback to interact with the map API on3ce the map is ready.
        GoogleMaps.ready('gmap', function(map) {
          // Add a marker to the map once it's ready
          // var marker = new google.maps.Marker({
          //   position: map.options.center,
          //   map: map.instance
          // });
        });

        // Map initialization options
        if (environment === 'production') {
          var lat = 0
          var lng = 0
        } else{
          var lat = 39.958
          var lng = -75.195
        };
        return {
          center: new google.maps.LatLng(Geolocation.latLng().lat || lat, Geolocation.latLng().lng) || lng,
          zoom: 18
        };
      }
    }
  });
}
