function buildMetadata(sample) {
//   var url = `/metadata/${sample}`;
    d3.json("samples.json").then((response) => {
        var metadata = response.metadata;
        var keyarray = metadata.filter(sampleObj => sampleObj.id == sample);
        var response = keyarray[0];
        var demographic = d3.select("#sample-metadata");
        demographic.html("");
        Object.entries(results).forEach(([key, value]) => {
        demographic.append("h5").text(`${key}:${value}`);
        });
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((response) => {
    console.log(response);

    var samples = response.samples;
    var keyarray = samples.filter(sampleObj => sampleObj.id == sample);
    var response = keyarray[0];
    var tenSam = response.sample_values;
    var tenID = response.otu_ids;
    var tenLabels = response.otu_labels;
    
// @TODO: Build a Bubble Chart using the sample data
    var bubbleChart = [{
    //   title: "Top Ten OTUs per Sample",
        x: tenID,
        y: tenLabels,
        mode: 'markers',
        text: tenLabels,
        marker:{
            size:  tenSam,
            color: tenID,
        }
    }];
    var layoutBubble = {
        title: "Top Ten OTUs per Sample",
        margin: {t:0},
        hovermode: "closest", 
        xaxis: {title: "OTU IDs"},
        margin: {t:30},
        };
    Plotly.newPlot("bubble", bubbleChart, layoutBubble);

    var ticks = tenID.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    var barChart = [{
        y: ticks,
        x: tenSam.slice(0,10).reverse(),
        text: tenLabels.slice(0,10).reverse(),
        orientation: "h",
    }]
    var layoutBar = {
        title: "TBD",
        margin: {t:30, l:150}
    }
    Plotly.newPlot("bar", barChart, layoutBar);
    
    });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
// Initialize the dashboard
init();