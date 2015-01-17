// event handlers

// channels
Template.page_channels.events({
    'click #channel-add': function(){
        // add that channel
        var channelName = $('#channel-add-name').val().toLowerCase();
        Channels.insert({
            name: channelName,
            flares: [],
            members: []
        });

        $('#channel-add-name').val('');

        // go to its settings screen
        
    }
});
