if(Meteor.isCordova){
    Meteor.startup(function(){
        Session.set('cordova', true);
    });
}
