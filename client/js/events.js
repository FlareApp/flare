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
            created: new Date()
        });

        e.target.name.value = '';

        // go to its screen
        Router.go('/channel/' + channelName + '/settings');

        return false;
    }
});
