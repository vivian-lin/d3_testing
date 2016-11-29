//three little circles tutorial - useful for displaying nodes of varying defense-levels + ownership (i.e. node w/ higher defense will be larger) https://bost.ocks.org/mike/circles/
var data = [1, 5, 10, 20, 30];

// establishing svg element for circle elements
var body = d3.select("body");
var svg = body.append("svg")
  .attr("width", 1000)
  .attr("height", 600)

// data join - binding data to all circles (current and future)
var bindDataToCircles = svg.selectAll("circle")
  .data(data);

// dealing w/ surplus data
var newCircles = bindDataToCircles.enter().append("circle")
  .attr("cy",
    function(data) { return Math.random() * 500 + 50 })
  .attr("cx",
    function(data, i) { return Math.random() * 500 + 50 })
  .attr("r",
    function(data) { return Math.sqrt(data) * 10 });
