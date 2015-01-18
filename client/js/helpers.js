Template.page_channels.helpers({
    location: function(){
        return Geolocation.latLng();
    }
});

// Session.activeFlareId = id of flare to show info about

Template.page_map.helpers({
    activeFlare: function(){
        return Flares.findOne(Session.get('activeFlareId'));
    }
});
