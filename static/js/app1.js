function getData(sample) {
    // read the json file to get data
    d3.json("samples.json").then((response)=> {
        console.log(response)
        var metadata = response.metadata;
        console.log(metadata)
        var keyarray = metadata.filter(sampleObj => sampleObj.id == sample);
        var response = keyarray[0];
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        // grab the necessary data per id and append the info into the panel
        Object.entries(results).forEach(([key, value]) => {
            demographic.append("h5").text(`${key}:${value}`);
// Object.entries(sample).forEach(function([key, value]) {   
//     var row = sampleData.append("p");
//     row.text(`{key}:${value}`);
        });
    });
}

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function getPlot(sample) {
    d3.json("samples.json").then((response) => {
        console.log(response);
        var samples = response.samples;
        var keyarray = samples.filter(sampleObj => sampleObj.id == sample);
        var response = keyarray[0];
        var tenSam = response.sample_values;
        var tenID = response.otu_ids;
        var tenLabels = response.otu_labels;

// var sample_values = sample.sample_values;
// var toptensamples = sample.sample_values.slice(0,10);
// console.log(toptensamples);
// var otu_id = sample.otu_ids.slice(0,10);
// console.log(otu_id);
// var otu_labels = sample.otu_labels.slice(0,10);
// console.log(otu_labels);
        var ticks = tenID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var barChart = [{
            y: ticks,
            x: tenSam.slice(0,10).reverse(),
            text: tenLabels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
// x: sample_values,
// y: otu_id,
// text: otu_labels,
// type: "bar",
// orientation: "h"
        }];
    
// var data1 = [barChart];
    
        var layoutBar = {
            title: "Top 10 OTU",
            yaxis: {tickmode: "linear"},
            margin: {t:30, l:150}
        }

        // Draw plot
        Plotly.newPlot("bar", barChart, layoutBar);
        
        // Create a bubble chart that displays each sample
        var BubbleChart = [{
            x: tenID,
            y: tenLabels,
            mode: 'markers',
            text: tenLabels,
            marker:{
                size:  tenSam,
                color: tenID,
// x: otu_id,
// y: sample_values,
// mode: 'markers',
// text: otu_labels,
// marker: {
//     size: sample_values,
//     color: otu_id
            }
        }];
// var data2 = [BubbleChart];
        var layoutBubble = {
            title: "Top Ten OTUs per Sample",
            margin: {t:0},
// height: 600,
// width: 1000,
            hovermode: "closest",
            xaxis:{title: "OTU ID"},
            margin: {t:30},
        };
        // Draw plot
        Plotly.newPlot("bubble", bubbleChart, layoutBubble); 
    // });
});  

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var selector = d3.select("#selDataset");
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector.append("option").text(sample).property("value", sample);
        });
    });
        // var samples = data.samples;
        // sampleNames.forEach((name,idx) => {
            // selector.append("option").text(name).property("value", samples[idx]);

    const first = samples[0];
    getData(first);
    getPlot(first);
    };
}

// create the function for the change event
function optionChanged(nextSample) {
    getData(nextSample);
    getPlot(nextSample);
}

// Initialize the dashboard
init();