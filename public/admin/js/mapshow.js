var positions = [];
var map2;

var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

function initMap() {

  var initlatitude  = 36.8190; // postion inital
  var initlongitude = 10.1658; // postioj initi
  var latitude  = 34.8922756; // YOUR LATITUDE VALUE
  var longitude = 10.3135673; // YOUR LONGITUDE VALUE

  var initLatLng = {lat: initlatitude, lng: initlongitude};
  var myLatLng = {lat: latitude, lng: longitude};

  map2 = new google.maps.Map(document.getElementById('map2'), {
    zoom: 6.80,
    center: myLatLng, /* honi position tunis*/
    mapTypeId: 'roadmap'
  });

  var marker2 = new google.maps.Marker({
    position: initLatLng,
    map: map2
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  for (i = 0; i < data.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].emplacement.latitude, data[i].emplacement.longitude),
      map: map2
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(data[i].designation);
        infowindow.open(map2, marker);
      }
    })(marker, i));
  }
}
