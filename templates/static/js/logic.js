var url1="https://services3.arcgis.com/bWPjFyq029ChCGur/arcgis/rest/services/Tribal_Lands/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
var url2="https://services.arcgis.com/o6oETlrWetREI1A2/arcgis/rest/services/ca_nativeamericanterritories/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"


var myMap=L.map("map",{
    center:[40.7128,-74.0059],
    zoom: 5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

d3.json(url1).then(function(data){
    L.geoJSON(data).addTo(myMap);
    console.log(data)
})