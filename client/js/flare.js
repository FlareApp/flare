// environment can either be production or development
if (window.location.origin === "http://localhost:3000") {
    environment = 'development';
} else{
    environment = 'production' ;
};

var localhost = "http://localhost:3000/";
if(location.href.indexOf(localhost) > -1 && location.href != localhost){
    location.href = localhost;
}

// user accounts
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {

    var allChannels = Channels.find({}, {sort: {created: -1}}).fetch();
    var filteredChannels = _.filter(allChannels, function(channel){
        // which channels can be seen?

        // public is OK to read
        if(channel.readable == PERMISSION_EVERYONE){
            return true;
        }

        // private, where user is among members, is OK
        var username = Meteor.user() ? Meteor.user().username : null;
        var included = _.contains(channel.members, username);
        if(channel.readable == PERMISSION_MEMBERS && username && included){
            return true;
        }

        // no dice
        return false;
    });

    this.render('page_channels', {
        data: function(){
            return {
                channels: filteredChannels
            }
        }
    });


    Session.set('lastFlareId', null);

    setSwipeHandlers(function(){
        // left
    }, function(){
        Router.go('/options');
    });
});

Router.route('/options', function () {
    // must be logged in!
    if(!Meteor.user()){
        this.redirect("/");
    }

    this.render('page_options');

    setSwipeHandlers(function(){
        Router.go('/');
    }, function(){
        // right
    });
});

Router.route('/:channelname', function () {
    var name = this.params.channelname;

    this.redirect('/channel/' + name + '/map');
});

Router.route('/channel/:channelname/map', function () {
    var name = this.params.channelname;

    var channel = Channels.findOne({ name: name });
    this.render('page_map', {
        data: channel
    });

    currentChannelId = channel._id;

    setSwipeHandlers(function(e){
        console.log(window.e = e);
        Router.go('/channel/' + name + '/settings');
    }, function(e){
        console.log(window.e = e);
        Router.go('/');
    });

    _.delay(function(){
        $('.map-container').enableTouch();
        $('.map-container').on('swipeLeft', function(){ return false; });
        $('.map-container').on('swipeRight', function(){ return false; });
    }, 100);
});

Router.route('/channel/:channelname/settings', function () {
    var name = this.params.channelname;

    // must be logged in!
    if(!Meteor.user()){
        this.redirect("/channel/" + name + "/map");
    }

    var channel = Channels.findOne({ name: name });
    this.render('page_channel_settings', {
        data: channel
    });

    currentChannelId = channel._id;

    setSwipeHandlers(function(){
        Router.go('/');
    }, function(){
        Router.go("/channel/" + name + "/map");
    });
});

Router.route('/flare/:flareid/follow', function () {
    var flare = Flares.findOne(this.params.flareid);
    currentFlare = flare;

    this.render('page_flare_follow', {
        data: flare
    });

    var channelName = Channels.findOne(currentChannelId).name;
    setSwipeHandlers(function(){
        Router.go("/channel/" + channelName + "/map");
    }, function(){
        Router.go("/channel/" + channelName + "/map");
    });
});

Meteor.startup(function(){
    $('body').enableTouch();
});

function setSwipeHandlers(left, right){
    $('body').off('swipeLeft').on('swipeLeft', left).off('swipeRight').on('swipeRight', right);
}

window.openFlareWindow = function(flareId){
    Session.set('activeFlareId', flareId);
    $('#flare-modal').modal('show');
    // Router.go('/flare/' + flareId + '/follow');
}
