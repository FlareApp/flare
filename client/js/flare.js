if (Meteor.isClient) {
    console.log("PennApps");

    // handle carousel
    Meteor.startup(function(){
        $('.carousel').enableTouch();
        $('.carousel').on('swipeLeft', function(){
            $('.carousel').carousel('next');
        });
        $('.carousel').on('swipeRight', function(){
            $('.carousel').carousel('prev');
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
}
