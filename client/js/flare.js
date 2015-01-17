// environment can either be production or development
if (window.location.origin === "http://localhost:3000") {
    environment = 'development';
} else{
    environment = 'production' ;   
}; 

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
});

Router.route('/options', function () {
    this.render('page_options');
});

Router.route('/:channelname', function () {
    var name = this.params.channelname;

    this.redirect('/channel/' + name + '/map');
});

Router.route('/channel/:channelname/map', function () {
    var name = this.params.channelname;
    this.render('page_map', {
        data: Channels.findOne({ name: name })
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
});

/*
// handle carousel
Session.set('title', 'Flare');
Meteor.startup(function(){
    $('.carousel').enableTouch();
    $('.carousel').on('swipeLeft', function(){
        $('.carousel').carousel('next');
    });
    $('.carousel').on('swipeRight', function(){
        $('.carousel').carousel('prev');
    });

    $('.carousel').on('slid.bs.carousel', function(e){
        var slide = $(e.relatedTarget);
        Session.set('title', slide.data('title'));
    });
});

Template.body.events({
    'click #carousel-left': function(){
        $('.carousel').carousel('prev');
    },
    'click #carousel-right': function(){
        $('.carousel').carousel('next');
    },
    'click a[data-page]': function(e){
        alert($(e.target).data('page'));
    }
});

Template.body.helpers({
    title: function(){
        return Session.get('title');
    }
});
*/

Template.registerHelper("join", function(input){
    return input.join(", ");
});
