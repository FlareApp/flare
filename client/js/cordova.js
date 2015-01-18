if(Meteor.isCordova){
    Meteor.startup(function(){
        Session.set('cordova', true);
        navigator.compass.getCurrentHeading(function(heading){
            Session.set('cordovaHeading', heading);
            console.log(JSON.stringify(heading));
        });
    });
}
