
const margin = {top: 20, right: 10, bottom: 40, left: 70},
    w = 500,
    h = 350,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([-10, 10])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([0, 0.8])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
    muOut = document.getElementById("muOut"),
    sigmaOut = document.getElementById("sigmaOut")

const round2 = (x) => ~~(x * 100)/100
function dnorm(x, mu, sigma) {
  return Math.exp(-1/2 * (((x - mu) / sigma) ** 2))/(sigma * Math.sqrt(2 * Math.PI))
}
let svg, g, graphLayer, mu, add, sigma, mult, currentValue
    points = []

points[0] = -10.2
for (var i = 1; i < 416; i++) {
  points[i] = points[i - 1] + 0.05
}


const init = () => {

  ind = 0
  mu = 4
  sigma = 2.5
  add = 0
  mult = 1

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
        .attr("class", "axis ital lab")
        .attr("x", x(0))
        .attr("y", y(-0.1))
        // .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("x");

  // text label for the y axis
  svg.append("text")
     .attr("class", "axis lab")
     .attr("transform", "rotate(-90)")
     .attr("y", 0)
     .attr("x", 0 - ((h - margin.bottom + 10) / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Probability density");

   svg.append("clipPath") // define a clip path
    .attr("id", "rect-clip") // give the clipPath an ID
    .append("rect") //Append the shape for clipping
    .attr("x", x(-10.2))
    .attr("y", 0)
    .attr("width", x(10.2))
    .attr("height", height + margin.top + 1)

  svg.append("path")
    .datum(points)
    .attr("class", "dashed")
    .attr("d", d3.line()
      .x(function(d) {return x(d)})
      .y(function(d) { return y(dnorm(d, 0, 1))})
      )
    .attr("clip-path", "url(#rect-clip)")
}

const draw = () => {
  let data = [],
      currentSigma = round2(sigma * mult),
      currentMu = round2(mu + add)
    sigmaX = [currentMu - currentSigma],
    sigmaData = []

  muOut.innerHTML = currentMu.toFixed(2).replace("-", "&minus;")
  sigmaOut.innerHTML = currentSigma.toFixed(2)

  points.forEach((p) => {data.push({x: x(p), y: y(dnorm(p, currentMu, currentSigma))})})

  for (var i = 1; i < 100; i++) {
    sigmaX[i] = sigmaX[i - 1] + currentSigma/50
  }
  sigmaX.forEach((p) => {sigmaData.push({x: x(p), y: y(dnorm(p, currentMu, currentSigma))})})

  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")

 // graphLayer

  graphLayer.append("path")
        .datum(sigmaData)
        .attr("class", "sigma")
        .attr("d", d3.area()
          .x(function(d) {return d.x})
          .y0(y(0))
          .y1(function(d) { return d.y})
          )
        .attr("clip-path", "url(#rect-clip)")

  graphLayer.append("line")
      .attr("class", "mu")
      .attr("x1", x(mu + add))
      .attr("x2", x(mu + add))
      .attr("y1", y(0))
      .attr("y2", y(dnorm(0, 0, sigma * mult)))
  graphLayer.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {return d.x})
          .y(function(d) { return d.y})
          )
        .attr("clip-path", "url(#rect-clip)")

  if ((currentSigma == 1) && !currentMu) {
    graphLayer.select(".mu")
      .attr("class", "mu stdNrm")
    graphLayer.select(".sigma")
          .attr("class", "sigma stdNrm")
  }
}

// double tap detection from https://stackoverflow.com/questions/28940676/how-to-make-ondblclick-event-works-on-phone/28942041
// let doubletapDeltaTime_ = 100,
//     doubletap1Function_ = null,
//     doubletap2Function_ = null,
//     doubletapTimer = null,
//     doubletapTimeout_ = 100
//
// function tap(singleTapFunc, doubleTapFunc) {
//     if (doubletapTimer==null) {
//     // First tap, we wait X ms to the second tap
//         doubletapTimer_ = setTimeout(doubletapTimeout_, doubletapDeltaTime_);
//         doubletap1Function_ = singleTapFunc;
//         doubletap2Function_ = doubleTapFunc;
//     } else {
//     // Second tap
//         clearTimeout(doubletapTimer);
//         doubletapTimer_ = null;
//         doubletap2Function_();
//     }
// }
//
// function doubletapTimeout() {
// // Wait for second tap timeout
//     doubletap1Function_();
//     doubleTapTimer_ = null;
// }

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  init()
  draw()
}

const toggleSwitch = (id) => {
  document.getElementById(id).classList.toggle("hidden")
}


const draggables = document.getElementsByClassName('input')

let isMouseDown = false,
    mouseXcoord,
    dragged




const drag = (e) => {
  if (isMouseDown) {
    document.body.style = "cursor:col-resize"
    const diff = e.clientX - mouseXcoord
    let adjustValue,
        insertValue
    switch (dragged) {
      case "addInput":
        adjustValue = diff / 20 + currentValue
        if (adjustValue > 10) {
          adjustValue = 10
        }
        if (adjustValue < -10) {
          adjustValue = -10
        }
        add = round2(adjustValue)
        break;
      case "multInput":
        if (diff >= 0) {
          adjustValue = Math.min(diff/50 + currentValue, 3)
        } else {
          adjustValue = Math.max(round2((diff / 100)) + currentValue, 0.1)
        }
        console.log({d: diff, adj: adjustValue});
        mult = round2(adjustValue)
        break;
    }

    insertValue = adjustValue.toFixed(2)
    insertValue = insertValue.replace("-", "&minus;")
    document.getElementById(dragged).innerHTML=insertValue
    draw()
  }
}

const dragEnd = (e) => {
  if (isMouseDown) {
    // this.getElementById(dragged).releasePointerCapture(event.pointerId)
    isMouseDown = false
    dragged = null
    document.body.style = "cursor:default"
  }
}

document.addEventListener("mousemove", function(event) {drag(event)})
document.addEventListener("touchmove", function(event) {drag(event)})

document.addEventListener("mouseup", function(event) {dragEnd(event)})
document.addEventListener("touchend", function(event) {dragEnd(event)})

for (var i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("mousedown", function(event) {
    currentValue = +(this.innerHTML.replace("−", "-"))
    mouseXcoord = event.clientX
    isMouseDown = true
    dragged = this.id
  })
  draggables[i].addEventListener("touchstart", function(event) {
    currentValue = +(this.innerHTML.replace("−", "-"))
    mouseXcoord = event.touches[0].clientX
    isMouseDown = true
    dragged = this.id
  })
}

const resetMu = () => {
  add = 0
  document.getElementById('addInput').innerHTML = "0"
  draw()
}

const resetSigma = () => {
  mult = 1
  document.getElementById('multInput').innerHTML = "1"
  draw()
}



init()
draw()
