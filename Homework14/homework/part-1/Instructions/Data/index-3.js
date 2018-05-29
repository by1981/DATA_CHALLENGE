// Get references to the tbody element, input field and button
var tbody = document.querySelector("tbody");
var dateInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var searchBtn = document.querySelector("#search");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);


var filtereddata = dataSet;
// console.log(searchBtn)
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

  function datetime1 (address) {
    var addressDate= address.datetime.toLowerCase();
        if(filterCity= address.city){ 
            return addressDate === filterDate;
        }
  }  
  
  function country1 (address) {
    var addressCountry= address.country.toLowerCase();
    return addressCountry === filterCountry;  
  }

  function city1 (address) {
    var addressCity= address.city.toLowerCase();
    
    if(filterCity){
        if (filterState){
            
            return addressCity== filterCity
        }
        else if(filterShape){
            return addressCity === filterCity;
           }
        else if(filterDate){
            return addressCity === filterCity
        }

    }
    return addressCity === filterCity;
  }
  
  function state1 (address) {
    var addressState= address.state.toLowerCase();
    // if(filterCity){
    //     return addressState === filterState;

    //     } 
    return addressState === filterState
   
  }
  
  function shape1 (address) {
    var addressShape= address.shape.toLowerCase();

    return filterShape === addressShape;

  }
 




  if(filterCity){
    filtereddata = dataSet.filter(city1);
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
  
  else if(filterDate){
    filtereddata = dataSet.filter(datetime1);

  }
//   else renderTable();

renderTable();
}
renderTable();

