// Setup graph box size
var svgWidth = 960;
var svgHeight = 600;

// Define margins within the box
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Calculate the actual graph size
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
;


// Load data from Census
d3.csv("../D3datajournalism/data.csv").then(function(stateData) {



  // @TODO: YOUR CODE HERE!
  // Step 1: Parse Data/Cast as numbers
  // ============================== 
  stateData.forEach(function(data){
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
  // console.log(data.healthcare, data.poverty);
  });

  // Step 2: Create scale functions
  // I padded them so they are big enough that a bubble
  // doesn't extend over the top or right edges of the axis
  // limits or touch the lines on left or bottom
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d =>d.poverty-2), d3.max(stateData, d =>d.poverty)+2])
    .range([d3.min(stateData, d =>d.poverty-2), width]);
 //   console.log(d3.max(stateData, d =>d.poverty));

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d =>d.healthcare-2), d3.max(stateData, d => d.healthcare)+2])  
    .range([height, d3.min(stateData, d =>d.healthcare-2)]);
 //   console.log(d3.max(stateData, d => d.healthcare));

  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("class", "stateCircle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15");

  //read the radius value to calculate state abbreviation font size
  var radius = circlesGroup.attr("r");
  var fontSize = .8 * radius;  //Proportionately change font size
  // var fontSize = radius - (.2 * radius)  <-original calculation ??\_(???)_/??
  // console.log(radius, fontSize)
  
  
  //Put state names in the circles
  // Cribbed from here
  // https://stackoverflow.com/questions/55988709/how-can-i-add-labels-inside-the-points-in-a-scatterplot
  // ============================
  var circleLabels = chartGroup.selectAll(null).data(stateData).enter().append("text");
  circleLabels
    .attr("class", "stateText")
    .attr("font-size", fontSize)   //can be here or CSS
    .attr("x", function(d) {
    // no need to center the state name horizontally
    return xLinearScale(d.poverty);
    })
  .attr("y", function(d) {
    // +5 centers the state name in the circle (vertically)
    // not sure how to calculate this as a %
    return yLinearScale(d.healthcare)+5;
    })
  .text(function(d) {
    return d.abbr;
    })

    // Step 6: Initialize tool tip
    // ============================
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([60, 80])
      .html(function(d) {
      return (`<strong>${d.state}</strong><br>Living in Poverty: ${d.poverty}%<br>Lacks healthcare: ${d.healthcare}%`);
      });

    // Step 7: Create tooltip in the chart
    // ============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // You need to work with the circle AND the text
    // ============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
    circleLabels.on("mouseover", function(data) {
      toolTip.show(data, this);
    })  

    // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });


  // Create axes labels
  // Y axis
  // ============================
 
  chartGroup.append("text")
      .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2)-40)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  // Create axes labels
  // X axis
  // ============================
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
  }).catch(function(error) {
  console.log(error);

});


//  I started with all this in the read csv function as a sanity check 
//  Moved it down here for historical/refresher purposes
// d3.csv("../D3datajournalism/data.csv").then(function(stateData) {
  // console.log(stateData);
  
    // Break down the CSV into it's components
    // there should be 51 items in each category
    // 50 states + DC
    // this was a personal sanity check to make sure i was reading
    // file correctly, not needed in long run
    
    // var states = stateData.map(data => data.state);
    // var abbr = stateData.map(data => data.abbr);
    // var poverty = stateData.map(data => data.poverty);
    // var povMoe = stateData.map(data => data.povertyMoe);
    // var age = stateData.map(data => data.age);
    // var ageMoe = stateData.map(data => data.ageMoe);
    // var income = stateData.map(data => data.income);
    // var incomeMoe = stateData.map(data => data.incomeMoe);
    // var healthcare = stateData.map(data => data.healthcare);
    // var healthcareLow = stateData.map(data => data.healthcareLow);
    // var healthcareHigh = stateData.map(data => data.healthcareHigh);
    // var obesity = stateData.map(data => data.obesity);
    // var obesityLow = stateData.map(data => data.obesityLow);
    // var obesityHigh = stateData.map(data => data.obesityHigh);
    // var smokes = stateData.map(data => data.smokes);
    // var smokesLow = stateData.map(data => data.smokesLow);
    // var smokesHigh = stateData.map(data => data.incomeMoe);


// Print the individual components
    // console.log("State", states, abbr, "Poverty", poverty, "PovertyMOE", povMoe, "Age",age, "Age Error :",  ageMoe, "income",income, "IncomeMoe", incomeMoe, "healthcare", healthcare,"healthcarelow", healthcareLow,"healthcareHigh", healthcareHigh, "obesity", obesity, "obesityLow",obesityLow, "obesityHigh",obesityHigh, "smokes",smokes, "smokesLow",smokesLow, "smokesHigh",smokesHigh);
  
// Print out the data for each state
  //  stateData.forEach(function(data) {
  //   console.log(data.abbr, "  Age: ", data.age," Age Error :", data.ageMoe, " Income: ",data.income, "IncomeMoe: ",data.incomeMoe,"healthcare", data.healthcare, "healthcarelow", data.healthcareLow, "healthcareHigh",data.healthcareHigh,"obesity",data.obesity, "obesityLow",data.obesityLow, "obesityHigh",data.obesityHigh, "smokes",data.smokes, "smokesLow",data.smokesLow, "smokesHigh",data.smokesHigh);
  //    console.log("Abbreviation:", data.abbr);
  //  });
  