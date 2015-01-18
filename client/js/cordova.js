if(Meteor.isCordova){
    Meteor.startup(function(){
        Session.set('cordova', true);

        navigator.geolocation.getCurrentPosition(function(position){
            Session.set('cordovaPosition', position);
        });
    });
}
