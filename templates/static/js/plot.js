
let jsonFile = d3.json("static/data/samples.json");
// console.log(jsonFile);

function buildPlot(sampleNewName){
  jsonFile.then(function(d) {
  
    console.log(d);
    //variable to hold all samples
    let samples = d.samples;

    //variable to select specific Sample
    let selectedSampleId = samples.filter(x => x.id == sampleNewName);

    // console.log(results);
    // set initial valuable to variable selectedSample
    let selectedSample = selectedSampleId[0];

    // console.log(result);

    let sIds = selectedSample.otu_ids;
    let sValues = selectedSample.sample_values;
    let sLabels = selectedSample.otu_labels;
    let usableIds = sIds.map(x => 'OTU ' + x);

    let trace1 = {
      type: 'bar',
      x: sValues.slice(0,10).reverse(),
      y: usableIds.slice(0,10).reverse(), 
      text: sLabels.slice(0,10).reverse(),
      orientation: 'h'
    };
  
    let data = [trace1];

    // let layout = {
    //   title: 'Bbbb',
    // };

   Plotly.newPlot("bar", data, "");

   let trace2 = {
    type: 'scatter',
    mode: 'markers',
    x:sIds,
    y:sValues,
    text:sLabels,
    marker:{
      size: sValues.map(x=>x/1.2),
      color: sIds,
      colorscale: "Earth"
    }
  }
  
  let data2 = [trace2];
  Plotly.newPlot("bubble", data2,"");
  
  function buildTable(){
    let sMetadata = d.metadata;

    let selectedMetadata = sMetadata.filter(x => x.id == sampleNewName)[0];
    let entriesMetadata = Object.entries(selectedMetadata);
    
    let sampleMetadata = d3.select("#sample-metadata");

    sampleMetadata.selectAll("p").remove();
    
    entriesMetadata.forEach(function(x){
      console.log(x);
      sampleMetadata.append("p")
      .text(`${x[0]}:${x[1]}`);
    });

  }
  buildTable();


  });


}
function buildName(){

  // use D3 to select html elementById and store under a variable
  var sampleid = d3.select("#selDataset");

  //call data source and then apply function 
  jsonFile.then(function(d, err) {

    if (err) throw err;

    var sampleNames = d.names;
    
    sampleNames.forEach(x => {

      // using dot notation
      // append <option> html element and apend each selected html item
      sampleid.append("option")
      .text(x)
      .property("value", x);
    
  });

  // load page with first bar graph
  var firstSample = sampleNames[0];
  buildPlot(firstSample);
  });
  
};

function optionChanged(sampleNewName){
  buildPlot(sampleNewName);
}

buildName();

