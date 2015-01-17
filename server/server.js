Meteor.startup(function(){
    Meteor.methods({
        clearChannels: function(){
            Channels.remove({});
        }
    });
});
