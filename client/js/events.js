// event handlers

// channels
Template.page_channels.events({
    'submit #channel-add': function(e){
        // add that channel
        var channelName = e.target.name.value;

        Channels.insert({
            name: channelName,
            flares: [],
            members: [ Meteor.user().username ],
            created: new Date(),
            readable: PERMISSION_MEMBERS,
            writable: PERMISSION_MEMBERS
        });

        e.target.name.value = '';

        // go to its screen
        Router.go('/channel/' + channelName + '/settings');

        return false;
    }
});

// map
Template.page_map.events({
    'click #flare-new': function(e){
        var location = Geolocation.latLng(); // has .lat and .lng
        var creator = Meteor.user() ? Meteor.user().username : null;
        var text = "yo";

        // Add a flare
        var id = Flares.insert({
            creator: creator,
            location: { lat: location.lat, lon: location.lng },
            created: new Date(),
            duration: 24 * 60 * 60,
            text: "yo",
            media: []
        });

        // Tie it to the channel
        Channels.update(currentChannelId, {
            $push: { flares: id }
        });
    }
});


// settings
Template.page_channel_settings.events({
    'click #member-add': function(e){
        var $nameField = $('#member-add-name');
        var memberName = $nameField.val();

        Channels.update(currentChannelId, {
            $push: { members: memberName }
        });

        $nameField.val('');
    },
    'click .member-remove': function(e){
        var username = $(e.target).data('username');
        Channels.update(currentChannelId, {
            $pull: { members: username }
        })
    },
    'submit #settings-permissions': function(e){
        t = e.target;
        var readable = e.target.settingsReadable.value;
        var writable = e.target.settingsWritable.value;
        Channels.update(currentChannelId, {
            $set: { readable: readable, writable: writable }
        });      
        return false;
    }
});

Template.page_channel_settings.helpers({
    isReadableEveryone: function(){
        if(currentChannelId){
            if(Channels.findOne(currentChannelId).readable == PERMISSION_EVERYONE){
                return "checked";
            }
            else{
                return "";
            }
        }
    },
    isReadableMembers: function(){
        if(currentChannelId){
            if(Channels.findOne(currentChannelId).readable == PERMISSION_MEMBERS){
                return "checked";
            }
            else{
                return "";
            }
        }
    },
    isWritableEveryone: function(){
        if(currentChannelId){
            if(Channels.findOne(currentChannelId).writable == PERMISSION_EVERYONE){
                return "checked";
            }
            else{
                return "";
            }
        }
    },
    isWritableMembers: function(){
        if(currentChannelId){
            if(Channels.findOne(currentChannelId).writable == PERMISSION_MEMBERS){
                return "checked";
            }
            else{
                return "";
            }
        }
    },
});
