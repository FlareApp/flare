Template.page_channels.helpers({
    location: function(){
        // returns current location
        return Geolocation.latLng();
    },
});

// Session.activeFlareId = id of flare to show info about

Template.page_map.helpers({
    activeFlare: function(){
        return Flares.findOne(Session.get('activeFlareId'));
    }
});

Template.registerHelper("join", function(input){
    return input.join(", ");
});

Template.registerHelper("formatLat", function(lat){
    var direction;
    if(lat < 0) {
        direction = "S";
    }
    else {
        direction = "N";
    }

    return (Math.abs(lat)).toFixed(3) + "° " + direction;
});

Template.registerHelper("formatLon", function(lon){
    var direction;
    if(lon < 0) {
        direction = "W";
    }
    else {
        direction = "E";
    }

    return (Math.abs(lon)).toFixed(3) + "° " + direction;
});
