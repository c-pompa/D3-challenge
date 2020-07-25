// @TODO: YOUR CODE HERE!


// Define SVG Area
////////////////////////////////////////
// SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;


// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter id in div, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Import CSV - All data

// Load data from hours-of-tv-watched.csv
d3.csv("./assets/data/data.csv").then(function(data_csv) {

    console.log(data_csv);

    // Cast the poverty value to a number for each piece of data_csv
    data_csv.forEach(function(d) {
        d.poverty = +d.poverty;
  });

    // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
    var xBandScale = d3.scaleBand()
        .domain(d.map(d => d.poverty))
        .range([0, chartWidth])
        .padding(0.1);

    // Create a linear scale for the vertical axis.
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data_csv, d => d.healthcare)])
        .range([chartHeight, 0]);
    
    // Create two new functions passing our scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append two SVG group elements to the chartGroup area,
    // and create the bottom and left axes inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    // Create Scatter Plot
    // Create one SVG rectangle per piece of tvData
    // Use the linear and band scales to position each rectangle within the chart
    chartGroup.selectAll("#scatter")
        .data(data_csv)
        .enter()
        .append("rect")
        .attr("class", "scatter")
        .attr("x", d => xBandScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("width", xBandScale.bandwidth())
        .attr("height", d => chartHeight - yLinearScale(d.healthcare));

    }).catch(function(error) {
    console.log(error);
});
  




