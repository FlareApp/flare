if (Meteor.isClient) {
    console.log("PennApps");

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
    });

    Template.body.helpers({
        title: function(){
            return Session.get('title');
        }
    });
}
