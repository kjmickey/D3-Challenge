// Load data from Census
d3.csv("../D3datajournalism/data.csv").then(function(stateData) {

    console.log(stateData);
  
    // Break down the CSV into it's components
    // there should be 51 items in each category
    // 50 states + DC
    var states = stateData.map(data => data.state);
    var abbr = stateData.map(data => data.abbr);
    var poverty = stateData.map(data => data.poverty);
    var povMoe = stateData.map(data => data.povertyMoe);
    var age = stateData.map(data => data.age);
    var ageMoe = stateData.map(data => data.ageMoe);
    var income = stateData.map(data => data.income);
    var incomeMoe = stateData.map(data => data.incomeMoe);
    var healthcare = stateData.map(data => data.healthcare);
    var healthcareLow = stateData.map(data => data.healthcareLow);
    var healthcareHigh = stateData.map(data => data.healthcareHigh);
    var obesity = stateData.map(data => data.obesity);
    var obesityLow = stateData.map(data => data.obesityLow);
    var obesityHigh = stateData.map(data => data.obesityHigh);
    var smokes = stateData.map(data => data.smokes);
    var smokesLow = stateData.map(data => data.smokesLow);
    var smokesHigh = stateData.map(data => data.incomeMoe);


// Print the individual components
    console.log("State", states, abbr, "Poverty", poverty, "PovertyMOE", povMoe, "Age",age, "Age Error :",  ageMoe, "income",income, "IncomeMoe", incomeMoe, "healthcare", healthcare,"healthcarelow", healthcareLow,"healthcareHigh", healthcareHigh, "obesity", obesity, "obesityLow",obesityLow, "obesityHigh",obesityHigh, "smokes",smokes, "smokesLow",smokesLow, "smokesHigh",smokesHigh);
  
// Print out the data for each state
    stateData.forEach(function(data) {
     console.log(data.abbr, "  Age: ", data.age," Age Error :", data.ageMoe, " Income: ",data.income, "IncomeMoe: ",data.incomeMoe,"healthcare", data.healthcare, "healthcarelow", data.healthcareLow, "healthcareHigh",data.healthcareHigh,"obesity",data.obesity, "obesityLow",data.obesityLow, "obesityHigh",data.obesityHigh, "smokes",data.smokes, "smokesLow",data.smokesLow, "smokesHigh",data.smokesHigh);
  //    console.log("Abbreviation:", data.abbr);
    });
  }).catch(function(error) {
    console.log(error);
  });
  // @TODO: YOUR CODE HERE!
  