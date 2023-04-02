

d3.json("http://localhost:5000/").then(function (data) {
    var theData = {};
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        var county_code = data[i]["County Code"]
        if (county_code)
            county_code = `0${county_code}`;
        if (county_code && !theData[county_code]) {
            theData[county_code] = data[i];
        }
    }
    console.log("theData", theData)
    d3.json('https://raw.githubusercontent.com/plotly/datasets/master/geojson-counties-fips.json').then(function (data) {

    var coKeys = Object.keys(theData);
    data.features = data.features.filter(function (el) { return el.id.indexOf('06') == 0 })
    data.features = data.features.filter(function (el) { return coKeys.includes(el.id) })

    data.features = data.features.map(function (el) {
        el.od = theData[el.id];
        return el;
    })
    console.log(data)
    Plotly.newPlot('myDiv', [{
        type: 'choroplethmapbox',//scattermapbox',
        geojson: data,
        locations: data.features.map(function (el) { return el.id; }),
        z: data.features.map(function (el) { return el.od.Deaths || 0 }),
        text: data.features.map(function (el) { return `Native American Deaths: ${el.od.Deaths} Population ${el.od.Population} County Name ${el.od.County}` })
    }], {
        title: "California Counties",
        height: 800,
        width: 700,
        mapbox: {
            center: {
                lat: 37,
                lon: -119
            },
            style: 'light',
            zoom: 4//,
            // layers: [
            //     {
            //         sourcetype: 'geojson',
            //         source: data,
            //         type: 'line',
            //         color: 'rgba(40,0,113,0.8)'
            //     }
            // ]

        }
    }, {
        mapboxAccessToken: 'pk.eyJ1IjoiZGR1cmEzNDIiLCJhIjoiY2xmdmxuendzMDhmcTNubnpyMTJiYmltayJ9.22rQlKlN5bVj6aQM-BtnSw'

    
    });
    
})
    // console.log("grab_data")
}).catch(function (e) {
    console.log(e)
})


//pk.eyJ1IjoiZGR1cmEzNDIiLCJhIjoiY2xmdmxuendzMDhmcTNubnpyMTJiYmltayJ9.22rQlKlN5bVj6aQM-BtnSw

