// Get references to the tbody element, input field and button
var tbody = document.querySelector("tbody");
var dateInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var searchBtn = document.querySelector("#search");


// Select unique Countries from the list for the dropdown menu
var countrydropdown=dataSet;
var countrydropdownitem=[]
for(i=0; i < countrydropdown.length; i++){
    var countrydrop=countrydropdown[i];
    countrydropdownitem[i]=countrydrop.country;    
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
for(i=0; i < shapesdropdown.length; i++){
    var shapesdrop=shapesdropdown[i];
    shapesdropdownitem[i]=shapesdrop.shape;    
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

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);


var filtereddata = dataSet;
// renderTable renders the filteredAddresses to the tbody

function renderTable() {
  tbody.innerHTML = "";
  for (var i = 0; i < filtereddata.length; i++) {
    var sighting = filtereddata[i];
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

function handleSearchButtonClick() {
  var filterDate=dateInput.value.trim().toLowerCase();
  var filterCity = cityInput.value.trim().toLowerCase();
  var filterState = stateInput.value.trim().toLowerCase();
  var filterCountry=countryInput.value.trim().toLowerCase();
  var filterShape= shapeInput.value.trim().toLowerCase();

  function city1 (address) {
    var addressCity= address.city.toLowerCase();
    if(filterState){
        addressState=address.state.toLowerCase();
        if(filterState===addressState){
            if(filterDate){
                addressDate=address.datetime;
                if(filterDate===addressDate){
                    console.log(filterDate);
                    return filterCity===addressCity;
                }
            }
            else return filterCity===addressCity
        }
    } else if (filterDate){
        addressDate=address.datetime.toLowerCase();
        if(filterDate===addressDate){
            if(filterShape){
                addressShape=address.shape.toLowerCase();
                if(filterShape===addressShape){
                    console.log(filterShape);
                    return filterCity===addressCity;
                }
            }
            else return filterCity===addressCity
        }   
    } else if(filterShape){
        addressShape=address.shape.toLowerCase();
        if(filterShape===addressShape){
            if(filterState){
                addressState=address.state.toLowerCase();
                if(filterState===addressState){
                    console.log(filterState);
                    return filterCity===addressCity;
                }
            } else if (filterDate){
                addressDate=address.datetime.toLowerCase();
                if(filterDate===addressDate){
                    // console.log(filterDate);
                    return filterCity===addressCity;
                }
            }
            else return filterCity===addressCity
        }
    }
    
    else return addressCity === filterCity;
  }

  function datetime1 (address) {
    var addressDate= address.datetime.toLowerCase();
     return addressDate === filterDate;
  }  
  
  function country1 (address) {
    var addressCountry= address.country.toLowerCase();
    if( filterCity){
        city1();
    }
    return addressCountry === filterCountry;  
  }

  function shape1 (address) {
    var addressShape= address.shape.toLowerCase();
    
            if(filterDate){
                addressDate=address.datetime;
                if(filterDate===addressDate){
                    // console.log(filterDate);
                    return filterShape===addressShape;
                }
            } 
            // else if(filterState && (!filterCity)){
            //     addressState=address.state.toLowerCase();
            //     if(filterState===addressState){
            //         // console.log(filterDate);
            //         return filterShape===addressShape;
            //     }
            // }
            else if (filterCity){
                city1();
            }
            else return filterShape===addressShape
    }

  function state1 (address) {
    var addressState= address.state.toLowerCase();
    if(filterShape){
        addressShape=address.shape.toLowerCase();
        if(filterShape===addressShape){
            if(filterDate){
                addressDate=address.datetime;
                if(filterDate===addressDate){
                    return filterState===addressState;            
                }
            }
        }
    }
    
    else if(!filterCity){
        console.log(filterCity + "no entry")
        if(filterShape){
            addressShape=address.shape.toLowerCase();
            if(filterShape===addressShape){
                return filterState===addressState;
            }
        } else return filterState===addressState;
    }
    
//    else if(filterShape && filterCity==" "){
//         addressShape=address.shape.toLowerCase();
//         console.log(addressShape);
//         if(filterShape===addressShape)
//         return addressState === filterState;

//     }
    else return addressState === filterState;
  }



  if(filterCity){
    filtereddata = dataSet.filter(city1);
    // console.log(filtereddata)
  } 
  else if(filterState){
    filtereddata = dataSet.filter(state1);
  } 
  else if(filterCountry){
    filtereddata = dataSet.filter(country1);
  } 
 else if(filterShape){
    filtereddata = dataSet.filter(shape1);

  } 
  else if (filterDate) {
    filtereddata = dataSet.filter(datetime1);

  }
  // else renderTable();

renderTable();
}
renderTable();




// arr = ["jam", "beef", "cream", "jam"]
var counts = {};
for (var i = 0; i < countrydropdownitem.length; i++) {
    counts[countrydropdownitem[i]] = 1 + (counts[countrydropdownitem[i]] || 0);
}
console.log(counts)


var Shapecounts = {};
for (var i = 0; i < shapesdropdownitem.length; i++) {
    Shapecounts[shapesdropdownitem[i]] = 1 + (Shapecounts[shapesdropdownitem[i]] || 0);
}

var result = Object.keys(Shapecounts).map(function(key) {
    return [Number(key), Shapecounts[key]];
  });

console.log(Shapecounts)
