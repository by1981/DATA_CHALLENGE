// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);

// When the browser loads, makeResponsive() is called.
makeResponsive();

function makeResponsive() {

  var svgArea = d3.select("body").select("svg");

  if (!svgArea.empty()) {
    svgArea.remove();
  }
  var svgWidth = 1000;
  var svgHeight = 500;

  // var svgWidth = window.innerWidth;
  // var svgHeight = window.innerHeight;

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
    .attr("transform", `translate(${margin.left+45}, ${margin.bottom-35})`);

  // Read CSV
  d3.csv("data.csv", function(err, myData) {

    // parse data
    myData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.stroke = +data.stroke;
      console.log(data.abbr)
    });
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(myData, d => d.poverty))
      .range([0, width/1.25]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(myData, d => d.stroke)])
      .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // append axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height+5})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(myData)
      .enter()
      .append("circle")
      // .append("text")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.stroke))
      .attr("r", "13")
      .attr("fill", "lightskyblue")
      .attr("stroke-width", ".5")
      .attr("stroke", "lightslategrey")
      .attr("opacity", ".5")
      // .text(d => d.abbr);

    var circlesGroup = chartGroup.selectAll("text.state-label")
      .data(myData)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .classed('state-label', true)
      .style("text-anchor","middle")
      .style("font", "10px sans-serif")
      .style("text-align", "bottom")
      .style("fill", "grey")
      .attr("dx", d => xLinearScale(d.poverty))
      .attr("dy", d => yLinearScale(d.stroke))

    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .attr("border-radius", "8px")
      // .attr("height", 450)
      .offset([80, -65])
      .html(function(d) {
        return (`<strong>${d.state}<hr><strong>${d.poverty}% Poverty<strong><hr>${d.stroke}
        % Stroke`);
      });

      chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top-15})`)
      .attr("text-anchor", "middle")
      .style("font", "15px sans-serif")
      .attr("fill", "rgb(4, 70, 136")
      .text("Poverty %");

      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("y", 0 - (margin.left-10))
      .attr("x", 0 - (height / 2))
      .attr("alignment-baseline","central")
      .style("font", "15px sans-serif")
      .attr("fill", "rgb(85, 122, 160)")
      .text("Stroke %");
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
