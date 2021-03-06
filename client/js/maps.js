// this accepts the format {lat: 0.0, lng: 0.0}
// function placeMarker(location, id) {
//   var marker = new google.maps.Marker({
//     position: location,
//     animation: google.maps.Animation.DROP,
//     // content: contentString,
//     map: GoogleMaps.maps.gmap.instance
function placeMarker(flare) {
    var location = {
        lat: flare.location.lat,
        lng: flare.location.lon
    };
  var marker = new google.maps.Marker({
    position: location,
    map: GoogleMaps.maps.gmap.instance,
    // animation: google.maps.Animation.DROP,
    id: flare._id
  });

  google.maps.event.addListener(marker, 'click', function() {
      openFlareWindow(marker.id);
  })
}

Meteor.startup(function() {
  GoogleMaps.load();
  Tracker.autorun(function () {
    console.info(Geolocation.latLng());
    if (Geolocation.error() !== null) {
      var center = new google.maps.LatLng(Geolocation.latLng().lat, Geolocation.latLng().lng);
      GoogleMaps.maps.gmap.instance.panTo(center);
    };
  });
});

Template.page_map.helpers({
  gmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('gmap', function(map) {

            // add all the flares yo
            var flareIds = Channels.findOne(currentChannelId).flares;
            _.each(flareIds, function(id){
                var flare = Flares.findOne(id);
                placeMarker(flare);
            });
        });
    }

        // Map initialization options
        if (environment === 'production') {
          var lat = 0
          var lng = 0
        } else{
          var lat = 39.958
          var lng = -75.195
        };
        return {
          mapTypeControl: false,
          draggable: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          // disableDefaultUI: true,
          center: new google.maps.LatLng(Geolocation.latLng().lat || lat, Geolocation.latLng().lng) || lng,
          zoom: 18
        };
      }
    }
  );
