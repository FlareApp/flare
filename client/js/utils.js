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
