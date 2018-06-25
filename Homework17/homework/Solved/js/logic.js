
var streets = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw"
  );
  var grayscale = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiYnVtYmFsb3JkIiwiYSI6ImNqaWNhZ2d1bjAxOHoza3BqcDQzMHR3Z3AifQ.KzBDaZozIdwa38NsQZslfw"
  );
  var satellite= L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}");
  
  var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets,
    "Satellite": satellite
};

var endDate = new Date();
endDate.setUTCMinutes(0, 0, 0);
var map = L.map("map-id", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [grayscale],

    fullscreenControl: true,
    timeDimension: true,
    timeDimensionControl: true,
    timeDimensionOptions:{
        timeInterval: "PT4H/" + endDate.toISOString(),
        period: "PT4M",
        currentTime: endDate
    },
    timeDimensionControlOptions: {
        autoPlay: false,
        playerOptions: {
            buffer: 10,
            transitionTime: 250,
            loop: true,
        }
    }
        
  

  });

L.control.layers(baseMaps).addTo(map);

  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var geojson;

  d3.json(link, function(data) {
    // console.log(data)
    var latlon=data.features
    latlon.forEach(quake => {
            var longitude=quake.geometry.coordinates[0];
            var latitude=quake.geometry.coordinates[1];
            
            var radi=(quake.properties.mag*12000)
            // console.log(quake.properties.mag) 

        function getColor(x) {
         return x < 1     ?   '#8BC34A':
                x < 2     ?   '#FFD54F':
                x < 3     ?   '#FFC107':
                x < 4     ?   '#F57C00':
                x < 5     ?   '#BF360C':
                              '#ffffb2' ;
              };
           
                var circle= L.circle([latitude, longitude],{
                    // color: 'red',
                    fillColor: getColor(quake.properties.mag),
                    fillOpacity: 0.65,
                    stroke: false,
                    radius:radi}).addTo(map)
                circle.bindPopup(`<p>${quake.properties.title} </p> <p>Magnitude: ${quake.properties.mag}</p>`)
    })
    
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0,1,2,3,4]
    var colors = ['#8BC34A','#FFD54F', '#FFC107','#F57C00','#BF360C'];
    var labels = [];
           
               // Add min & max
               var legendInfo = "<h3>Earthquake Magnitude</h3>" 
               div.innerHTML = legendInfo;
           
               limits.forEach(function(limit, index) {
                 labels.push( "Magnitude: "+`${limit}`+ " to "+ `${limit+1}`)
                 labels.push("<li style=\"background-color: " + colors[index] + "\"> </li>");
               });
           
               div.innerHTML += "<ul>" + labels.join("") + "</ul>";
               return div;
             };
           
             // Adding legend to the map
             legend.addTo(map);
  });
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }
    readTextFile("PB2002_boundaries.json", function(text){
});
