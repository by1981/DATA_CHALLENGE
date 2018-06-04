// Get references to the tbody element, input field and button
var tbody = document.querySelector("tbody");
var dateInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var searchBtn = document.querySelector("#search");
var pageInput=document.querySelector("page");


// Select unique Countries from the list for the dropdown menu
var countrydropdown=dataSet;
var countrydropdownitem=[]
countrydropdownitem[0]=" "
for(i=0; i < countrydropdown.length; i++){
    var countrydrop=countrydropdown[i];
    countrydropdownitem[i+1]=countrydrop.country;    
}

const uniqueCountry = (value, index, self) => {
    return self.indexOf(value) === index;
}
const uniqueCountryValues = countrydropdownitem.filter(uniqueCountry);
var count=0;
// Function to return uniques Country in the dropdown menu
function Country() {
    //Build an array containing Country records.
     var countryDropDownList = uniqueCountryValues;
     var btnGenerate = document.getElementById("country");
     //Add the Options to the DropDownList.
     for (var i = 0; i < countryDropDownList.length; i++) {
        if(count==0){
         var option = document.createElement("OPTION");
         //Set Country in Text part.
         option.innerHTML = countryDropDownList[i];
         //Add the Option element to DropDownList.
         btnGenerate.options.add(option);
        }
     }
     count=count+1;
 }

// Select unique shapes from the list for dropdown menu
var shapesdropdown=dataSet;
var shapesdropdownitem=[]
shapesdropdownitem[0]=" ";
for(i=0; i < shapesdropdown.length; i++){
    var shapesdrop=shapesdropdown[i];
    shapesdropdownitem[i+1]=shapesdrop.shape;    
}
const uniqueShape = (value, index, self) => {
    return self.indexOf(value) === index;
}
const uniqueShapeValues = shapesdropdownitem.filter(uniqueShape);
count1=0;
 function Shape() {
    //Build an array containing Shape records.
     var shapeDropDownList = uniqueShapeValues;
    
     var btnGenerate = document.getElementById("shape");
     //Add the Options to the DropDownList.
     for (var i = 0; i < shapeDropDownList.length; i++) {
        if(count1==0){
         var option = document.createElement("OPTION");
         //Set Shape in Text part.
         option.innerHTML = shapeDropDownList[i];
         //Add the Option element to DropDownList.
         btnGenerate.options.add(option);
        }
        
     }
     count1=count1+1;
 }
 var count3=0;
 function Item() {
    //Build an array containing Country records.
     var itemDropDownList = [10,20,30,40,50,75,100,125,150,200,250];
     var btnGenerateItem2 = document.getElementById("page");
     //Add the Options to the DropDownList.
     for (var i = 0; i < itemDropDownList.length; i++) {
        if(count3==0){
         var option = document.createElement("OPTION");
         //Set Country in Text part.
         option.innerHTML = itemDropDownList[i];
         //Add the Option element to DropDownList.
         btnGenerateItem2.options.add(option);
        }
     }
     console.log(document.getElementById("page").value);
     count3=count3+1;
     
 }
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);
var filtereddata = dataSet;
// renderTable renders the filteredAddresses to the tbody

function renderTable(filteredResult) {
  tbody.innerHTML = "";
  for (var i = 0; i < filteredResult.length; i++) {
    var sighting = filteredResult[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = sighting[field];
    }
  }
}
var count=0;
function filterAdvanced() {
    // '', 0, null, undefined, false ========> false values
    // Evertything else is truthy.
    var filterDate=dateInput.value.trim().toLowerCase();
    var filterCity = cityInput.value.trim().toLowerCase();
    console.log(filterCity)
    var filterState = stateInput.value.trim().toLowerCase();
    var filterCountry=countryInput.value.trim().toLowerCase();
    var filterShape= shapeInput.value.trim().toLowerCase();
    

    var filteredResult = dataSet.filter(function(address) {
        var addressDate=address.datetime.toLowerCase();
        var addressCity= address.city.toLowerCase();
        var addressState=address.state.toLowerCase();
        var addressShape=address.shape.toLowerCase();
        var addressCountry=address.country.toLowerCase();       
        if (filterDate && addressDate != filterDate) {
            // console.log(filterDate + " AND "+ addressDate)        
            return false;
        }
        count+=1;

        if (filterCity && addressCity != filterCity) {
            return false;
        }
        if (filterShape && addressShape != filterShape) {
            return false;
        }
        if (filterCountry && addressCountry!= filterCountry) {
            return false;
        }
        if (filterState && addressState!= filterState) {
            return false;
        }
        return true;        
    });
  renderTable(filteredResult);
console.log(filteredResult);
}

function handleSearchButtonClick() {
    filterAdvanced();

  console.log(count);
}
renderTable(filtereddata);


// // var dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// function giveMeData(pageNumber, btnGenerateItem) {
//   var startIndex = pageNumber * btnGenerateItem; // 2 * 2 = 4
//   var endIndex = startIndex + btnGenerateItem;
  
//   console.log("Total num of pages: " + Math.ceil(dataset.length / btnGenerateItem));
  
//   return dataset.slice(startIndex, endIndex);
// }

// var result1 = giveMeData(0, 2); // [0, 1]
// var result2 = giveMeData(1, 2); // [2, 3]
// var result3 = giveMeData(2, 2); // [4, 5]


// console.log(result3);

var dataset2 = [];
var filterPage= pageInput.value.trim().toLowerCase();

for (var n = 0; n < 100; n++) {
	dataset2.push ([n, Math.random()*50, Math.random()*30]);
}

var rows = d3.select("table").selectAll("tr").data(dataset2)
	.enter()
	.append("tr")
  ;
  
  var cells = rows.selectAll("td").data(function(d) { return d; })
  	.enter()
    .append("td")
    .text(function(d) { return d; })
  ;
  
  d3.select("#buttons").datum({portion : 0});
  // the chain select here pushes the datum onto the up and down buttons also
  d3.select("#buttons").select("#Previous").on ("click", function(d) {
  	d.portion -= filterPage;
    redraw (d.portion);
  });
   d3.select("#buttons").select("#Next").on ("click", function(d) {
  	d.portion += filterPage;
    redraw (d.portion);
  })
  
  function redraw (start) {
  	d3.select("table").selectAll("tr")
    	.style("display", function(d,i) {
      	return i >= start && i < start + filterPage ? null : "none";
      })
  }
  redraw(0);
