//Accepts inputs like: {lat:0,lng:0},{lat:15.623,lng:-23.421}
window.getDistanceKm = function(coords1, coords2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(coords2.lat-coords1.lat); // deg2rad below
    var dLon = deg2rad(coords1.lng-coords2.lng);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(coords1.lat)) * Math.cos(deg2rad(coords2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

window.deg2rad = function(deg) {
    return deg * (Math.PI/180);
}

/*
    Returns initial bearing as you go from coords1 to coords2. North = 0.
*/
window.angleBetween = function(coords1, coords2){
    var c1 = coords1;
    var c2 = coords2;
    var dy = c2.lat - c1.lat;
    var dx = Math.cos(Math.PI/180 * c1.lat)*(c2.lng - c1.lng);
    var angle = Math.atan2(dy, dx);

    var deg = angle * 180 / Math.PI;
    deg = 90 - deg;
    if(deg < 0){
        deg = 360 + deg;
    }
    return deg;
}
