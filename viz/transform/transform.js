
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const // prototypes
    fp = Function.prototype,
    ap = Array.prototype,
    // callable forEach
    forEach = fp.call.bind(ap.forEach),
    min = 0,
    max = 20,
    yScalingFactor = 1,
    funs = ["add", "mult", "exp"],
    margin = {top: 20, right: 10, bottom: 20, left: 70},
    w = 500,
    h = 350,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([min, max])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([min * yScalingFactor, max * yScalingFactor])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
    clipBeginX = x(min)-4

let points = [min]

for (var i = 1; i < 201; i++) {
  points[i] = Math.ceil((points[i-1] + (max-min)/201)*10)/10
}

let svg, g, graphLayer,
    ind = 0,
    isAdd = false,
    isMult = false,
    isExp = false,
    dataX,
    clipPathsForPoints, add, mult, exp




const init = () => {
  add = 0
  mult = 1
  exp = 1
  ind = 0
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


  // text label for the y axis
  svg.append("text")
     .attr("class", "axis lab")
     .attr("x", 22)
     .attr("y", 180)
     .style("text-anchor", "middle")
     .text("f(x)");
}

const drawLines = () => {
  svg.select("#lines").remove()
  data = []
  clipPathsForPoints = []
  points.forEach((d) => data.push({x: x(d), addY: d + add, multY: d * mult, expY: exp <= 0 && d == 0 ? 0.005**exp : d ** exp}))
  lineLayer = svg.append("g")
     .attr("id", "lines")


  for (var i = 0; i < funs.length; i++) {
    currentFun = funs[i]

    // draw all lines
    lineLayer.append("path")
        .datum(data)
        .attr("class", `line ${currentFun}`)
        .attr("d", d3.line()
          .x(function(d) {return d.x})
          .y(function(d) { return y(d[`${currentFun}Y`])})
          )
          .attr("clip-path", `url(#${currentFun}-clip)`) // clipping mask

    clipPathsForPoints[i] = lineLayer.append("clipPath") // define a clip path
     .attr("id", `${currentFun}-clip`) // give the clipPath an ID
     .append("rect") //Append the shape for clipping
     .attr("x", clipBeginX)
     .attr("y", 0)
     .attr("width", 0)
     .attr("height", height + 20)

    // minor points along the lines for each integer value of x
    for (var j = min; j < max; j++) {
      lineLayer.append("circle")
        .attr("class", funs[i])
        .attr("cx", x(j))
        .attr("cy", y(data.find(obj => {return obj.x === x(j)})[`${currentFun}Y`]))
        .attr("r", 3)
        .attr("clip-path", `url(#${currentFun}-clip)`)
    }

    svg.append("clipPath") // define a clip path
     .attr("id", "main-clip") // give the clipPath an ID
     .append("rect") //Append the shape for clipping
     .attr("x", 0)
     .attr("y", 0)
     .attr("width", w)
     .attr("height", y(min*yScalingFactor) +9)
   svg.append("clipPath") // define a clip path
    .attr("id", "dash-clip") // give the clipPath an ID
    .append("rect") //Append the shape for clipping
    .attr("x", 66)
    .attr("y", 17)
    .attr("width", width)
    .attr("height", y(min*yScalingFactor) - 16)

  }
}


const draw = () => {
  ind = +document.getElementById('xValue').value

  const currentX = data[ind].x,
        currentAddY = y(data[ind].addY),
        currentMultY = y(data[ind].multY),
        currentExpY = y(data[ind].expY)



  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")




  if (isAdd || isMult || isExp) {
    graphLayer.append("line")
       .attr("class", "dashed-line vert-line")
       .attr("x1", currentX)
       .attr("x2", currentX)
       .attr("y1", h-19)
       .attr("y2", y(Math.max(data[ind].addY * isAdd, data[ind].multY * isMult, data[ind].expY * isExp)))
  }
  if (isAdd) {
    graphLayer.append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "#52006f")
        .attr("x1", x(min - 1))
        .attr("x2", currentX)
        .attr("y1", currentAddY)
        .attr("y2", currentAddY)
        .attr("clip-path", "url(#dash-clip)")

    let addCirc = graphLayer.append("circle")
      .attr("fill", "#52006f")
      .attr("cx", currentX)
      .attr("cy", currentAddY)
      .attr("r", 8)
      .attr("clip-path", "url(#main-clip)")

    clipPathsForPoints[0]
      .attr("width", currentX - clipBeginX)

    if ((isMult && currentAddY == currentMultY)|| (isExp && currentAddY == currentExpY)) {
      addCirc.attr("transform", "translate(2,-2)")
    }
  }

  if (isMult) {
    graphLayer.append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "#00979f")
        .attr("x1", x(min - 1))
        .attr("x2", currentX)
        .attr("y1", currentMultY)
        .attr("y2", currentMultY)
        .attr("clip-path", "url(#dash-clip)")
    let multCirc = graphLayer.append("circle")
      .attr("fill", "#00979f")
      .attr("cx", currentX)
      .attr("cy", currentMultY)
      .attr("r", 8)
      .attr("clip-path", "url(#main-clip)")

    clipPathsForPoints[1]
      .attr("width", currentX - clipBeginX)

   if ((isAdd && currentAddY == currentMultY)|| (isMult && currentMultY == currentExpY)) {
      multCirc.attr("transform", "translate(-1,-1)")
    }
  }

  if (isExp) {
    graphLayer.append("line")
        .attr("class", "dashed-line")
        .attr("stroke", "#f4c300")
        .attr("x1", x(min - 1))
        .attr("x2", currentX)
        .attr("y1", currentExpY)
        .attr("y2", currentExpY)
        .attr("clip-path", "url(#dash-clip)")
    let expCirc = graphLayer.append("circle")
      .attr("fill", "#f4c300")
      .attr("cx", currentX)
      .attr("cy", currentExpY)
      .attr("r", 8)
      .attr("clip-path", "url(#main-clip)")

    clipPathsForPoints[2]
      .attr("width", currentX - clipBeginX)

   if ((isMult && currentExpY == currentMultY)|| (isAdd && currentAddY == currentExpY)) {
      expCirc.attr("transform", "translate(2, 0)")
    }
  }
}

const toggleSwitch = (id) => {
  document.getElementById(id).classList.toggle("hidden")
  switch(id) {
  case "addInput":
    isAdd = !isAdd
    clipPathsForPoints[0]
      .attr("width", 0)
    break;
    case "multInput":
    isMult = !isMult
    clipPathsForPoints[1]
      .attr("width", 0)
    break;
    case "expInput":
    isExp = !isExp
    clipPathsForPoints[2]
      .attr("width", 0)
}
draw()
}

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  document.getElementById('addSwitch').checked = false
  document.getElementById('multSwitch').checked = false
  document.getElementById('expSwitch').checked = false
  document.getElementById('xValue').value = "-10"
  init()
  drawLines()
  draw()
}

// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('xValue').addEventListener("input", draw)
document.getElementById('xValue').addEventListener("touchmove", draw)
const draggables = document.getElementsByClassName('numInput')

let isMouseDown = false,
    mouseXcoord,
    dragged

document.addEventListener("mousemove", function(event) {
  if (isMouseDown) {
    this.body.style = "cursor:col-resize"
    const diff = event.clientX - mouseXcoord
    let adjustValue,
        insertValue
    switch (dragged) {
      case "addInput":
        adjustValue = diff / 20
        if (adjustValue > 10) {
          adjustValue = 10
        }
        if (adjustValue < -10) {
          adjustValue = -10
        }
        add = adjustValue
        break;
      case "multInput":
        if (diff >= 0) {
          adjustValue = Math.min(diff/20 + 1, 10)
        } else {
          adjustValue = Math.max(~~((1 + (diff / 100)) * 100) / 100, 0)
        }
        mult = adjustValue
        break;
      case "expInput":
        adjustValue = diff / 50 + 1
        if (adjustValue > 3) {
          adjustValue = 3
        }
        if (adjustValue < -3) {
          adjustValue = -3
        }
        exp = adjustValue
        break;
    }

    adjustValue = ~~(adjustValue*10)/10
    insertValue = adjustValue.toString()
    insertValue = insertValue.replace("-", "&minus;")
    if (dragged == "addInput" && adjustValue < 0) {insertValue = "(" + insertValue + ")"}
    this.getElementById(dragged).getElementsByClassName("input")[0].innerHTML=insertValue
    drawLines()
    draw()
  }
})

document.addEventListener("touchmove", function(event) {
  if (isMouseDown) {
    const diff = event.touches[0].clientX - mouseXcoord
    let adjustValue,
        insertValue
    switch (dragged) {
      case "addInput":
        adjustValue = diff / 20
        if (adjustValue > 10) {
          adjustValue = 10
        }
        if (adjustValue < -10) {
          adjustValue = -10
        }
        add = adjustValue
        break;
      case "multInput":
        if (diff >= 0) {
          adjustValue = Math.min(diff/20 + 1, 10)
        } else {
          adjustValue = Math.max(~~((1 + (diff / 100)) * 100) / 100, 0)
        }
        mult = adjustValue
        break;
      case "expInput":
        adjustValue = diff / 50 + 1
        if (adjustValue > 3) {
          adjustValue = 3
        }
        if (adjustValue < -3) {
          adjustValue = -3
        }
        exp = adjustValue
        break;
    }

    adjustValue = ~~(adjustValue*10)/10
    insertValue = adjustValue.toString()
    insertValue = insertValue.replace("-", "&minus;")
    if (dragged == "addInput" && adjustValue < 0) {insertValue = "(" + insertValue + ")"}
    this.getElementById(dragged).getElementsByClassName("input")[0].innerHTML=insertValue
    drawLines()
    draw()
  }
})

document.addEventListener("mouseup", function(event) {
  if (isMouseDown) {
    // this.getElementById(dragged).releasePointerCapture(event.pointerId)
    isMouseDown = false
    dragged = null
    this.body.style = "cursor:default"
  }
})

document.addEventListener("touchend", function(event) {
  if (isMouseDown) {
    // this.getElementById(dragged).releasePointerCapture(event.pointerId)
    isMouseDown = false
    dragged = null
  }
})

for (var i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("mousedown", function(event) {
    // this.setPointerCapture(event.pointerId)
    mouseXcoord = event.clientX
    isMouseDown = true
    dragged = this.id
  })
  draggables[i].addEventListener("touchstart", function(event) {
    // this.setPointerCapture(event.pointerId)
    mouseXcoord = event.touches[0].clientX
    isMouseDown = true
    dragged = this.id
  })
}

init()
drawLines()
draw()
