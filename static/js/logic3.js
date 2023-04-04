//  create the map object with options 
var myMap=L.map('map',{
    center:[34.0522, -118.2437],
    zoom: 6,

});

// Add the light map layer to myMap
var lightmap= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// use d3.json to bring in missions data
d3.json("/api/missions").then(function(response){
        // pull the coords for marker
        console.log(response);
        // create empty array
        var array=[]
        // loop throuh data and create marker, bind a popup
        for (var i=0; i< response.length; i++){
            currentC=response[i]['coordinates'];
            currentC=currentC.replace('[', '').replace(']', '').split(', ')
            let markerC=L.marker([currentC[1],currentC[0]],{
                grabbable: true,
                title:response[i]['name']
        }).bindPopup(`<h2>${response[i]['name']}</h2>`);
        // push markerC to empty array
        array.push(markerC);
        }
        // call of createMissions function
        createMissions(L.layerGroup(array))
})

// create the createMissions function 
function createMissions(mission){
var overlayMaps={'Mission':mission};
L.control.layers(null,overlayMaps).addTo(myMap)};

// use d3.json to bring in estancias data
d3.json("/api/estancias").then(function(response){
    // pull the coords for marker
    console.log(response);
    // create empty array
    var array=[]
    // loop through data and create marker, bind a popup
    for (var i=0; i< response.length; i++){
        currentC=response[i]['coordinates'];
        currentC=currentC.replace('[', '').replace(']', '').split(', ')
        // create new icon color
        var greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        let markerC=L.marker([currentC[1],currentC[0]],{
            grabbable: true,
            title:response[i]['name'],
            icon: greenIcon
    }).bindPopup(`<h2>${response[i]['name']}</h2>`);
    // push markerC to empty array
    array.push(markerC);
    }
    // call on createMissions1 function
    createMissions1(L.layerGroup(array))
})
// create the createMissions1 function
function createMissions1(mission){
    var overlayMaps={'Estancias':mission};
    L.control.layers(null,overlayMaps).addTo(myMap)
};

// use d3.json to bring in asistencias data
d3.json("/api/asistencias").then(function(response){
    // pull the coords for marker
    console.log(response);
    // create an empty array
    var array=[]
    // loop through all the data and create a marker, bind a popup
    for (var i=0; i< response.length; i++){
        currentC=response[i]['coordinates'];
        currentC=currentC.replace('[', '').replace(']', '').split(', ')
        // create new icon color
        var goldIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        let markerC=L.marker([currentC[1],currentC[0]],{
            grabbable: true,
            title:response[i]['name'],
            icon: goldIcon
        }).bindPopup(`<h2>${response[i]['name']}</h2>`);
        // pudh markerC to empty array
        array.push(markerC);
    }
        // call thr createMissions2 function
        createMissions2(L.layerGroup(array))
});
 
// create the createMissions2 function
function createMissions2(mission){
    var overlayMaps={'Asistencias':mission};
    L.control.layers(null,overlayMaps).addTo(myMap)
};

///////// DAVIDS CODE FOR GEOJSON OF FEDERAL AND HISTORICAL MAPS////////

d3.json("/api/geojson/federal")
	.then(function(fdata) {
		console.log(fdata)
		L.geoJson(fdata, {
			style: function () {
				return { color: "brown" }
			}, onEachFeature:function(feature,layer){
                layer.bindPopup(`<h2>${layer.feature.properties.TRIBE_NAME}</h2>`)
            }
		}).addTo(myMap)
	});
    var geojson;
	d3.json("/api/geojson/historical")
		.then(function(hdata) {
			console.log(hdata)
			geojson = L.geoJson(hdata, {
				style: function () {
					return { color: "white" };
				}, onEachFeature: onEachFeature
			}).addTo(myMap)
});

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		})
	}
	//highlight feature
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7

		});
		layer.bringToFront();
		info.update(layer.feature.properties);
	}
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};
	info.update = function (props) {
		console.log("P", props)
		var panel = props ? `
			<div class="panel">
				<div class="panel-header">TRIBE INFORMATION</div>
				<div class="panel-body">
					<p>Name: ${props.TRIBE_NAME}</p>
				</div>
			</div>` : "Hover over state"

		this._div.innerHTML = panel;
	}
	info.addTo(myMap)
	//resetToFeature
	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update()
	}
	// zoom to feature
	function zoomToFeature(e) {
		myMap.fitBounds(e.target.getBounds());

	}