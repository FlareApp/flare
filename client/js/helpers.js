Template.page_channels.helpers({
    location: function(){
        // returns current location
        return Geolocation.latLng();
    },
});

// Session.activeFlareId = id of flare to show info about

Template.page_map.helpers({
    lastFlare: function(){
        return Flares.findOne(Session.get('lastFlareId'));
    },
    activeFlare: function(){
        return Flares.findOne(Session.get('activeFlareId'));
    },

    writable: function(){
        // returns true if the user can write to the given channel
        var channel = Channels.findOne(currentChannelId);

        // ok if it's publicly writable
        if(channel.writable == PERMISSION_EVERYONE){
            return true;
        }

        // or if it's private but you're in group
        var username = Meteor.user() ? Meteor.user().username : null;
        var included = _.contains(channel.members, username);
        if(channel.writable == PERMISSION_MEMBERS && username && included){
            return true;
        }

        // no dice
        return false;
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

// follow flare
Template.page_flare_follow.helpers({
    distance: function(){
        var myLocation = Geolocation.latLng(); //has .lat, .lng
        var toLocation = {
            lat: currentFlare.location.lat,
            lng: currentFlare.location.lon
        };

        var dist = getDistanceKm(myLocation, toLocation) * 1000;
        var distString = dist.toFixed(3);

        return distString;
    },
    heading: function(){
        var myLocation = Geolocation.latLng(); //has .lat, .lng
        var toLocation = {
            lat: currentFlare.location.lat,
            lng: currentFlare.location.lon
        };

        return Math.round(angleBetween(myLocation, toLocation));
    },

    arrowDirection: function(){
        var myLocation = Geolocation.latLng(); //has .lat, .lng
        var toLocation = {
            lat: currentFlare.location.lat,
            lng: currentFlare.location.lon
        };

        var realAngle = angleBetween(myLocation, toLocation);
        var myAngle = Session.get('cordovaHeading').magneticHeading;

        var angle = Math.round(realAngle - myAngle);
        return angle;
    },

    isCordova: function(){
        return !!Session.get('cordova');
    }
});
