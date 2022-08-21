
const margin = {top: 0, right: 20, bottom: 50, left: 20},
    w = 500,
    // h = 300,
    maxTickX = 20,
    maxTickY = 16
    width = w - margin.left - margin.right,
    height = width/5*4
    h = height + margin.top + margin.bottom,
    x = d3.scaleLinear()
    .domain([0, maxTickX])
    .range([margin.left, width + margin.left]),
    // Y axis scale
    y = d3.scaleLinear()
      .domain([0, maxTickY])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
    pointRadius = {raw: 8, hover: 10, scaled: x.invert(x(0) + 10)}

let pointData = [{"x":0.572,"y":0.542,"z":0.702},{"x":0.506,"y":0.213,"z":0.282},{"x":0,"y":0.298,"z":0.006},{"x":0.558,"y":0.427,"z":0.403},{"x":0.498,"y":0.116,"z":0.442},{"x":0.257,"y":0.347,"z":0.361},{"x":0.132,"y":0.223,"z":0.327},{"x":0.553,"y":0.28,"z":0.17},{"x":1,"y":0.525,"z":0.781},{"x":0.627,"y":0.232,"z":0.781},{"x":0.388,"y":0.479,"z":0.176},{"x":0.572,"y":0.513,"z":0.568},{"x":0.166,"y":0.848,"z":0.528},{"x":0.42,"y":0.952,"z":0.381},{"x":0.438,"y":0.69,"z":0.777}],
    rotateAxis = 0,
    startAngle = 0,
    scale = 300,
    origin = [x(0), y(0)],
    meanY = d3.mean(pointData, d => d.y),
    meanZ = d3.mean(pointData, d => d.z),
    b0_1 = 0.4458314,
    b0_2 = 0.3622,
    b1_1 = -0.0003694,
    b1_2 = -0.2824,
    b2 = 0.4697,
    intercept = [{x: 0, y: b0_1, z: 0, id: "intercept"}],
    axisData = [
    [{'x':0,'y':0,'z':0, 'id': 'x'},{'x':1.1,'y':0,'z':0}],
    [{'x':0,'y':0,'z':0, 'id': 'y'},{'x':0,'y':1,'z':0}],
    [{'x':0,'y':0,'z':0, 'id': 'z'},{'x':0,'y':0,'z':1.1}]
    ],
    x1Line2d = [
      [{'x':0,'y':b0_1,'z':0, 'id': 'x1'},{'x':0,'y':b0_1 + b1_1 * 1.1,'z':1.1}]
    ],
    regLines = [
      [{'x':0,'y':b0_2,'z':0, 'id': 'x1'},{'x':1.1,'y':b0_2 + b1_2 * 1.1,'z':0}],
      [{'x':0,'y':b0_2,'z':0, 'id': 'x2'},{'x':0,'y':b0_2 + b2 * 1.1,'z':1.1}]
    ],
    // regPlane = [[0, b0_2, 0],
    //              [1.1, b0_2 + b1_2 * 1.1, 0],
    //              [1.1, b0_2 + b1_2 * 1.1 + b2 * 1.1, 1.1],
    //              [0, b0_2 + b2 * 1.1, 1.1]]
   regPlane = [[{x: 0, y: b0_2, z: 0},
                {'x':1.1,'y':b0_2 + b1_2 * 1.1,'z':0},
                {x: 1.1, y: b0_2 + b1_2 * 1.1 + b2 * 1.1, z: 1.1},
                {'x':0,'y':b0_2 + b2 * 1.1,'z':1.1}]]

const svg = d3.select("#plot")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content", true)
  .call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd))

const plot = svg.append("g").attr('transform', 'translate(0.5,-60.5)')


let mx, my, mouseX, mouseY, mouseOut,
    dims = 1,
    nextDim = false

function key(d) {return d[0].id}

// const dataInit = data.map(d => {return {...d, x: 0, y: y(d.y), z: x(d.x)}})
pointData = pointData.map((d, i) => {return {...d, isAbove: d.y > b0_2 + b1_2 * d.x + b2 * d.z, id: i}})

const axis2dData = axisData.slice(1),
      point2dData = pointData.map(d => {return {...d, x: 0, y: d.y, z: d.x}})


const point3d = d3._3d()
            .x(function(d){ return d.x})
            .y(function(d){ return -d.y})
            .z(function(d){ return d.z})
            .scale(scale)
            .origin(origin),
    line3d = d3._3d()
        .x(function(d){ return d.x})
        .y(function(d){ return -d.y})
        .z(function(d){ return d.z})
        .scale(scale)
        .origin(origin)
        .shape('LINE'),
    plane3d = d3._3d()
        .x(function(d){ return d.x})
        .y(function(d){ return -d.y})
        .z(function(d){ return d.z})
        .shape('PLANE')
        .origin(origin)
        .scale(scale);


let data  = [
    point3d(point2dData),
    line3d(axis2dData),
    line3d(x1Line2d),
    plane3d(regPlane),
    point3d(intercept)
    ]
extentZ = d3.extent(data[0], function(d){ return d.rotated.z }),
zScale  = d3.scaleLinear().domain([extentZ[1], extentZ[0]]).range([6, 7])


function dragStart(){
    if (dims == 1) {
      d3.select("#slope1-container").classed('show', true)
    } else if (dims == 2) {
      d3.select("#slope2-container").classed('show', true)
    }
    mx = event.x;
}

function dragged(){
  mouseX = mouseX || 0;
  mouseOut = Math.min(Math.max(((event.x - mx) * -.5) + mouseX, 0), 180)
  beta = mouseOut * Math.PI / 360;
  nextDim = beta == Math.PI/2
  if (dims == 1) {
    data = [
      point3d.rotateY(beta + startAngle)(point2dData),
      line3d.rotateY(beta + startAngle)(axis2dData),
      line3d.rotateY(beta + startAngle)(x1Line2d),
      plane3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(regPlane),
      data[4]
    ]
    processData(data)
  } else if (dims == 2) {
    data = [
      point3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(pointData),
      line3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(axisData),
      line3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(regLines),
      plane3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(regPlane),
      point3d.rotateX(beta / 10 + startAngle)
        .rotateY(beta / 1.5 + startAngle)
        .rotateZ(beta / 10 + startAngle)(intercept)
    ]
    processData(data)

  }
}

function dragEnd(){
    mouseX = mouseOut
    if (nextDim) {
      dims++
      nextDim = false
      mouseX = 0
      beta = 0
      if (dims == 2) {
        data[0] = point3d(pointData)
        intercept = [{x: 0, y: b0_2, z: 0, id: "intercept"}]
      }
    // extentZ = d3.extent(data[0], function(d){ return d.rotated.z }),
    // zScale  = d3.scaleLinear().domain([extentZ[1], extentZ[0]]).range([  6, 7])
    }
}

function processData(data){
      const plane = plot.selectAll('.reg-plane').data(data[3]);

      plane
          .enter()
          .append('path')
          .merge(plane)
          .attr('class', dims == 1 ? 'reg-plane hidden' : 'reg-plane')
          .attr('d', plane3d.draw);

      plane.exit().remove();

    const points = plot.selectAll('.dot').data(data[0]);

    points
        .enter()
        .append('circle')
        .merge(points)
        .sort(function(a, b){    return d3.descending(a.rotated.z, b.rotated.z); })
        .classed('above', d => {return d.isAbove && (dims > 1)})
        .classed('dot', true)
        .attr('cx', function(d){ return d.projected.x; })
        .attr('cy', function(d){ return d.projected.y; })
        .attr('r' , function(d){ return zScale(d.rotated.z); });

    points.exit().remove();

    const axes = plot.selectAll('.axis').data(data[1], key);
  		axes
  			.enter()
  			.append('line')
  			.merge(axes)
        .attr("class", 'axis')
        // .attr('shape-rendering', 'crispEdges')
        .attr("id", key)
  			.attr('x1', function(d){return d[0].projected.x; })
  			.attr('y1', function(d){ return d[0].projected.y; })
  			.attr('x2', function(d){ return d[1].projected.x; })
  			.attr('y2', function(d){ return d[1].projected.y; });

  		axes.exit().remove();

    const regLines = plot.selectAll('.reg-line').data(data[2], key);
  		regLines
  			.enter()
  			.append('line')
  			.merge(regLines)
        .attr("class", 'reg-line')
        .attr("id", key)
  			.attr('x1', function(d){return d[0].projected.x; })
  			.attr('y1', function(d){ return d[0].projected.y; })
  			.attr('x2', function(d){ return d[1].projected.x; })
  			.attr('y2', function(d){ return d[1].projected.y; });

		regLines.exit().remove();

    const intPoint = plot.selectAll('.intercept').data(data[4]);

    intPoint
        .enter()
        .append('circle')
        .merge(intPoint)
        .sort(function(a, b){    return d3.descending(a.rotated.z, b.rotated.z); })
        .classed('intercept', true)
        .attr('cx', function(d){ return d.projected.x; })
        .attr('cy', function(d){ return d.projected.y; })
        .attr('r' , 10);

    intPoint.exit().remove();
}

processData(data)
