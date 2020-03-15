function getData(sample) {
    // read the json file to get data
    var metaData = `/metadata/${samples}`;
    d3.json(metaData).then(function(data) {
        var sample_metadata = d3.select("#sample-metadata")
        console.log(data);
        sample_metadata.html("");
        // grab the necessary data per id and append the info into the panel
        Object.entries(data).forEach(function([key, value]) {   
            var row = sample_metadata.append("p");
            row.text(`{key}:${value}`);
            // var row = sampleData.append("tr");
            // var cell = row.append("td"); 
            // cell.text(`{key}:${value}`);
        });
    });
}

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function getPlot(sample) {
    var metaData = `/metadata/${sample}`;
    // read the json file to get data
    d3.json(metaData).then(function(data) {
        console.log(data);
        // filter by id 
        var toptensamples = data.sample_values.slice(0,10);
        console.log(toptensamples);
        var otu_id = data.otu_ids.slice(0,10);
        console.log(otu_id);
        var otu_labels = data.otu_labels.slice(0,10);
        console.log(otu_labels);
  
        var barChart = {
            x: samplevalues,
            y: otu_id,
            text: otu_labels,
            // marker: {
            //   color: 'rgb(142,124,195)'},
            type:"bar",
            orientation: "h",
        };
  
        var data1 = [barChart];
  
        var layout1 = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        // Create a bubble chart that displays each sample
        var BubbleChart = {
            x: otu_id,
            y: toptensamples,
            mode: "markers",
            text: otu_labels,
            marker: {
                size: toptensamples,
                color: otu_ids
            }
        };
        var data2 = [BubbleChart];
        var layout2 = {
            height: 600,
            width: 1000,
            hovermode: "closets",
            xaxis:{title: "OTU ID"},
        };
    // Draw plot
    Plotly.newPlot("bar", data1, layout1);
    // Draw plots
    Plotly.newPlot("bubble", data2, layout2); 
    });
};  

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var selector = d3.select("#selDataset");
    // read the json file to get data
    d3.json("/names").then((sampleNames)=> {
        sampleNames.forEach((data) => {
            selector.append("option").text(data).property("value",data);
        });
        const first = sampleNames[0];
        getData(first);
        getPlot(first);
    });
}
// create the function for the change event
function optionChanged(nextSample) {
    getData(nextSample);
    getPlot(nextSample);
}

// Initialize the dashboard
init();