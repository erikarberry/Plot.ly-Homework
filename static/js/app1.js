function getData(sample) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var metadata = data.metadata;
        console.log(metadata)
        // var data = metadata.filter(meta => meta.id.toString() === id) [0];
        var sampleData = d3.select("#sample-metadata");
        sampleData.html("");
    // grab the necessary data per id and append the info into the panel
    Object.entries(data).forEach(function([key, value]) {   
            // var row = sampleData.append("p");
            // row.text(`{key}:${value}`);
        var row = sampleData.append("tr");
        var cell = row.append("td"); 
        cell.text(`{key}:${value}`);
        });
    });
}

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function getPlot(sample) {
    // read the json file to get data']
    d3.json("samples.json").then((data)=> {
        console.log(data)
        // filter by id 
            // function filterID(otu_id) {
            //     return slice(otu_id.otu_ids) [0];
            // }
            // var samples = toptensamples.filter(filterID);
            // console.log(samples);

        var toptensamples = data.sample_values.slice(0,10);
        console.log(toptensamples);
        var otu_id = data.otu_ids.slice(0,10);
        console.log(otu_id);
        var otu_labels = data.otu_labels.slice(0,10);
        console.log(otu_labels);
  
        var barChart = {
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
            mode: 'markers',
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
    d3.json("samples.json").then((sampleNames)=> {
        var sampleNames = sampleNames.names;
        sampleNames.forEach((data) => {
            selector.append("option").text(data).property("value", data);
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