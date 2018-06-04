
var UFOData=dataSet;
var countryCount=[]
var shapeCount=[]

const mapcountry = UFOData.map(function(item) {
  return item.country

  });
const mapshape = UFOData.map(function(item) {
  return item.shape
  });

for (var i = 0; i < mapcountry.length; i++) {
  countryCount[mapcountry[i]] = 1 + (countryCount[mapcountry[i]] || 0);
}
// console.log(countryCount)
  
for (var i = 0; i < mapshape.length; i++) {
  shapeCount[mapshape[i]] = 1 + (shapeCount[mapshape[i]] || 0);
}
var shapekeys=[]
var shapevalues=[]
Object.keys(shapeCount).forEach(key => {
  shapekeys.push(key);     
  shapevalues.push(shapeCount[key]);    
});
var countryKeys=[]
var countryValues=[]
Object.keys(countryCount).forEach(key => {
  countryKeys.push(key);     
  countryValues.push(countryCount[key]);    
});

  var trace1 = {
    x: shapekeys,
    y: shapevalues,
    type:"bar"};

  var trace2 = {
    x: countryKeys,
    y: countryValues,
    type:"bar"};
      
  var shapeData = [trace1];

  var layout = {
    title: "Shapes Analysis",
    font: {
      size: 13,
      color: 'white'
    },
    plot_bgcolor:"rgba(14, 45, 73, 0.993)",
    paper_bgcolor:"rgba(14, 45, 73, 0.993)",
    xaxis: { title: "Shapes"},
    yaxis: { title: "Count"},
    text: shapevalues
  
  };
  
  Plotly.newPlot("shapePlotting", shapeData, layout);

  var countryData = [trace2];

  var layout2 = {
    title: "Country Analysis",
    font: {
      size: 13,
      color: 'white'
    },
    plot_bgcolor:"rgba(14, 45, 73, 0.993)",
    paper_bgcolor:"rgba(14, 45, 73, 0.993)",
    xaxis: { title: "Country"},
    yaxis: { title: "Count"},
    text: countryValues,
  
   
  };
  Plotly.newPlot("countryPlotting", countryData, layout2);

const usStates=UFOData.map(function(item){
  if(item.country==="us"){
    return item.state;
  } 
});
var stateCount=[]
for (var i = 0; i < usStates.length; i++) {
  stateCount[usStates[i]] = 1 + (stateCount[usStates[i]] || 0);
}
delete stateCount.undefined
var statekeys=[]
var statevalues=[]
Object.keys(stateCount).forEach(key => {
  statekeys.push(key);     
  statevalues.push(stateCount[key]);    
});
var trace3 = {
  x: statekeys,
  y: statevalues,
  type:"bar"};

  var stateData = [trace3];

  var layout3 = {
    title: "US States Analysis",
    font: {
      size: 13,
      color: 'white'
    },
    plot_bgcolor:"rgba(14, 45, 73, 0.993)",
    paper_bgcolor:"rgba(14, 45, 73, 0.993)",
    xaxis: { title: "State"},
    yaxis: { title: "Count"},
    text: countryValues,
  
   
  };
  Plotly.newPlot("statePlotting", stateData, layout3);