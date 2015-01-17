// event handlers

// channels
Template.page_channels.events({
    'submit #channel-add': function(e){
        // add that channel
        var channelName = e.target.name.value;

        Channels.insert({
            name: channelName,
            flares: [],
            members: [],
            created: new Date()
        });

        e.target.name.value = '';

        // go to its settings screen
        Router.go('/' + channelName);

        return false;
    }
});
