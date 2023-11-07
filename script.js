var map, newMarker, markerLocation;

map = L.map("map").setView([39.288859921848754,-76.61243531852962], 12);

var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
).addTo(map);

map.createPane("labels");
map.getPane("labels").style.pointerEvents = "none";
map.getPane("labels").style.zIndex = 650;

var positronLabels = L.tileLayer(
  "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
  {
    attribution: "©OpenStreetMap, ©CartoDB",
    pane: "labels",
  }
).addTo(map);

map.on("click", addMarker);

function submitForm() {


let litterLocationHolder = document.getElementById("litterLocation").value; //sets the value to whatever is currently in the litterlocation field
 let litterLocationPre =
    "address:" +
    document.getElementById("title").value +
    "<br> lat: " +
    document.getElementById("lat").value +
    "<br> lon: " +
    document.getElementById("lon").value +
    "<br>summary: " +
    document.getElementById("summary").value +
    "<br><br>"

  console.log("litterlocation = " + litterLocationHolder); //check in console to get the value of litterlocationHolder

  const litterLocationResult = litterLocationPre.replaceAll("<br>", "\n");
  document.getElementById("litterLocation").value = litterLocationResult+litterLocationHolder; //This should be the equivalent to prepenting the value to the beginnign of the string
let litterLocationAfter = document.getElementById("litterLocation").value;
console.log("litterlocation = " + litterLocationAfter); //check in console to get the value of litterlocationHolder
}

function showBar() {
  console.log("in here");


  document.getElementById("showBar").style.display = "none";
  document.getElementById("controlBar").style.display = "block";
}

function hideBar() {
  document.getElementById("controlBar").style.display = "none";
  document.getElementById("showBar").style.display = "block";
}

function addMarker(e) {
  document.getElementById("lat").value = e.latlng.lat;
  document.getElementById("lon").value = e.latlng.lng;
  console.log("this is now working");
  // Add a Leaflet marker at the point of click
  var newMarker = new L.marker(e.latlng).addTo(map);
  console.log(e.lon);

  // Send lng,lat to reverse geocoder.
  fetch(
    `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=${e.latlng.lng},${e.latlng.lat}`
  )
    .then((res) => res.json())
    .then((myJson) => {
      newMarker
        .bindPopup(myJson.address.LongLabel + "<br> GPS=" + e.latlng)
        .openPopup();
      console.log(myJson.address);
      document.getElementById("title").value = JSON.stringify(
        myJson.address.Match_addr
      );
    });
}

function submitLocations(){
  console.log('In the submitLocation function')
}
