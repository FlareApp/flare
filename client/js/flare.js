// environment can either be production or development
if (window.location.origin === "http://localhost:3000") {
    environment = 'development';
} else{
    environment = 'production' ;
};

if(location.href != "http://localhost:3000/"){
    location.href = "http://localhost:3000/";
}

console.log("PennApps");

// user accounts
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('page_channels', {
        data: function(){
            return {
                channels: Channels.find({})
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

Template.registerHelper("join", function(input){
    return input.join(", ");
});

Template.page_channels.helpers({
    location: function(){
        return Geolocation.latLng();
    }
});
