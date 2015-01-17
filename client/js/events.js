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
    'submit #channel-settings': function(e){

        return false;
    }
});
