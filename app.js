var globalData;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then(function(data){
    console.log(data); 
    globalData = data
    var names = data.names;
    buildDropdown(names)   
    var samples = data.samples;
    //test sample el 1
    var testotu_ids = samples[0].otu_ids.slice(0,10).reverse()
    var testotu_labels = samples[0].otu_labels.slice(0,10).reverse()
    var testsample_values = samples[0].sample_values.slice(0,10).reverse()
    buildBarchart(testotu_ids,testotu_labels,testsample_values)
    buildBubblechart(testotu_ids,testsample_values,testotu_labels)
    buildsample_metadata(data.metadata[0])
})
function buildDropdown(names){
    var selectEl = d3.select("#selDataset");
    selectEl.selectAll()
    .data(names)
    .enter()
    .append("option")
    .attr("value",function(el) {return el})
    .text(function(el){return el});
}

function optionChanged(value){
    console.log(value)
    var samples = globalData.samples
    for (var i = 0; i < samples.length;i++){
        var sample = samples[i];
        if(sample.id == value){
            var otu_ids = sample.otu_ids.slice(0,10).reverse()
            var otu_labels = sample.otu_labels.slice(0,10).reverse()
            var sample_values = sample.sample_values.slice(0,10).reverse()  
            buildBarchart(otu_ids,otu_labels,sample_values)
            buildBubblechart(otu_ids,sample_values,otu_labels);
            buildsample_metadata(globalData.metadata[i])//assumes parallel arrays
            return;

        }
    }
}
function buildBarchart(otu_ids,otu_labels,sample_values){
    var barChart = [
        {
            x: sample_values,
            y: otu_ids.map(function(el){return `OTU ${el}`}),
            text: otu_labels,
            type: 'bar',
            orientation: 'h'
        }
    ];
    Plotly.newPlot('bar',barChart);
}

function buildBubblechart(otu_ids,sample_values,otu_labels){
    var bubbleChart = 
        {
            x: otu_ids,
            y: sample_values.map(function(el){return `${el}`}),
            text: otu_labels,
            mode:'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: "Earth"
            }

        };
        var data = [bubbleChart];
        var layout = {
            title:"bubble graph",
            showlegend: false,
            height: 600,
            width: 1200

        };

        Plotly.newPlot('bubble', data, layout);
}

    function buildsample_metadata(sample_metadatum){
            console.log(sample_metadatum)
            d3.select("#sample-metadata")
            .html("")
            .selectAll()
            .data(Object.entries(sample_metadatum))
            .enter()
            .append("h6")
            .text(function(el){return `${el[0].toUpperCase()}: ${el[1]}`})
    }
    