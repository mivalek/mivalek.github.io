
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

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
    .domain([-5, 15])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([200, 800])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
      meanX = 5.6,
      medX = 8

const data = [{"x":-5,"ySq":781,"yAbs":53},{"x":-4.9,"ySq":770.45,"yAbs":52.5},{"x":-4.8,"ySq":760,"yAbs":52},{"x":-4.7,"ySq":749.65,"yAbs":51.5},{"x":-4.6,"ySq":739.4,"yAbs":51},{"x":-4.5,"ySq":729.25,"yAbs":50.5},{"x":-4.4,"ySq":719.2,"yAbs":50},{"x":-4.3,"ySq":709.25,"yAbs":49.5},{"x":-4.2,"ySq":699.4,"yAbs":49},{"x":-4.1,"ySq":689.65,"yAbs":48.5},{"x":-4,"ySq":680,"yAbs":48},{"x":-3.9,"ySq":670.45,"yAbs":47.7},{"x":-3.8,"ySq":661,"yAbs":47.4},{"x":-3.7,"ySq":651.65,"yAbs":47.1},{"x":-3.6,"ySq":642.4,"yAbs":46.8},{"x":-3.5,"ySq":633.25,"yAbs":46.5},{"x":-3.4,"ySq":624.2,"yAbs":46.2},{"x":-3.3,"ySq":615.25,"yAbs":45.9},{"x":-3.2,"ySq":606.4,"yAbs":45.6},{"x":-3.1,"ySq":597.65,"yAbs":45.3},{"x":-3,"ySq":589,"yAbs":45},{"x":-2.9,"ySq":580.45,"yAbs":44.7},{"x":-2.8,"ySq":572,"yAbs":44.4},{"x":-2.7,"ySq":563.65,"yAbs":44.1},{"x":-2.6,"ySq":555.4,"yAbs":43.8},{"x":-2.5,"ySq":547.25,"yAbs":43.5},{"x":-2.4,"ySq":539.2,"yAbs":43.2},{"x":-2.3,"ySq":531.25,"yAbs":42.9},{"x":-2.2,"ySq":523.4,"yAbs":42.6},{"x":-2.1,"ySq":515.65,"yAbs":42.3},{"x":-2,"ySq":508,"yAbs":42},{"x":-1.9,"ySq":500.45,"yAbs":41.7},{"x":-1.8,"ySq":493,"yAbs":41.4},{"x":-1.7,"ySq":485.65,"yAbs":41.1},{"x":-1.6,"ySq":478.4,"yAbs":40.8},{"x":-1.5,"ySq":471.25,"yAbs":40.5},{"x":-1.4,"ySq":464.2,"yAbs":40.2},{"x":-1.3,"ySq":457.25,"yAbs":39.9},{"x":-1.2,"ySq":450.4,"yAbs":39.6},{"x":-1.1,"ySq":443.65,"yAbs":39.3},{"x":-1,"ySq":437,"yAbs":39},{"x":-0.9,"ySq":430.45,"yAbs":38.7},{"x":-0.8,"ySq":424,"yAbs":38.4},{"x":-0.7,"ySq":417.65,"yAbs":38.1},{"x":-0.6,"ySq":411.4,"yAbs":37.8},{"x":-0.5,"ySq":405.25,"yAbs":37.5},{"x":-0.4,"ySq":399.2,"yAbs":37.2},{"x":-0.3,"ySq":393.25,"yAbs":36.9},{"x":-0.2,"ySq":387.4,"yAbs":36.6},{"x":-0.1,"ySq":381.65,"yAbs":36.3},{"x":0,"ySq":376,"yAbs":36},{"x":0.1,"ySq":370.45,"yAbs":35.9},{"x":0.2,"ySq":365,"yAbs":35.8},{"x":0.3,"ySq":359.65,"yAbs":35.7},{"x":0.4,"ySq":354.4,"yAbs":35.6},{"x":0.5,"ySq":349.25,"yAbs":35.5},{"x":0.6,"ySq":344.2,"yAbs":35.4},{"x":0.7,"ySq":339.25,"yAbs":35.3},{"x":0.8,"ySq":334.4,"yAbs":35.2},{"x":0.9,"ySq":329.65,"yAbs":35.1},{"x":1,"ySq":325,"yAbs":35},{"x":1.1,"ySq":320.45,"yAbs":34.9},{"x":1.2,"ySq":316,"yAbs":34.8},{"x":1.3,"ySq":311.65,"yAbs":34.7},{"x":1.4,"ySq":307.4,"yAbs":34.6},{"x":1.5,"ySq":303.25,"yAbs":34.5},{"x":1.6,"ySq":299.2,"yAbs":34.4},{"x":1.7,"ySq":295.25,"yAbs":34.3},{"x":1.8,"ySq":291.4,"yAbs":34.2},{"x":1.9,"ySq":287.65,"yAbs":34.1},{"x":2,"ySq":284,"yAbs":34},{"x":2.1,"ySq":280.45,"yAbs":33.9},{"x":2.2,"ySq":277,"yAbs":33.8},{"x":2.3,"ySq":273.65,"yAbs":33.7},{"x":2.4,"ySq":270.4,"yAbs":33.6},{"x":2.5,"ySq":267.25,"yAbs":33.5},{"x":2.6,"ySq":264.2,"yAbs":33.4},{"x":2.7,"ySq":261.25,"yAbs":33.3},{"x":2.8,"ySq":258.4,"yAbs":33.2},{"x":2.9,"ySq":255.65,"yAbs":33.1},{"x":3,"ySq":253,"yAbs":33},{"x":3.1,"ySq":250.45,"yAbs":32.9},{"x":3.2,"ySq":248,"yAbs":32.8},{"x":3.3,"ySq":245.65,"yAbs":32.7},{"x":3.4,"ySq":243.4,"yAbs":32.6},{"x":3.5,"ySq":241.25,"yAbs":32.5},{"x":3.6,"ySq":239.2,"yAbs":32.4},{"x":3.7,"ySq":237.25,"yAbs":32.3},{"x":3.8,"ySq":235.4,"yAbs":32.2},{"x":3.9,"ySq":233.65,"yAbs":32.1},{"x":4,"ySq":232,"yAbs":32},{"x":4.1,"ySq":230.45,"yAbs":31.9},{"x":4.2,"ySq":229,"yAbs":31.8},{"x":4.3,"ySq":227.65,"yAbs":31.7},{"x":4.4,"ySq":226.4,"yAbs":31.6},{"x":4.5,"ySq":225.25,"yAbs":31.5},{"x":4.6,"ySq":224.2,"yAbs":31.4},{"x":4.7,"ySq":223.25,"yAbs":31.3},{"x":4.8,"ySq":222.4,"yAbs":31.2},{"x":4.9,"ySq":221.65,"yAbs":31.1},{"x":5,"ySq":221,"yAbs":31},{"x":5.1,"ySq":220.45,"yAbs":30.9},{"x":5.2,"ySq":220,"yAbs":30.8},{"x":5.3,"ySq":219.65,"yAbs":30.7},{"x":5.4,"ySq":219.4,"yAbs":30.6},{"x":5.5,"ySq":219.25,"yAbs":30.5},{"x":5.6,"ySq":219.2,"yAbs":30.4},{"x":5.7,"ySq":219.25,"yAbs":30.3},{"x":5.8,"ySq":219.4,"yAbs":30.2},{"x":5.9,"ySq":219.65,"yAbs":30.1},{"x":6,"ySq":220,"yAbs":30},{"x":6.1,"ySq":220.45,"yAbs":29.9},{"x":6.2,"ySq":221,"yAbs":29.8},{"x":6.3,"ySq":221.65,"yAbs":29.7},{"x":6.4,"ySq":222.4,"yAbs":29.6},{"x":6.5,"ySq":223.25,"yAbs":29.5},{"x":6.6,"ySq":224.2,"yAbs":29.4},{"x":6.7,"ySq":225.25,"yAbs":29.3},{"x":6.8,"ySq":226.4,"yAbs":29.2},{"x":6.9,"ySq":227.65,"yAbs":29.1},{"x":7,"ySq":229,"yAbs":29},{"x":7.1,"ySq":230.45,"yAbs":28.9},{"x":7.2,"ySq":232,"yAbs":28.8},{"x":7.3,"ySq":233.65,"yAbs":28.7},{"x":7.4,"ySq":235.4,"yAbs":28.6},{"x":7.5,"ySq":237.25,"yAbs":28.5},{"x":7.6,"ySq":239.2,"yAbs":28.4},{"x":7.7,"ySq":241.25,"yAbs":28.3},{"x":7.8,"ySq":243.4,"yAbs":28.2},{"x":7.9,"ySq":245.65,"yAbs":28.1},{"x":8,"ySq":248,"yAbs":28},{"x":8.1,"ySq":250.45,"yAbs":28.1},{"x":8.2,"ySq":253,"yAbs":28.2},{"x":8.3,"ySq":255.65,"yAbs":28.3},{"x":8.4,"ySq":258.4,"yAbs":28.4},{"x":8.5,"ySq":261.25,"yAbs":28.5},{"x":8.6,"ySq":264.2,"yAbs":28.6},{"x":8.7,"ySq":267.25,"yAbs":28.7},{"x":8.8,"ySq":270.4,"yAbs":28.8},{"x":8.9,"ySq":273.65,"yAbs":28.9},{"x":9,"ySq":277,"yAbs":29},{"x":9.1,"ySq":280.45,"yAbs":29.1},{"x":9.2,"ySq":284,"yAbs":29.2},{"x":9.3,"ySq":287.65,"yAbs":29.3},{"x":9.4,"ySq":291.4,"yAbs":29.4},{"x":9.5,"ySq":295.25,"yAbs":29.5},{"x":9.6,"ySq":299.2,"yAbs":29.6},{"x":9.7,"ySq":303.25,"yAbs":29.7},{"x":9.8,"ySq":307.4,"yAbs":29.8},{"x":9.9,"ySq":311.65,"yAbs":29.9},{"x":10,"ySq":316,"yAbs":30},{"x":10.1,"ySq":320.45,"yAbs":30.3},{"x":10.2,"ySq":325,"yAbs":30.6},{"x":10.3,"ySq":329.65,"yAbs":30.9},{"x":10.4,"ySq":334.4,"yAbs":31.2},{"x":10.5,"ySq":339.25,"yAbs":31.5},{"x":10.6,"ySq":344.2,"yAbs":31.8},{"x":10.7,"ySq":349.25,"yAbs":32.1},{"x":10.8,"ySq":354.4,"yAbs":32.4},{"x":10.9,"ySq":359.65,"yAbs":32.7},{"x":11,"ySq":365,"yAbs":33},{"x":11.1,"ySq":370.45,"yAbs":33.3},{"x":11.2,"ySq":376,"yAbs":33.6},{"x":11.3,"ySq":381.65,"yAbs":33.9},{"x":11.4,"ySq":387.4,"yAbs":34.2},{"x":11.5,"ySq":393.25,"yAbs":34.5},{"x":11.6,"ySq":399.2,"yAbs":34.8},{"x":11.7,"ySq":405.25,"yAbs":35.1},{"x":11.8,"ySq":411.4,"yAbs":35.4},{"x":11.9,"ySq":417.65,"yAbs":35.7},{"x":12,"ySq":424,"yAbs":36},{"x":12.1,"ySq":430.45,"yAbs":36.3},{"x":12.2,"ySq":437,"yAbs":36.6},{"x":12.3,"ySq":443.65,"yAbs":36.9},{"x":12.4,"ySq":450.4,"yAbs":37.2},{"x":12.5,"ySq":457.25,"yAbs":37.5},{"x":12.6,"ySq":464.2,"yAbs":37.8},{"x":12.7,"ySq":471.25,"yAbs":38.1},{"x":12.8,"ySq":478.4,"yAbs":38.4},{"x":12.9,"ySq":485.65,"yAbs":38.7},{"x":13,"ySq":493,"yAbs":39},{"x":13.1,"ySq":500.45,"yAbs":39.3},{"x":13.2,"ySq":508,"yAbs":39.6},{"x":13.3,"ySq":515.65,"yAbs":39.9},{"x":13.4,"ySq":523.4,"yAbs":40.2},{"x":13.5,"ySq":531.25,"yAbs":40.5},{"x":13.6,"ySq":539.2,"yAbs":40.8},{"x":13.7,"ySq":547.25,"yAbs":41.1},{"x":13.8,"ySq":555.4,"yAbs":41.4},{"x":13.9,"ySq":563.65,"yAbs":41.7},{"x":14,"ySq":572,"yAbs":42},{"x":14.1,"ySq":580.45,"yAbs":42.5},{"x":14.2,"ySq":589,"yAbs":43},{"x":14.3,"ySq":597.65,"yAbs":43.5},{"x":14.4,"ySq":606.4,"yAbs":44},{"x":14.5,"ySq":615.25,"yAbs":44.5},{"x":14.6,"ySq":624.2,"yAbs":45},{"x":14.7,"ySq":633.25,"yAbs":45.5},{"x":14.8,"ySq":642.4,"yAbs":46},{"x":14.9,"ySq":651.65,"yAbs":46.5},{"x":15,"ySq":661,"yAbs":47}]

const sum = (x) => {
        if (x.length > 1) {
          return x.reduce((a, b) => a + b);
        } else {
          return x[0]
        }
      }
      round = (x) => ~~(x * 100) / 100,
      dev = (d, x) => {
          let devs = []
          d.forEach((d) => devs.push(d - x))
          return devs;
      }

let svg, g, graphLayer, absDevLayer,
    ind = 0,
    critPoint = 0
    isSqDev = true




const init = () => {


  ind = 0,
  critPoint = 0

 svg = d3.select("#plot").append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 " + w + " " + h)
   .classed("svg-content", true)


  g = svg.append("g")
 g.append("line")
    .attr("id", "meanLine")
    .attr("x1", x(meanX))
    .attr("x2", x(meanX))
    .attr("y1", 10)
    .attr("y2", height + 20)
    .attr("stroke-width", 2.5)
    .attr("stroke", "#52006f")

g.append("text")
   .attr("y", 10)
   .attr("x", x(meanX - .5))
   .attr("dy", "1em")
   .style("text-anchor", "end")
   .attr("stroke", "none")
   .attr("fill", "#52006f")
   .text("Mean");

g.append("line")
    .attr("id", "medLine")
    .attr("x1", x(medX))
    .attr("x2", x(medX))
    .attr("y1", 10)
    .attr("y2", height + 20)
    .attr("stroke-width", 2.5)
    .attr("stroke", "#00979f")

g.append("text")
   .attr("y", 10)
   .attr("x", x(medX + .5))
   .attr("dy", "1em")
   .style("text-anchor", "start")
   .attr("stroke", "none")
   .attr("fill", "#00979f")
   .text("Median");

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
     .attr("transform", "rotate(-90)")
     .attr("y", 0)
     .attr("x", 0 - ((h - margin.bottom + 10) / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text(isSqDev ? "Sum of squares" : "Sum of abs deviations");
}

const draw = () => {
  ind = +document.getElementById('xValue').value
  const currentData = data.slice(0, ind+1),
        currentX = x(data[ind].x)



  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")

  let currentY, critPoint
  if (isSqDev) {
    currentY = y(data[ind].ySq)
    critPoint = 106 // index of the mean
    if (ind > critPoint) {mirrorX = x(data[2 * critPoint - ind].x)}
    // y.domain([200, 800]);
    // svg.selectAll("#y-axis")
    //   .transition().duration(500)
    //   .call(d3.axisLeft(y))
    graphLayer.append("path")
        .datum(currentData)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) { return x(d.x) })
          .y(function(d) { return y(d.ySq) })
          )
  } else {
    critPoint = 130 // index of median
    currentY = data[ind].yAbs

    if (ind > critPoint) {mirrorX = x(data[data.findIndex((el) => el.yAbs < currentY)].x)}
    currentY = y(currentY)

    graphLayer.append("path")
        .datum(currentData)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) { return x(d.x) })
          .y(function(d) { return y(d.yAbs) })
          )
  }



  graphLayer.append("line")
      .attr("class", "dashed-line")
      .attr("x1", currentX)
      .attr("x2", currentX)
      .attr("y1", h-19)
      .attr("y2", currentY)

  graphLayer.append("line")
      .attr("class", "dashed-line")
      .attr("x1", x(-5.2))
      .attr("x2", currentX)
      .attr("y1", currentY)
      .attr("y2", currentY)

  if (ind > critPoint) {
   graphLayer.append("line")
       .attr("class", "dashed-line")
       .attr("x1", mirrorX)
       .attr("x2", mirrorX)
       .attr("y1", h-19)
       .attr("y2", currentY)

   graphLayer.append("circle")
     .attr("class", "ghost")
     .attr("cx", mirrorX)
     .attr("cy", currentY)
     .attr("r", 8)
  }

  graphLayer.append("circle")
    .attr("fill", isSqDev ? "#52006f": "#00979f")
    .attr("cx", currentX)
    .attr("cy", currentY)
    .attr("r", 8)
}

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  document.getElementById('switch').checked = false
  document.getElementById('xValue').value = "0"
  init()
  draw()
}

const devSwitch = () => {

  d3.selectAll("#plot > svg").remove()
  document.getElementById('xValue').value = "0"
  isSqDev = !isSqDev
  init()
  if (isSqDev) {
    y.domain([200, 800]);
    svg.selectAll("#y-axis")
      .transition().duration(500)
      .call(d3.axisLeft(y))
  } else {
    y.domain([25, 54]);
    svg.selectAll("#y-axis")
      .transition().duration(500)
      .call(d3.axisLeft(y))
  }
  draw()
}

// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('xValue').addEventListener("input", draw)
document.getElementById('xValue').addEventListener("touchmove", draw)

init()
// draw()
