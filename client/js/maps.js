if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
    Geolocation.load();
    Tracker.autorun(function () {
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
          var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
          });
        });

        // Map initialization options
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
}
