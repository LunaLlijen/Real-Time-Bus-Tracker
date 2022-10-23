var markers = [];

// Add Access Token
mapboxgl.accessToken = "pk.eyJ1IjoibHVuYS1sbGlqZW4iLCJhIjoiY2w5MXdsbWZtMDBtYzN1cnBrbGM0c3NleSJ9.stE4svfvAex_UhWlpk2r-g";

// This is the map instance
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-71.091542, 42.358862],
  zoom: 12,
});

async function run() {
// get bus data
		if (markers!==null) {
    for (var i = markers.length - 1; i >= 0; i--) {
      markers[i].remove();
    }
}
// Gets current location
const locations = await getBusLocations();
console.log(new Date());
console.log(locations);
locations.forEach((element) => {
         
const el = document.createElement('div');
  el.className = 'marker';

// Adds a marker
var marker = new mapboxgl.Marker(el)
.setLngLat([
  element.attributes.longitude,
  element.attributes.latitude,
 ]) .addTo(map);
  markers.push(marker);
});

  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
const url ="https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
const response = await fetch(url);
const json = await response.json();
return json.data;
}
run();
 