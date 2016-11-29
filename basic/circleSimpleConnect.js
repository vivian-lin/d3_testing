var data = [10, 20];
var coordinates = [];

var body = d3.select("body");
var svgCircle = body.append("svg")
  .attr("width", 900)
  .attr("height", 500)
  .attr("class", "svgConnected")

var bindDataToCircles = svgCircle.selectAll("circle")
  .data(data);

var newCircles = bindDataToCircles.enter().append("circle")
  .attr("cx",
    function(data) {
      coordinates.push(data*30);
      return data*30;
    })
  .attr("cy",
    function(data) {
      coordinates.push(data+200);
      return data + 200;
    })
  .attr("r",
    function(data) { return Math.sqrt(data) * 10 });

svgCircle.append("line")
  .attr("x1", coordinates[0])
  .attr("y1", coordinates[2])
  .attr("x2", coordinates[1])
  .attr("y2", coordinates[3])
  .attr("stroke-width", 5)
  .attr("stroke", "white");
