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

    setSwipeHandlers(function(){
        Router.go('/channel/' + name + '/settings');
    }, function(){
        Router.go('/');
    });
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

Meteor.startup(function(){
    $('body').enableTouch();
});

function setSwipeHandlers(left, right){
    $('body').off('swipeLeft').on('swipeLeft', left).off('swipeRight').on('swipeRight', right);
}
