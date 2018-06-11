/* data route */

var count3=0;
// var itemDropDownList = ["All",10,20,30,40,50,75,100,125,150,200,250];
var itemDropDownList = names();
 function optionChanged() {
    //Build an array containing Country records.
     var btnGenerate = document.getElementById("selDataset");
     //Add the Options to the DropDownList.
     for (var i = 0; i < itemDropDownList.length; i++) {
        if(count3==0){
         var option = document.createElement("OPTION");
         //Set Country in Text part.
         option.innerHTML = itemDropDownList[i];
         //Add the Option element to DropDownList.
         btnGenerate.options.add(option);
        }
     }
     count3=count3+1;
 }

 optionChanged();






















// var url = "/data";
// function buildPlot() {
//   Plotly.d3.json(url, function(error, response) {

//     console.log(response);
//     var trace1 = {
//       type: "scatter",
//       mode: "lines",
//       name: "Bigfoot Sightings",
//       x: response.map(data => data.months),
//       y: response.map(data => data.sightings),
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: "Bigfoot Sightings Per Year",
//       xaxis: {
//         type: "date"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);
//   });

//   Plotly.d3.json('/pie', function(error, data){
//     if (error) return console.warn(error);

//     var layout = {
//         title: "Lyric Frequency"}
//     var PIE = document.getElementById('pie');
//     Plotly.plot(PIE, data, layout);
// })

// }

// buildPlot();
