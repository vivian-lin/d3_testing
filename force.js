var width = 900,
    height = 500;

var circleWidth = 10;

// var nodes = {
//   "AB12" {
//     targets: [0, 1],
//     hackPower: 1,
//     defenseLevel: 5,
//     miningRate: 1
//   }
// }

function getRandomIndex(max) {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max + 1));
}

function generatePin(counter) {
  return 'AB' + counter;
}

function generateNodes() {
  const nodes = [];
  const targetNodes = [];

  for (var i = 0; i < 40; i++) {
    nodes.push({
      name: generatePin(i),
      defense: 1
    });

    targetNodes.push({
      index: i,
      connections: 3
    });
  }

  function generateTargets() {
    const targetIndicies = [];

    const targetIndex = getRandomIndex(targetNodes.length - 1);
    const target = targetNodes[targetIndex];
    if (
      target.connections >= 1 &&
      targetIndicies.indexOf(target.index) < 0) {
        targetIndicies.push(target.index);
        if (target.connections <= 0) {
          var
        }
    }

    return targetIndicies;
  }

  return nodes.map((node) => {
    const targets = generateTargets();
    node.target = targets
    return node;
  })
}

var nodes = generateNodes();

// var nodes = [
//   { name: "HomeBase" },
//   { name: "AB12", target: [0] },
//   { name: "CD34", target: [0] },
//   { name: "EF56", target: [1] },
//   { name: "GH78", target: [1] },
//   { name: "IJ90", target: [2] },
//   { name: "KL12", target: [2] },
//   { name: "MN34", target: [1, 2, 3] },
// ];

var links = [];

for (var i = 0; i < nodes.length; i++) {
  if (nodes[i].target !== undefined) {
    for (var j = 0; j < nodes[i].target.length; j++) {
      links.push({
        source: nodes[i],
        target: nodes[nodes[i].target[j]]
      })
    }
  }
}

var myChart = d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var force = d3.layout.force()
  .nodes(nodes)
  .links(links)
  .gravity(0.3)
  .charge(-3000)
  .size([width, height]);

window.force = force;

var link = myChart.selectAll('line')
  .data(links).enter().append('line')
  .attr('stroke', 'black');

var node = myChart.selectAll('circle')
  .data(nodes).enter()
  .append('g')
  .call(force.drag);

node.append('circle')
  .attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', circleWidth)
  .attr('fill', 'black');

node.append('text')
  .text(function(d) { return d.name })
  .attr('font-family', 'Courier New')
  .attr('fill', function(d,i) {
    if (i > 6) {
      return 'red';
    } else if (i > 5) {
      return 'green';
    } else if (i > 4) {
      return 'yellow';
    } else if (i > 3 || i > 0) {
      return 'blue';
    }
  })
  .attr('text-anchor', 'end')
  .attr('font-size', function(d,i) {
    if (i == 0) {
      return '3em';
    } else {
      return '1.5em';
    }
  })

//with every JS tick, on an event "e", transform/animate the nodes
force.on('tick', function(e) {
  node.attr('transform', function(d, i) {
    return 'translate('+ d.x +', '+ d.y +')'
  })
  link
    .attr('x1', function(d){ return d.source.x })
    .attr('y1', function(d){ return d.source.y })
    .attr('x2', function(d){ return d.target.x })
    .attr('y2', function(d){ return d.target.y })
});


force.start();
