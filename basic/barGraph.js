// basic bar graph tutorial - useful for displaying user's hack-power + mine-rate + data-acquired in the corner https://bost.ocks.org/mike/bar/
var data = [10, 8, 12, 16, 23, 2];

// establishing div element w/ class "chart"
var body = d3.select("body");
var chart = body.append("div")
  .attr("class", "chart");

d3.select(".chart")
  // binding data to each "chart" div
  .selectAll("div")
    .data(data)
  // dealing w/ surplus data
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
