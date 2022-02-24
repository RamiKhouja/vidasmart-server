var map;

function initMap() {

    var initlatitude  = 36.8190; // postion inital
    var initlongitude =10.1658; // postioj initi
    var latitude = 0; // YOUR LATITUDE VALUE
    var longitude =0; // YOUR LONGITUDE VALUE

    var myLatLng = {lat: initlatitude, lng: initlongitude};
    var markersArray= [];

    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 14,
      disableDoubleClickZoom: true,
    });


    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,

      title: latitude + ', ' + longitude
    });


    function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
      markersArray[i].setMap(null);
    }
     markersArray.length = 0;
     }

    google.maps.event.addListener(map,'dblclick',function(event) {

        var marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          icon:'/admin/img/marker.png',
          title: event.latLng.lat()+', '+event.latLng.lng()
        });
        clearOverlays();
        markersArray.push(marker);

        console.log(markersArray[0]);

          longitude =event.latLng.lng();
          latitude =event.latLng.lat();
          document.getElementById("latitude").value = latitude;
          document.getElementById("longitude").value = longitude;

    });

}
