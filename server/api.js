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
        }
    });
});
