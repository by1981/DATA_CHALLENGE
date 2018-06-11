
function dropDown() {
var count1=0;
var url="http://localhost:5000/names";
Plotly.d3.json(url, function(error, response){
 var itemDropDownList = response;
     var btnGenerate = document.getElementById("selDataset");
     for (var i = 0; i < itemDropDownList.length; i++) {
        if(count1==0){
         var option = document.createElement("OPTION");
         option.innerHTML = itemDropDownList[i];
         btnGenerate.options.add(option);
        }
     }
     count1=count1+1;
    })
}
function optionChanged(data){
    var sampleItem = data;


function sampleMetaData() {
    var url='/metadata/'+sampleItem
    Plotly.d3.json(url, function(error, response){
    var data=response
    var x = document.getElementById("sampleMetaData1");
    var y = document.getElementById("sampleMetaData2");
    var w = document.getElementById("sampleMetaData3");
    var u = document.getElementById("sampleMetaData4");
    var z = document.getElementById("sampleMetaData5");
    var v = document.getElementById("sampleMetaData6");

    x.innerHTML="SAMPLEID: "+ data.SAMPLEID
    y.innerHTML="ETHNICITY: " + data.ETHNICITY
    w.innerHTML="GENDER: " + data.GENDER
    u.innerHTML="AGE: " + data["AGE"]
    z.innerHTML="LOCATION: " + data["LOCATION"]
    v.innerHTML="BBTYPE: " + data["BBTYPE"]
    return data
    });
}

// otu();

//         function otu(){
//             var url='/otu'
//             Plotly.d3.json(url, function(error, response){
//                 var otu_lowest=response
//                 for (var i=0; i<otu_lowest.length; i++){
//                     otuLowestFilter[i]=otu_lowest[i]
//                 }
                
//             })
            
//         }
        

// console.log(otuLowestFilter)
        
function sampleSample(){ 
    var url='/samples/'+sampleItem
    // var btnGenerate = document.getElementById("selDataset");
    Plotly.d3.json(url, function(error, response){    
    var data1=response
    var data2=[]
    console.log(data1[0])
    console.log(data1[1])

        reversed_otu=data1[0].reverse()
        reversed_value=(data1[1]).reverse()
        slicedValue=reversed_value.slice(0,10)
        slicedOtu=reversed_otu.slice(0,10)


        // otuLowestvalues=[]
        // var url2='/otu'
        // var slicedData2=[]
        // Plotly.d3.json(url2, function(error, response){    
        //     var otuLowestvalues=response
        //     for(i=0; i<otuLowestvalues.length; i++){
        //     data2[i]=otuLowestvalues[i]
        //     }
            
        //     reversed_data2=data2.reverse()
        //     slicedData2=reversed_data2.slice(0,10)
        //     console.log(slicedData2)
        // for(var i=0; i<data2.length; i++){
        //     otuLowestvalues[i]=data2[i];
        //     }
        // });
        
        // console.log(slicedData2)

        

        var piechartData = [{
            values: slicedValue,
            labels: slicedOtu,
            type: 'pie'
          }];
          var layout = {
            height: 555,
            width: 555
          };
        Plotly.newPlot('piechart', piechartData, layout);

        x_axis_values=[]
        y_axis_values=[]
        for (var i=0; i<data1[0].length; i++){
            if(data1[1][i]>0){
                x_axis_values[i]=data1[0][i]
                y_axis_values[i]=data1[1][i]
            }
        }
 
        var y_size=[]
        for(var i=0; i<y_axis_values.length; i++){
            y_size[i]= y_axis_values[i]^1.5;
        }
        var trace1 = {
          type: "scatter",
          mode: 'markers',
          name: "OTU_ID vs Samples",
          x: x_axis_values,
          y: y_axis_values,
          marker: {
             size: y_size,
             color: x_axis_values,
            sizeref: 5,
            sizemin: 4, 
          }, 
        };
        var data2 = [trace1];
        layout = {
            title: 'OTU_ID vs Samples', 
            xaxis: {title: 'OTU_ID'}, 
            yaxis: {title: 'Sample_Values', autorange: true}
          };
        Plotly.newPlot("scatterplot", data2, layout);

        });
    // });
    
}

sampleMetaData();
sampleSample();

}

dropDown();
    
















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
