
const // prototypes
    fp = Function.prototype,
    ap = Array.prototype,
    // callable forEach
    forEach = fp.call.bind(ap.forEach),

    margin = {top: 20, right: 10, bottom: 20, left: 70},
    w = 500,
    h = 350,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([-10, 10])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([-50, 50])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top])

const points = [-10,-9.9,-9.8,-9.7,-9.6,-9.5,-9.4,-9.3,-9.2,-9.1,-9,-8.9,-8.8,-8.7,-8.6,-8.5,-8.4,-8.3,-8.2,-8.1,-8,-7.9,-7.8,-7.7,-7.6,-7.5,-7.4,-7.3,-7.2,-7.1,-7,-6.9,-6.8,-6.7,-6.6,-6.5,-6.4,-6.3,-6.2,-6.1,-6,-5.9,-5.8,-5.7,-5.6,-5.5,-5.4,-5.3,-5.2,-5.1,-5,-4.9,-4.8,-4.7,-4.6,-4.5,-4.4,-4.3,-4.2,-4.1,-4,-3.9,-3.8,-3.7,-3.6,-3.5,-3.4,-3.3,-3.2,-3.1,-3,-2.9,-2.8,-2.7,-2.6,-2.5,-2.4,-2.3,-2.2,-2.1,-2,-1.9,-1.8,-1.7,-1.6,-1.5,-1.4,-1.3,-1.2,-1.1,-1,-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4,4.1,4.2,4.3,4.4,4.5,4.6,4.7,4.8,4.9,5,5.1,5.2,5.3,5.4,5.5,5.6,5.7,5.8,5.9,6,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,6.9,7,7.1,7.2,7.3,7.4,7.5,7.6,7.7,7.8,7.9,8,8.1,8.2,8.3,8.4,8.5,8.6,8.7,8.8,8.9,9,9.1,9.2,9.3,9.4,9.5,9.6,9.7,9.8,9.9,10]


let svg, g, graphLayer,
    ind = 0,
    isAdd = true,
    isMult = true




const init = () => {


  ind = 0

 svg = d3.select("#plot").append("svg")
   .attr("width", w)
   .attr("height", h)


  g = svg.append("g")

  svg.append("g")
    .attr("transform", `translate(0, ${h-margin.bottom})`)
    .attr("class", "axis")
    .call(d3.axisBottom(x)
    .ticks(20))

  svg.append("g")
     .attr("id", "y-axis")
     .attr("class", "axis")
     .attr("transform", `translate(${margin.left-5}, 0)`)
     .call(d3.axisLeft(y));


  // text label for the y axis
  svg.append("text")
     .attr("class", "axis lab")
     .attr("x", 22)
     .attr("y", 180)
     .style("text-anchor", "middle")
     .text("f(x)");
}

const draw = () => {
  ind = +document.getElementById('xValue').value
  const dataX = points.slice(0, ind+1),
        data = []
  dataX.forEach((d) => data.push({x: x(d), addY: y(d + 1), multY: y(d * 2)}))
  const currentX = data[ind].x,
        currentAddY = data[ind].addY,
        currentMultY = data[ind].multY

console.log(data);




  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")

  if (isAdd || isMult) {
    graphLayer.append("line")
       .attr("class", "dashed-line vert-line")
       .attr("x1", currentX)
       .attr("x2", currentX)
       .attr("y1", h-19)
       .attr("y2", Math.min(currentAddY * isAdd, currentMultY * isMult))
  }
  if (isAdd) {
    graphLayer.append("path")
        .datum(data)
        .attr("class", "line add")
        .attr("d", d3.line()
          .x(function(d) {return d.x})
          .y(function(d) { return d.addY})
          )
    graphLayer.append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "#df03fc")
        .attr("x1", x(-10.2))
        .attr("x2", currentX)
        .attr("y1", currentAddY)
        .attr("y2", currentAddY)
    graphLayer.append("circle")
      .attr("fill", "#df03fc")
      .attr("cx", currentX)
      .attr("cy", currentAddY)
      .attr("r", 8)
  }

  if (isMult) {
    graphLayer.append("path")
        .datum(data)
        .attr("class", "line mult")
        .attr("d", d3.line()
          .x(function(d) {return d.x})
          .y(function(d) { return d.multY})
          )
    graphLayer.append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "#0ab77e")
        .attr("x1", x(-10.2))
        .attr("x2", currentX)
        .attr("y1", currentMultY)
        .attr("y2", currentMultY)
    graphLayer.append("circle")
      .attr("fill", "#0ab77e")
      .attr("cx", currentX)
      .attr("cy", currentMultY)
      .attr("r", 8)
  }





}

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  document.getElementById('addSwitch').checked = false
  document.getElementById('multSwitch').checked = false
  document.getElementById('xValue').value = "-10"
  init()
  draw()
}

// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('xValue').addEventListener("input", draw)
document.getElementById('xValue').addEventListener("touchmove", draw)

init()
draw()
