
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
    sdOn = false,
    rangeOn = false,
    iqrOn = false,
    devOn = false,
    squareOn = false,
    labsOn = false,
    spreadOn = false


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

    // quantile function from https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php
    const asc = arr => arr.sort((a, b) => a - b)
    const quantile = (arr, q) => {
        const sorted = asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    }
    const q25 = arr => quantile(arr, .25)
    const q75 = arr => quantile(arr, .75)

function click(){
  // Ignore the click event if it was suppressed
  if (d3.event.defaultPrevented) return;

  // Extract the click location\
  var point = d3.mouse(this)
  , p = {x: point[0], y: point[1] };

  // Append a new point
  points.append("circle")
  .attr("cx", p.x)
  .attr("cy", p.y)
  .attr("class", "dot")
  .style("cursor", "pointer")
  .style("fill", "#009d18")
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

  data = getX()
  updateAll()
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


let stats = svg.append("g")
  .attr("id", "stats")

stats.append("rect")
.attr("id", "sdRect")
.attr("x", w/2)
.attr("y", 0)
.attr("width", 0)
.attr("height", h)
// .attr("fill", "url(#sdGradient)")
.attr("fill", "#df03fc44")

stats.append("rect")
.attr("id", "iqrRect")
.attr("x", w/2)
.attr("y", 0)
.attr("width", 0)
.attr("height", h)
// .attr("fill", "url(#sdGradient)")
.attr("fill", "#3a3f5a44")

stats.append("line")
.attr("id", "meanLine")
.attr("x1", w/2)
.attr("x2", w/2)
.attr("y1", 0)
.attr("y2", h)
.attr("stroke-width", 2)
.attr("stroke", "#df03fc")
.style("opacity", 0)

stats.append("line")
.attr("id", "medLine")
.attr("x1", w/2)
.attr("x2", w/2)
.attr("y1", 0)
.attr("y2", h)
.attr("stroke-width", 2)
.attr("stroke", "#00f7ff")
.style("opacity", 0)

let rangeLine = stats.append("g")
.attr("id", "rangeLine")
.attr("class", "hidden")

rangeLine.append("line")
.attr("id", "rangeLineHoriz")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", h/2)
.attr("y2", h/2)
.attr("stroke-width", 1)
.attr("stroke", "#3a3f5a")

rangeLine.append("line")
.attr("id", "rangeLineLeft")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", h/2 - 5)
.attr("y2", h/2 + 5)
.attr("stroke-width", 2)
.attr("stroke", "#3a3f5a")

rangeLine.append("line")
.attr("id", "rangeLineRight")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", h/2 - 5)
.attr("y2", h/2 + 5)
.attr("stroke-width", 2)
.attr("stroke", "#3a3f5a")

rangeLine.append("line")
.attr("id", "rangeLineToMin")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", h/2)
.attr("y2", h/2)
.attr("stroke-width", .5)
.attr("stroke", "#3a3f5a")
.style("stroke-dasharray", ("4, 5"));

rangeLine.append("line")
.attr("id", "rangeLineToMax")
.attr("x1", 0)
.attr("x2", 0)
.attr("y1", h/2)
.attr("y2", h/2)
.attr("stroke-width", .5)
.attr("stroke", "#3a3f5a")
.style("stroke-dasharray", ("4, 5"));

let squares = stats.append("g")
  .attr("id", "squares")

let g = stats.append("g")
  .attr("id", "resid")


let points = svg.append("g")
    .attr("id", "points")

let labels = svg.append("g")
  .attr("id", "labels")





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

  data = getX()
  updateAll()
}

function removeElement(d) {
  d3.event.stopPropagation();
  d3.select(this)
  // .transition()
  // .duration(50)
  // .attr("r", 15)
  // .style("opacity", .5)
  .remove()

  data = getX()

  updateAll()
}

const reset = () => {
  data = []
  d3.selectAll('.dot').remove()
  if (meanOn) meanSwitch()
  if (medOn) medSwitch()
  if (sdOn) sdSwitch()
  if (devOn) devSwitch()
  if (rangeOn) rangeSwitch()
  if (iqrOn) iqrSwitch()
  if (spreadOn) panelSwitch()

  updateAll()

  document.getElementById('med').innerText = "";
  document.getElementById('mean').innerText = "";
  document.getElementById('sd').innerText = "";
  document.getElementById('range').innerText = "";
  document.getElementById('iqr').innerText = "";
  let checkboxes = document.getElementsByTagName('input');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = false;
  }
}

// const btnPress = (on, id) => {
//   if (on) {
//     document.getElementById(id).classList.add("pressed")
//   } else {
//     document.getElementById(id).classList.remove("pressed");
//   }
// }

// const showEquation = (on, id) => {
//   if (on) {
//     document.getElementById(id).classList.remove("hidden")
//   } else {
//     document.getElementById(id).classList.add("hidden");
//   }
// }

const meanSwitch = () => {
  meanOn = !meanOn
  // btnPress(meanOn, "meanBtn")
  // showEquation(meanOn, "meanDiv")
  updateMean()
}
const medSwitch = () => {
  medOn = !medOn
  // btnPress(medOn, "medBtn")
  // showEquation(medOn, "medDiv")
  updateMedian()
}
const sdSwitch = () => {
  sdOn = !sdOn
  // btnPress(sdOn, "sdBtn")
  // showEquation(sdOn, "sdDiv")
  updateSD()
}

const devSwitch = () => {
  devOn = !devOn
  // btnPress(devOn, "devBtn")
  updateDev()
  let checkboxes = document.getElementsByName('devToggle');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = false;
  }
  if (!devOn) {
    labsOn = false
    squareOn = false
  }
  let details = document.getElementById('devCtrls')
  if (details.open) {
  // toggle close
    details.open = false;
  }
  else {
  // toggle open
    details.open = true;
  }
}

const rangeSwitch = () => {
  rangeOn = !rangeOn
  // btnPress(rangeOn, "rangeBtn")
  // showEquation(rangeOn, "rangeDiv")
  updateRange()
}

const iqrSwitch = () => {
  iqrOn = !iqrOn
  // btnPress(iqrOn, "iqrBtn")
  // showEquation(iqrOn, "iqrDiv")
  updateIQR()
}

const labSwitch = () => {
  labsOn = !labsOn
  updateDev()
}

const squareSwitch = () => {
  squareOn = !squareOn
  updateDev()
}

const panelSwitch = () => {
  spreadOn = !spreadOn

  if (spreadOn) {
    document.getElementById("spread").classList.remove("hidden")
    document.getElementById("location").classList.add("hidden")
    if (meanOn) meanSwitch()
    if (medOn) medSwitch()
    let checkboxes = document.getElementsByName('locSwitch');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = false;
    }
  } else {
    document.getElementById("location").classList.remove("hidden")
    document.getElementById("spread").classList.add("hidden")
    if (rangeOn) rangeSwitch()
    if (iqrOn) iqrSwitch()
    if (devOn) devSwitch()
    if (sdOn) sdSwitch()
    let checkboxes = document.getElementsByName('sprSwitch');
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = false;
    }
  }
}

const round = (x, dec) => Math.round(x * (10 ** dec)) / (10 ** dec),
      scaleX = (x) => round((x-w/2)/2.4, 2)
const getX = () => d3.selectAll('.dot').nodes().map(function(d) {return +d.getAttribute("cx")})
const getXY = () => d3.selectAll('.dot').nodes().map(function(d) {return {x: +d.getAttribute("cx"), y: +d.getAttribute("cy")}})


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
      .attr("x1", meanX)
      .attr("x2", meanX)
      .style("opacity", 1)
      document.getElementById('mean').innerHTML = "= " + scaleX(meanX).toString().replace("-", "&minus;");
    }
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
      .attr("x1", medX)
      .attr("x2", medX)
      .style("opacity", 1)
      document.getElementById('med').innerHTML = "= " + scaleX(medX).toString().replace("-", "&minus;");

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
  if (sdOn & data.length > 0) {
    if (!devOn & !meanOn) meanSwitch()
    sdX = sd(data)
    meanX = mean(data)
    svg.select("#sdRect")
    .attr("x", meanX - sdX)
    .attr("width", 2 * sdX)
    .style("opacity", 1)

    document.getElementById('sd').innerText = "= " + round(sdX/2.4, 2)
  } else {

    if (!devOn & meanOn) meanSwitch()
    svg.select("#sdRect")
    .transition()
    .duration('50')
    .style("opacity", 0)
    document.getElementById('sd').innerText = ""
  }
}

const updateDev = () => {
  if (devOn) {
    if (!sdOn & !meanOn) meanSwitch()
    const dataXY = getXY(),
    meanX = mean(data)

    g.selectAll("line")
    .remove()

    g.selectAll("line")
    .data(dataXY)
    .enter()
    .append("line")
    .attr("class", "devLine")
    .attr("x1", meanX)
    .attr("x2", function(d, i) {return d.x})
    .attr("y1", function(d, i) {return d.y})
    .attr("y2", function(d, i) {return d.y})
    .attr("stroke-width", "1px")
    .attr("stroke", "#df03fc")
    .style("stroke-dasharray", ("4, 5"));

    labels.selectAll("text")
    .remove()

    if (labsOn) {
      labels.selectAll("text")
      .data(dataXY)
      .enter()
      .append("text")
      .attr("class", "devLab")
      .attr("x",function(d, i) {return (d.x + meanX) / 2})
      .attr("y", function(d, i) {return d.y - 8})
      .text(function(d, i) {return round((d.x - meanX) / 2.4, 2)})
    }

    squares.selectAll("rect")
    .remove()

    if (squareOn) {
      squares.selectAll("rect")
      .data(dataXY)
      .enter()
      .append("rect")
      .attr("class", "devSq")
      .attr("x", function(d, i) {return Math.min(d.x, meanX)})
      .attr("y", function(d, i) {return d.y})
      .attr("width", function(d, i) {return Math.abs(d.x - meanX)})
      .attr("height", function(d, i) {return Math.abs(d.x - meanX)})
      .attr("fill", "#df03fc20")
      .attr("transform", function(d, i) {return `translate(0, ${d.y < h/2 ? 0 : -Math.abs(d.x - meanX)})`})
    }
  } else {
    if (!sdOn & meanOn) meanSwitch()
    g.selectAll("line")
    .remove()
    labels.selectAll("text")
    .remove()
    squares.selectAll("rect")
    .remove()
  }
}

const updateAll = () => {
  if (spreadOn) {
    updateMean()
    updateRange()
    updateIQR()
    updateDev()
    updateSD()
  } else {
    updateMean()
    updateMedian()
  }
}
const updateRange = () => {
  if (rangeOn & data.length > 0) {
    let minX = Math.min(...data),
    maxX = Math.max(...data),
    rangeX = maxX - minX,
    dataXY = getXY(),
    maxY = dataXY.reduce((prev, curr) => prev.x > curr.x ? prev : curr).y,
    minY = dataXY.reduce((prev, curr) => prev.x < curr.x ? prev : curr).y
    svg.select("#rangeLine")
    .classed('hidden', false);

    if (data.length === 2 & data[0] == data[1]) {
      maxY = dataXY[0].y
      minY = dataXY[1].y
    }
    svg.select("#rangeLineHoriz")
    .attr("x1", minX)
    .attr("x2", maxX)
    svg.select("#rangeLineLeft")
    .attr("x1", minX)
    .attr("x2", minX)
    svg.select("#rangeLineRight")
    .attr("x1", maxX)
    .attr("x2", maxX)
    svg.select("#rangeLineToMin")
    .attr("x1", minX)
    .attr("x2", minX)
    .attr("y1", minY)
    svg.select("#rangeLineToMax")
    .attr("x1", maxX)
    .attr("x2", maxX)
    .attr("y1", maxY)

    svg.select("#rangeLine").classed('hidden', false)

    document.getElementById('range').innerText = "= " + round(rangeX/2.4, 2);
  } else {
    svg.select("#rangeLine").classed('hidden', true)

    document.getElementById('range').innerText = "";
  }}

  const updateIQR = () => {
    if (iqrOn) {
      if (data.length == 0) {
        document.getElementById('iqr').innerText = ""
      } else {
        const q1 = q25(data),
              q3 = q75(data)

        svg.select("#iqrRect")
        .attr("x", q1)
        .attr("width", q3 - q1)
        .style("opacity", 1)

        document.getElementById('iqr').innerText = "= " + round((q3 - q1)/2.4, 2)
     }
  } else {

      svg.select("#iqrRect")
      .transition()
      .duration('50')
      .style("opacity", 0)
      document.getElementById('iqr').innerText = ""
  }
}
