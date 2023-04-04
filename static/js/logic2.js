
function createMissions(mission){
    //  Create the tile layer that will be the background of our map 
    var lightmap= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    // create a baseMaps object to hold the lightmap Layer.
    var baseMaps={'lightmap':lightmap};

    // create an overlaysMap object to hold the layer 
    var overlayMaps={'Mission': mission};

    //  create the map object with options 
    var myMap=L.map('map',{
        center:[34.0522, -118.2437],
        zoom: 5,
        layers:[lightmap, mission]
    });

    // create a layer control, and pass it baseMaps and overlayMaps. add it to my map
    L.control.layers(baseMaps,overlayMaps).addTo(myMap);
};


// create missions marker 
d3.json("/api/missions").then(function(response){
    // pull the coords for marker
    console.log(response);
    // let coordinates=response.coordinates
    var array=[]

    for (var i=0; i< response.length; i++){
        currentC=response[i]['coordinates'];
        currentC=currentC.replace('[', '').replace(']', '').split(', ')
        let markerC=L.marker([currentC[1],currentC[0]],{
            grabbable: true,
            title:response[i]['name']
    }).bindPopup(`<h2>${response[i]['name']}</h2>`);

    array.push(markerC);
    }
    
    createMission(L.layerGroup(array));
})


// d3.json("/api/missions").then(createMarker);
// d3.json("/api/estancias").then(createMarker);
// d3.json("/api/asistencias").then(createMarker)