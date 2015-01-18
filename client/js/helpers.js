Template.page_channels.helpers({
    location: function(){
        // returns current location
        return Geolocation.latLng();
    },
    readable: function(context, options){
        // returns true if the user can see a channel

        return true;

        /*
        // true if it's visible to everyone
        var public = channel.readable == PERMISSION_EVERYONE;
        if(public){
            return true;
        }

        // also if it's members only AND person is in the users list
        var membersOnly = channel.readable == PERMISSION_MEMBERS;
        var username = Meteor.user() ? Meteor.user().username || null;
        var included = _.contains(channel.members, username);
        if(membersOnly && username && included){
            return true;
        }

        return false;
        */
    }
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
