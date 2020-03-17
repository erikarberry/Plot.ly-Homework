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
        Object.entries(response).forEach(([key, value]) => {
            demographic.append("h3").text(`${key.toUpperCase()}:${value}`);
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
        var sample_values = response.sample_values;
        var otu_ids = response.otu_ids;
        var otu_labels = response.otu_labels;

        var ticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var barChart = [{
            y: ticks,
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        }];
    
        var layoutBar = {
            title: "Top 10 OTU",
            yaxis: {tickmode: "linear"},
            margin: {t:30, l:150}
        }

        // Draw plot
        Plotly.newPlot("bar", barChart, layoutBar);
        
        // Create a bubble chart that displays each sample
        var bubbleChart = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker:{
                size: sample_values,
                color: otu_ids,
            }
        }];

        var layoutBubble = {
            title: "Top Ten OTUs per Sample",
            margin: {t:0},
            hovermode: "closest",
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000,
            margin: {t:30},
        };
        // Draw plot
        Plotly.newPlot("bubble", bubbleChart, layoutBubble); 
    });  
}

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

        // var samples = data.samples;
        // sampleNames.forEach((name,idx) => {
            // selector.append("option").text(name).property("value", samples[idx]);

        const first = sampleNames[0];
        getData(first);
        getPlot(first);
    });
};

// create the function for the change event
function optionChanged(nextSample) {
    getData(nextSample);
    getPlot(nextSample);
}
// Initialize the dashboard
init();