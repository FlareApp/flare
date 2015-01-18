if(Meteor.isCordova){
    Meteor.startup(function(){
        Session.set('cordova', true);
        navigator.compass.getCurrentHeading(function(heading){
            Session.set('cordovaHeading', heading);
        });
        navigator.compass.watchHeading(function(heading){
            Session.set('cordovaHeading', heading);    
        });
    });
}
