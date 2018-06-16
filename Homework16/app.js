// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width and
  // height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left+15}, ${margin.top})`);

  // Read CSV
  d3.csv("data.csv", function(err, medalData) {

    // create date parser
    // var poverty = d3.timeParse("%d-%b");

    // parse data
    medalData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.stroke = +data.stroke;
      console.log(data.abbr)
    });
    // create scales
    var xTimeScale = d3.scaleLinear()
      .domain(d3.extent(medalData, d => d.poverty))
      .range([0, width/1.5]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(medalData, d => d.stroke)])
      .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xTimeScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);


    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(medalData)
      .enter()
      .append("circle")
      .attr("cx", d => xTimeScale(d.poverty))
      .attr("cy", d => yLinearScale(d.stroke))
      .attr("r", "15")
      .attr("fill", "lightskyblue")
      .attr("stroke-width", ".5")
      .attr("stroke", "lightslategrey")
      // .text( d => d.abbr)
    // console.log(.abbr)

    var textGroup = chartGroup.selectAll("text")
    .data(medalData)
    .enter()
    .append("text")
    .style("text-anchor","middle")
    .style("font", "10px sans-serif")
    .style("fill", "white")
    // .attr("startOffset", "50%")
    // .attr("alignment-baseline","central")
    
    // .attr("")
    .attr("x", d => xTimeScale(d.poverty))
    .attr("y", d => yLinearScale(d.stroke))
    .text(d => d.abbr)
    
     

    // Date formatter to display dates nicely
    // var dateFormatter = d3.timeFormat("%d-%b");

    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .attr("border-radius", "8px")
      // .attr("height", 450)
      .offset([80, -65])
      .html(function(d) {
        return (`<strong>${d.poverty}% Poverty<strong><hr>${d.stroke}
        % Stroke`);
      });

      chartGroup.append("text")
      // Position the text
      // Center the text:
      // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
      .attr("transform", `translate(${width / 3}, ${height + margin.top-15})`)
      .attr("text-anchor", "middle")
      // .attr("font-size", "16px")
      .style("font", "12px sans-serif")
      .attr("fill", "rgb(4, 70, 136")
      .text("Poverty");

      chartGroup.append("text")
      // Position the text
      // Center the text:
      // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
      .attr("transform", `translate(${margin.right-95}, ${width/3})`)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline","central")
      .style("font", "12px sans-serif")
      .attr("fill", "rgb(85, 122, 160)")
      .text("Stroke");
    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);
    //toolTip(chartGroup)

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function(d) {
        toolTip.hide(d);
      });

  });
}
