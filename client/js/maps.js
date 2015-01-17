if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
  // Map view center hardcoded for now
  Template.body.helpers({
    mapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('myMap', function(map) {
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
// To use this module, add the following div 
// {{> googleMap name="myMap" options=exampleMapOptions}}

// Examples:
// Map marker in center of page

// var marker = new google.maps.Marker({
//   position: map.options.center,
//   map: map.instance
// });