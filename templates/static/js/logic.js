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


d3.json('http://localhost:5000/data/missions_data.sqlite').then(function(data){
	// console.log(data[0]);
	var myMap=L.map("map", {
	    center: [34.0522, -118.2437],
	    zoom: 5,
	})
	var streetMap=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
	streetMap.addTo(myMap);
	
	for (let i=0; i<data.length; i++){
		let each_district=data[i][0];
		let flipped_coord=[];
		for (let j=0; j<each_district.length; j++){
			let each_coord=each_district[j];
			flipped_coord.push([each_coord[1], each_coord[0]]);
		};
		L.polygon(flipped_coord, {color: 'red'}).addTo(myMap);
	};
});
