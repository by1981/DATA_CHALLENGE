// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $searchBtn1 = document.querySelector("#search1");
var $searchBtn2 = document.querySelector("#search2");
var $searchBtn3 = document.querySelector("#search3");
var stateInput = document.querySelector("#state");

console.log($searchBtn2)

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn1.addEventListener("click", handleSearchButtonClickforstate);
$searchBtn2.addEventListener("click", handleSearchButtonClickfordate);
$searchBtn3.addEventListener("click", handleSearchButtonClickforcity);
// Set filteredAddresses to addressData initially
var filtereddata = dataSet;
// console.log(addressData)
console.log($searchBtn1)
console.log($searchBtn3)
// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filtereddata.length; i++) {
    // Get get the current address object and its fields
    var sighting = filtereddata[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClickforstate() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterstateinput = stateInput.value;

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filtereddata = dataSet.filter(function(sighting) {
    var State1 = sighting.state.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return State1 === filterstateinput;
  });
  // console.log(filteredAddresses)
  renderTable();
}
function handleSearchButtonClickfordate() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterdateinput = $datetimeInput.value;

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filtereddata = dataSet.filter(function(address) {
    var addressState = address.datetime.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return addressState === filterdateinput;
  });
  // console.log(filteredAddresses)
  renderTable();
}

function handleSearchButtonClickforcity() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterCity = $cityInput.value;

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  filtereddata = dataSet.filter(function(address) {
    var City1 = address.city.toLowerCase();

    // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
    return City1 === filterCity;
  });
  // console.log(filteredAddresses)
  renderTable();
}

// Render the table for the first time on page load
renderTable();
