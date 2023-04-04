//var url1="https://services3.arcgis.com/bWPjFyq029ChCGur/arcgis/rest/services/Tribal_Lands/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
//var url2="https://services.arcgis.com/o6oETlrWetREI1A2/arcgis/rest/services/ca_nativeamericanterritories/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"


// var myMap=L.map("map",{
//     center:[40.7128,-74.0059],
//     zoom: 5
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap)

// d3.json("http://localhost:5000/data/missions_data.sqlite").then(function(data){
//     L.geoJSON(data).addTo(myMap);
//     console.log(data)
// })

////////////////
d3.json("http://localhost:5000/api/missions").then(function (data) {
	data = data.map(function (el) {
		el.coordinates = (el.coordinates && typeof el.coordinates == "string") ? JSON.parse(el.coordinates) : el.coordinates
		return el;
	})

	console.log(data);
	// This map shows missions in the cordinates
	var myMap = L.map("map", {
		center: [34.0522, -118.2437],
		zoom: 5,
	})
	var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
	streetMap.addTo(myMap);

	/// chaging this to match how the information is meant to be mapped

	// for (let i=0; i<data.length; i++){
	// 	var coord = data[i]
	// 	let each_district=data[i][0];
	// 	let flipped_coord=[];
	// 	for (let j=0; j<each_district.length; j++){
	// 		let each_coord=each_district[j];
	// 		flipped_coord.push([each_coord[1], each_coord[0]]);
	// 	};
	// 	L.polygon(flipped_coord, {color: 'red'}).addTo(myMap);
	// }
	var flipped_coord = []
	for (let i = 0; i < data.length; i++) {
		var coord = data[i].coordinates
		var n = data[i].name
		flipped_coord = [coord[1], coord[0]];

		L.marker(flipped_coord, {
			title: n,
			clickable: true

		}).bindPopup(n).addTo(myMap);


	}

	d3.json("http://localhost:5000/api/estancias").then(function (datae) { //ESTANCIAS GRAPHING
		console.log("datae", datae)
		datae = datae.map(function (el) {
			var co = JSON.parse(el.coordinates);
			console.log("coord", co)
			try {
				el.coordinates = co;
				return el;
			} catch (e) {
				console.log("Epic fail", co);
				console.log("fail", e)
				return el;
			}


		})
		console.log(datae);

		var flipped_coord2 = []
		for (let i = 0; i < datae.length; i++) {
			var coord2 = datae[i].coordinates
			var n2 = datae[i].name
			flipped_coord2 = [coord2[1], coord2[0]];
			var greenIcon = new L.Icon({
				iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
				shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			});

			L.marker(flipped_coord2, {
				title: n2,
				clickable: true,
				icon: greenIcon
			}).bindPopup(n2).addTo(myMap);
		}
	})

	d3.json("http://localhost:5000/api/geojson/federal")
		.then(fdata => {
			console.log(fdata)
			L.geoJson(fdata, {
				style: function () {
					return { color: "brown" }
				}
			}).addTo(myMap)
		})
	var geojson;
	d3.json("http://localhost:5000/api/geojson/historical")
		.then(hdata => {
			console.log(hdata)
			geojson = L.geoJson(hdata, {
				style: function () {
					return { color: "red" };
				}, onEachFeature: onEachFeature
			}).addTo(myMap)

		})
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



	//////////////////



	// d3.json('http://localhost:5000/data/missions_data.sqlite').then(function(data){
	// 	// console.log(data[0]);
	// 	var myMap=L.map("map", {
	// 	    center: [34.0522, -118.2437],
	// 	    zoom: 5,
	// 	})
	// 	var streetMap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
	// 	streetMap.addTo(myMap);

	// 	for (let i=0; i<data.length; i++){
	// 		let each_district=data[i][0];
	// 		let flipped_coord=[];
	// 		for (let j=0; j<each_district.length; j++){
	// 			let each_coord=each_district[j];
	// 			flipped_coord.push([each_coord[1], each_coord[0]]);
	// 		};
	// 		L.polygon(flipped_coord, {color: 'red'}).addTo(myMap);
	// 	};
});
