(function() {

  var myServerKey = "AIzaSyCip7365TliyUinV0PIMF-XncZ9tXkuqoE";	// PMA
  var GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

  var GoogleMapView = {};

  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
    
    var request = new XMLHttpRequest();				// 1) create an XMLHttpRequest object
    request.addEventListener('load', function() {  	// 2) Handle the 'load' event with this code:               
            if (request.status != STATUS_OK) {		//    callback for when load completes from server
              console.log("Geocoding error! : "+request.responseText);
            } else {
              console.log(JSON.parse(request.responseText));
            }
        });
    var geocodeParams = "?address="+entryData.address+"&key="+myServerKey;
    //geocodeParams = geocodeParams.replace(/,/g,", ");
    geocodeParams = geocodeParams.replace(/ /g,"+");
    //console.log("geocode query URL = "+GEOCODE_URL+geocodeParams);
    request.open('GET', GEOCODE_URL+geocodeParams);	// 3) open a URL with the correct request type
    												// 4) set the content-type header, if this is a POST
    request.send(); 								// 5) send the request to the server, with parameters if a POST
    // done; exit and await 'load' callback
  };

  window.GoogleMapView = GoogleMapView;

})();
