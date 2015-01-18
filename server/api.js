Meteor.startup(function(){
    HTTP.methods({
        "/api/channels": {
            get: function(data){
                var channels = Channels.find({
                    readable: PERMISSION_EVERYONE,
                    writable: PERMISSION_EVERYONE
                });

                return JSON.stringify(channels.fetch());
            }
        },
        "/api/send": {
            get: function(data){
                var channelName = this.query.channel;

                var id = Flares.insert({
                    creator: null,
                    location: { lat: 39.9516334, lon: -75.1911021 },
                    created: new Date(),
                    duration: 24 * 60 * 60,
                    text: "Sent from my Pebble",
                    media: []
                });

                // Tie it to the channel
                Channels.update({ name: channelName }, {
                    $push: { flares: id }
                });
            }
        }
    });
});
