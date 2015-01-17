if (Meteor.isClient) {
    console.log("PennApps");

    Router.configure({
        layoutTemplate: 'layout'
    });

    Router.route('/', function () {
        this.render('page_channels');
    });

    Router.route('/:channelname', function () {
        var name = this.params.channelname;
        this.redirect('/' + name + '/map');
    });

    Router.route('/:channelname/map', function () {
        var name = this.params.channelname;
        this.render('page_map');
    });

    Router.route('/:channelname/settings', function () {
        var name = this.params.channelname;
        this.render('page_channel_settings');
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
}
