
const margin = {top: 0, right: 10, bottom: 70, left: 10},
w = 500,
h = 200,
width = w - margin.left - margin.right,
height = h - margin.top - margin.bottom,
xScale = d3.scaleLinear()
.domain([-100, 100])
.range([10, width + 10])

// const g = d3.select("#plot")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

let data = [],
    meanOn = false,
    medOn = false,
    sdOn = false

function click(){
  // Ignore the click event if it was suppressed
  if (d3.event.defaultPrevented) return;

  // Extract the click location\
  var point = d3.mouse(this)
  , p = {x: point[0], y: point[1] };

  // Append a new point
  svg.append("circle")
  .attr("cx", p.x)
  .attr("cy", p.y)
  .attr("class", "dot")
  .style("cursor", "pointer")
  .style("fill", "#20fc03")
  .style("stroke", "#3adb25")
  .style("stroke-width", "1")
  .attr("r", "0")
  .call(drag)
  .on("click", removeElement)
  .on('mouseover', function (d) {
            d3.select(this).transition()
                 .duration('200')
                 .attr('r', '10')
               })
  .on('mouseout', function (d) {
            d3.select(this).transition()
                 .duration('200')
                 .attr('r', '8')
               })
   .transition()
   .duration(200)
   .attr("r", "8")

  data = updateData()
  updateMean()
  updateMedian()
  updateSD()
}

// Create the SVG
const svg = d3.select("#plot").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .on("click", click);

const svgDefs = svg.append('defs')

// Gradient fill for sdRect
// svgDefs.append('linearGradient')
//     .attr('id', 'sdGradient')
//     .attr("x1", 0)
//     .attr("x2", 0)
//     .attr("y1", .95)
//     .attr("y2", .05)
//     .selectAll("stop")
//     .data([
//         {offset: "0%", color: "#df03fc", opacity: "0"},
//         {offset: "15%", color: "#df03fc", opacity: ".4"},
//         {offset: "50%", color: "#df03fc", opacity: ".4"},
//         {offset: "85%", color: "#df03fc", opacity: ".4"},
//         {offset: "100%", color: "#df03fc", opacity: "0"}
//       ])
//     .enter().append("stop")
//     .attr("offset", function(d) { return d.offset; })
//     .attr("stop-color", function(d) { return d.color; })
//     .attr("stop-opacity", function(d) { return d.opacity; })


svg.append("g")
  .attr("transform", `translate(0, ${h-20})`)
  .attr("class", "axis")
  .call(d3.axisBottom(xScale)
  .ticks(7))


svg.append("rect")
.attr("id", "sdRect")
.attr("x", w/2)
.attr("y", 0)
.attr("width", 0)
.attr("height", h)
// .attr("fill", "url(#sdGradient)")
.attr("fill", "#df03fc44")

svg.append("line")
.attr("id", "meanLine")
.attr("x1", w/2)
.attr("x2", w/2)
.attr("y1", 0)
.attr("y2", h)
.attr("stroke-width", 2)
.attr("stroke", "#df03fc")
.style("opacity", 0)

svg.append("line")
.attr("id", "medLine")
.attr("x1", w/2)
.attr("x2", w/2)
.attr("y1", 0)
.attr("y2", h)
.attr("stroke-width", 2)
.attr("stroke", "#00f7ff")
.style("opacity", 0)



// Define drag beavior
var drag = d3.drag()
.on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  if (x > w-10) {
    x = w-10
  }
  if (x < 10) {
    x = 10
  }
  if (y > h-20) {
    y = h-20
  }
  if (y < 10) {
    y = 10
  }
  d3.select(this)
  .attr("cx", x)
  .attr("cy", y)

  data = updateData()
  updateMean()
  updateMedian()
  updateSD()
}

function removeElement(d) {
  d3.event.stopPropagation();
  d3.select(this)
  // .transition()
  // .duration(50)
  // .attr("r", 15)
  // .style("opacity", .5)
  .remove()

  data = updateData()
  updateMean()
  updateMedian()
  updateSD()
}

const reset = () => {
  data = []
  d3.selectAll('.dot').remove()
  if (meanOn) meanSwitch()
  if (medOn) medSwitch()
  if (sdOn) sdSwitch()
  updateMean()
  updateMedian()
  updateSD()
  document.getElementById('mean').innerText = "";
  document.getElementById('sd').innerText = "";
}

const btnPress = (on, id) => {
  if (on) {
    document.getElementById(id).classList.add("pressed")
  } else {
    document.getElementById(id).classList.remove("pressed");
  }
}

const showEquation = (on, id) => {
  if (on) {
    document.getElementById(id).classList.remove("hidden")
  } else {
    document.getElementById(id).classList.add("hidden");
  }
}

const meanSwitch = () => {
  meanOn = !meanOn
  btnPress(meanOn, "meanBtn")
  showEquation(meanOn, "meanDiv")
  updateMean()
}
const medSwitch = () => {
  medOn = !medOn
  btnPress(medOn, "medBtn")
  showEquation(medOn, "medDiv")
  updateMedian()
}
const sdSwitch = () => {
  sdOn = !sdOn
  btnPress(sdOn, "sdBtn")
  showEquation(sdOn, "sdDiv")
  updateSD()
}

const round = (x, dec) => Math.round(x * (10 ** dec)) / (10 ** dec),
      scaleX = (x) => round((x-w/2)/2.4, 2)
const updateData = () => d3.selectAll('.dot').nodes().map(function(d) {return +d.getAttribute("cx")})
const updateMean = () => {
  if (meanOn) {
    if (data.length === 0) {
      svg.select("#meanLine")
      .transition()
      .duration('50')
      .style("opacity", 0)
      .transition()
      .attr("x1", w/2)
      .attr("x2", w/2)
    } else {
      meanX = mean(data)
      svg.select("#meanLine")
      .transition()
      .duration('50')
      .attr("x1", meanX)
      .attr("x2", meanX)
      .style("opacity", 1)
    }
    document.getElementById('mean').innerHTML = scaleX(meanX).toString().replace("-", "&minus;");
  } else {
    svg.select("#meanLine")
    .transition()
    .duration('50')
    .style("opacity", 0)
  }
}

const updateMedian = () => {
  if (medOn) {
    if (data.length === 0) {
      svg.select("#medLine")
      .transition()
      .duration('50')
      .style("opacity", 0)
      .transition()
      .attr("x1", w/2)
      .attr("x2", w/2)

        } else {
      medX = median(data)
      svg.select("#medLine")
      .transition()
      .duration('50')
      .attr("x1", medX)
      .attr("x2", medX)
      .style("opacity", 1)
      document.getElementById('med').innerHTML = scaleX(medX).toString().replace("-", "&minus;");

    }
  } else {
    svg.select("#medLine")
    .transition()
    .duration('50')
    .style("opacity", 0)
  }
  // document.getElementById('mean').innerHTML = scaleX(meanX).toString().replace("-", "&minus;");
}


const updateSD = () => {
  if (sdOn) {
    sdX = sd(data)
    meanX = mean(data)
    svg.select("#sdRect")
    .transition()
    .duration('50')
    .attr("x", meanX - sdX)
    .attr("width", 2 * sdX)
    .style("opacity", 1)

    document.getElementById('sd').innerText = round(sdX/2.4, 2);
  } else {
    svg.select("#sdRect")
    .transition()
    .duration('50')
    .style("opacity", 0)
  }
}

const sum = (x) => {
  if (x.length > 1) {
    return x.reduce((a, b) => a + b);
  } else {
    return x[0]
  }
}

const mean = (x) => sum(x) / x.length;
const sd = (x) => {
  if (x.length > 1) {
    let squares = []
    x.forEach((a) => squares.push(a * a));
    let out = Math.sqrt((sum(squares) - (sum(x) ** 2) / x.length) / (x.length - 1));
    return out;
  } else {
    return NaN;
  }
}
const median = (x) => {
  if(x.length ===0) return 0;

  x.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(x.length / 2);

  if (x.length % 2)
    return x[half];

  return (x[half - 1] + x[half]) / 2.0;
}
