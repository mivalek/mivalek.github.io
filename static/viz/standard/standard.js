
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const margin = {top: 20, right: 0, bottom: 40, left: 80},
    w = 500,
    h = 300,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([-10, 10])
    .range([margin.left, width + margin.left - 20]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([0, 0.8])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
    muOut = document.getElementById("muOut"),
    sigmaOut = document.getElementById("sigmaOut")

const round2 = (x) => ~~(x * 100)/100,
      round = (x, d) => ~~(x * (10 ** d))/ (10 ** d)
function dnorm(x, mu, sigma) {
  return Math.exp(-1/2 * (((x - mu) / sigma) ** 2))/(sigma * Math.sqrt(2 * Math.PI))
}
let svg, g, graphLayer, mu, add, sigma, mult, currentValue, currentMu, currentSigma
    points = []

points[0] = -10.2
for (var i = 1; i < 422; i++) {
  points[i] = points[i - 1] + 0.05
}


const init = () => {

  ind = 0
  mu = round2(~~(Math.random() * 200 - 100)/10)
  sigma = round2((~~(Math.random() * 25) + 5) / 10)
  add = 0
  mult = 1
  muLims = {min: -10-mu, max: 10-mu}
  sigmaLims = {min: round2(sigma/5), max: round2(sigma/0.5)}

 svg = d3.select("#plot").append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 " + w + " " + h)
   .classed("svg-content", true)


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

     // text label for the x axis
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
     .attr("y", 10)
     .attr("x", 0 - ((h - margin.bottom + 10) / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Probability density");

   svg.append("clipPath") // define a clip path
    .attr("id", "rect-clip") // give the clipPath an ID
    .append("rect") //Append the shape for clipping
    .attr("x", x(-10.2))
    .attr("y", 0)
    .attr("width", x(11))
    .attr("height", height + margin.top + 1)

  svg.append("path")
    .datum(points.slice(134, 275))
    .attr("class", "dashed")
    .attr("d", d3.line()
      .x(function(d) {return x(d)})
      .y(function(d) { return y(dnorm(d, 0, 1))})
      )
    .attr("clip-path", "url(#rect-clip)")

  for (var d of [-1, 1]) {
    svg.append("line")
      .attr("class", "dashed")
      .attr("x1", x(d))
      .attr("x2", x(d))
      .attr("y1", y(0))
      .attr("y2", y(dnorm(d, 0, 1)))
  }

}

const draw = () => {
  currentSigma = round2(sigma * mult)
  currentMu = round2((mu + add) * mult)
  let data = [],
      // [0.02, 0.04, 0.06 ... 2]
      multiples = Array.apply(0, Array(100)).map(function(_,b) { return (b + 1)/50; })
      sigmaX = [currentMu - currentSigma],
      sigmaData = []

  muOut.innerHTML = currentMu .toFixed(2).replace("-", "&minus;")
  sigmaOut.innerHTML = currentSigma.toFixed(2)

  points.forEach((p) => {data.push({x: x(p), y: y(dnorm(p, currentMu, currentSigma))})})

  for (var i = 0; i < multiples.length; i++) {
    sigmaX[i+1] = round2(sigmaX[0] + currentSigma * multiples[i])
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
      .attr("x1", x(currentMu))
      .attr("x2", x(currentMu))
      .attr("y1", y(0))
      .attr("y2", y(dnorm(0, 0, sigma * mult)))
      .attr("clip-path", "url(#rect-clip)")
  graphLayer.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {return d.x})
          .y(function(d) { return d.y})
          )
        .attr("clip-path", "url(#rect-clip)")

  if (((sigma * mult).toFixed(3) === "1.000") && ((mu + add) * mult).toFixed(3) == "0.000") {
    graphLayer.select(".mu")
      .attr("class", "mu stdNrm")
    graphLayer.select(".sigma")
          .attr("class", "sigma stdNrm")

    // graphLayer.append("text")
    //     .attr("x", x(0))
    //     .attr("y", y(0.5))
    //     // .attr("dy", "1em")
    //     .style("text-anchor", "middle")
    //     .style("fill", "var(--main-col)")
    //     .style("font-weight", "bold")
    //     .style("font-size", "1.5em")
    //     .text("Standardised!");
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
  document.getElementById('addInput').innerHTML = "0"
  document.getElementById('multInput').innerHTML = "1"
  document.getElementById("addInput").classList.remove("disabled")
  init()
  draw()
}


const draggables = document.getElementsByClassName('input')

let isMouseDown = false,
    mouseXcoord,
    dragged




const drag = (e, diff) => {
  document.body.style = "cursor:col-resize"
  let adjustValue,
      insertValue
  switch (dragged) {
    case "addInput":
      adjustValue = -diff / 20 + currentValue
      if (adjustValue > muLims.max) {
        adjustValue = muLims.max
      }
      if (adjustValue < muLims.min) {
        adjustValue = muLims.min
      }
      add = round2(adjustValue) / mult
      break;
    case "multInput":
      if (diff >= 0) {
        adjustValue = Math.min(diff/100 + currentValue,  sigmaLims.max)
      } else {
        adjustValue = Math.max(round((diff / 200), 3) + currentValue, sigmaLims.min)
      }
      mult = 1/adjustValue
      if (currentMu.toFixed(2) != "0.00" && currentSigma.toFixed(2) != sigma.toFixed(2)) {
        document.getElementById("addInput").classList.add("disabled")
      } else {
        document.getElementById("addInput").classList.remove("disabled")
      }
      break;
  }

  insertValue = adjustValue.toFixed(2)
  insertValue = insertValue.replace("-", "&minus;")
  document.getElementById(dragged).innerHTML=insertValue
  draw()

}

const dragEnd = (e) => {
  if (isMouseDown) {
    document.getElementById("plot").classList.remove("error")
    document.getElementById("error").classList.remove("show")
    // this.getElementById(dragged).releasePointerCapture(event.pointerId)
    isMouseDown = false
    dragged = null
    document.body.style = "cursor:default"

    if (((sigma * mult).toFixed(3) === "1.000") && ((mu + add) * mult).toFixed(3) == "0.000") {
      graphLayer.append("text")
          .attr("x", x(0))
          .attr("y", y(0.5))
          // .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("fill", "var(--main-col)")
          .style("font-weight", "bold")
          .style("font-size", "1.5em")
          .text("Standardised!");
    }
  }
}

document.addEventListener("mousemove", function(event) {
  if (isMouseDown) {
  const diff = event.clientX - mouseXcoord
  drag(event, diff)
  }
})
document.addEventListener("touchmove", function(event) {
  if (isMouseDown) {
  const diff = event.touches[0].clientX - mouseXcoord
  drag(event, diff)
  }
})

document.addEventListener("mouseup", function(event) {dragEnd(event)})
document.addEventListener("touchend", function(event) {dragEnd(event)})

for (var i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("mousedown", function(event) {
    currentValue = +(this.innerHTML.replace("−", "-"))
    mouseXcoord = event.clientX
    isMouseDown = true
    dragged = this.id
    if (dragged == "addInput" && mult != 1) {
      dragged = "error"
      document.getElementById("plot").classList.add("error")
      document.getElementById("error").classList.add("show")
    }
  })
  draggables[i].addEventListener("touchstart", function(event) {
    currentValue = +(this.innerHTML.replace("−", "-"))
    mouseXcoord = event.touches[0].clientX
    isMouseDown = true
    dragged = this.id
    if (dragged == "addInput" && mult != 1) {
      dragged = "error"
      document.getElementById("plot").classList.add("error")
      document.getElementById("error").classList.add("show")
    }
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
  document.getElementById("addInput").classList.remove("disabled")
  draw()
}



init()
draw()
