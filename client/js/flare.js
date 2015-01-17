if (Meteor.isClient) {
    console.log("PennApps");

    // handle carousel
    Template.body.events({
        'click #carousel-left': function(){
            $('.carousel').carousel('prev');
        },
        'click #carousel-right': function(){
            $('.carousel').carousel('next');
        }
    });
}
