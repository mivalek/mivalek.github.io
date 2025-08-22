

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const margin = {top: 8, right: 10, bottom: 40, left: 50},
    w = 500,
    h = 400,
    maxTickX = 20,
    maxTickY = 16
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([0, maxTickX])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([0, maxTickY])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top]),
    hoverRadius = {raw: 10, scaled: x.invert(x(0) + 10)},
    rnorm = (mean = 0, sd = 1) => {
      // approximation
      let rand = 0;
      for (var i = 0; i < 6; i++) {
        rand += Math.random();
      }
      return (rand / 6 - .5) * 8.44 * sd + mean
    },
    getBounds = () => bounds = document.getElementById("plot").getBoundingClientRect(),
    positionInfo = () => {
      yBarDiv = document.getElementById("yBarDiv")
      xBarDiv = document.getElementById("xBarDiv")

      if (data.length) {
      xBarDiv.style.transform = "translate(" + invScaleX(~~(+document.getElementById("xBar").getAttribute("x1") + 5)) + "px, " + invScaleY(8) + "px)"
      yBarDiv.style.transform = "translate(" + (bounds.width - invScaleY(30)) + "px, " + invScaleY(~~(+document.getElementById("yBar").getAttribute("y1") + 2)) + "px)"

      document.getElementById("info").style.fontSize = invScaleY(25) + "px"
    } else {
      xBarDiv.style.transform = "translate(-1000px, -1000px)"
      yBarDiv.style.transform = "translate(-1000px, -1000px)"
    }
    },
    positionHint = () => {
      hintBox.style.transform = `translate(${invScaleX(x(0))}px, ${invScaleY(y(maxTickY))}px)`
      hintBox.style.height = invScaleY(height) + 'px'
      hintBox.style.width = invScaleX(width) + 'px'
    },
    hintBox = document.getElementById("hint-container"),
    resize = () => {
      getBounds()
      positionInfo()
      positionHint()
      edge = {
        left: bounds.x + invScaleX(margin.left),
        right: bounds.right - invScaleX(margin.right) - invScaleX(hoverRadius.raw),
        top: bounds.y + invScaleY(margin.top) + invScaleY(hoverRadius.raw),
        bottom: bounds.bottom - invScaleY(margin.bottom)
      }
    }

d3.select("#sst").on('click', () => switchSS(true))
d3.select("#ssr").on('click', () => switchSS())

let data = [],
    anySelected,
    bounds,
    wasDragged = false,
    disableHint = false,
    yBarVal = document.getElementById("yBarValue"),
    xBarVal = document.getElementById("xBarValue"),
    rSqVal = document.getElementById("rSqValue"),
    ssrVal = document.getElementById("ssrValue"),
    sstVal = document.getElementById("sstValue"),
    intercept,
    slope,
    yBarDevShow,
    edge

const init = () => {
  bounds = getBounds()
  edge = {
    left: bounds.x + invScaleX(margin.left),
    right: bounds.right - invScaleX(margin.right) - invScaleX(hoverRadius.raw),
    top: bounds.y + invScaleY(margin.top) + invScaleY(hoverRadius.raw),
    bottom: bounds.bottom - invScaleY(margin.bottom)
  }
  for (let i = 0; i < 7; i++) {
    data[i] = {
      x: Math.min(Math.max(0, rnorm(maxTickX/2, maxTickX/5)), maxTickX),
      y: Math.min(Math.max(0, rnorm(maxTickY/2, maxTickY/5)), maxTickY),
      selected: false,
      hover: false
    }
  }


  anySelected = false
  yBarDevShow = false

  svg = d3.select("#plot").append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 " + w + " " + h)
   .classed("svg-content", true)
   .call(select)
   .on("click", click);
   // .attr("width", w)
   // .attr("height", h)


  svg.append("g")
    .attr("transform", `translate(0, ${h-margin.bottom})`)
    .attr("class", "axis")
    .call(d3.axisBottom(x)
    .ticks(10))

  svg.append("g")
     .attr("id", "y-axis")
     .attr("class", "axis")
     .attr("transform", `translate(${margin.left}, 0)`)
     .call(d3.axisLeft(y));

   // text label for the x axis
   svg.append("text")
      .attr("class", "axis lab")
      .attr("x", x(maxTickX/2))
      .attr("y", y(-.11 * maxTickY))
      .style("text-anchor", "middle")
      .text("x");

  // text label for the y axis
  svg.append("text")
     .attr("class", "axis lab")
     .attr("x", x(-.08 * maxTickX))
     .attr("y", y(maxTickY/2))
     .style("text-anchor", "middle")
     .text("y");

  svg.append("clipPath") // define a clip path
    .attr("id", "rect-clip") // give the clipPath an ID
    .append("rect") //Append the shape for clipping
    .attr("x", x(0))
    .attr("y", y(maxTickY))
    .attr("width", x(maxTickX) - x(0) + 1)
    .attr("height", y(0) - y(maxTickY))

  innerPlot = svg.append("g")
    .attr("class", "graph")
    .attr("clip-path", "url(#rect-clip)")
  graphLayer = innerPlot.append("g")

  svg.append("clipPath")
    .attr("id", "hint-clip")
    .append("circle")
    .attr("id", "hint-clip-circ")
    .attr("cx", x(0) )
    .attr("cy", y(0) )
    .attr("r", 30)


  hintRect = innerPlot.append("rect") //Append the shape for clipping
    .attr("x", x(0.04))
    .attr("y", y(maxTickY))
    .attr("width", x(maxTickX))
    .attr("height", y(0) - y(maxTickY))
    .attr("fill", "#f4c300ee")
    .attr("clip-path", "url(#hint-clip)")
    .attr("style", "cursor:pointer")
    .on('mouseover', function () {
            if (!disableHint) {
              d3.select("#hint-clip-circ").transition()
                   .duration('300')
                   .attr('r', 600)
              d3.select("#info").classed("hide", true)
              d3.select("#hint-label").classed("hide", true)
                 }
               })
    .on('mouseout', function () {
            if (!disableHint) {
              d3.select("#hint-clip-circ").transition()
                   .duration('300')
                   .attr('r', 30)
              d3.select("#info").classed("hide", false)
              d3.select("#hint-label").classed("hide", false)
                 }
               })
   .on('touchstart', function () {
           if (!disableHint) {
             d3.select("#hint-clip-circ").transition()
                  .duration('300')
                  .attr('r', 600)
             d3.select("#info").classed("hide", true)
             d3.select("#hint-label").classed("hide", true)
                }
              })
   .on('touchend', function () {
           if (!disableHint) {
             d3.select("#hint-clip-circ").transition()
                  .duration('300')
                  .attr('r', 30)
             d3.select("#info").classed("hide", false)
             d3.select("#hint-label").classed("hide", false)
                }
              })
    .on('click', function () {d3.event.stopPropagation()})

    innerPlot.append("text")
       .attr("id", "hint-label")
       .attr("x", x(maxTickX * .025))
       .attr("y", y(maxTickY * .015))
       .text("?")

    positionHint()
}

const yHatPoint = () => {
  let xPos = x.invert(dragScaleX(d3.event.layerX)),
      yPos = intercept + xPos * slope
  xPos = x((yPos - intercept) / slope)
  yPos = y(yPos)


  reg.append("line")
    .attr("id", "yHatHoriz")
    .attr("class", "yHatHover")
    .attr("x1", x(0))
    .attr("y1", yPos)
    .attr("x2", x(0))
    .attr("y2", yPos)
    .transition()
     .duration('200')
     .attr('x2', xPos)
  reg.append("line")
    .attr("id", "yHatVert")
    .attr("class", "yHatHover")
    .attr("x1", xPos)
    .attr("y1", y(0))
    .attr("x2", xPos)
    .attr("y2", y(0))
    .transition()
     .duration('150')
     .attr('y1', yPos)
reg.append("circle")
  .attr("class", "yHatHover")
  .attr("cx", xPos)
  .attr("cy", yPos)
  .attr("r", 0)
  .transition()
   .duration('150')
   .attr('r', 6)
}

const yHatPointMove = () => {
  let xPos = x.invert(dragScaleX(event.layerX)),
      yPos = intercept + xPos * slope
  xPos = x((yPos - intercept) / slope)
  yPos = y(yPos)

  reg.select("circle")
    .attr("cx", xPos)
    .attr("cy", yPos)
  reg.select("#yHatHoriz")
    .attr("y1", yPos)
    .attr("y2", yPos)
    .transition()
     .duration('60')
     .attr('x2', xPos)
  reg.select("#yHatVert")
    .attr("x1", xPos)
    .attr("x2", xPos)
    .transition()
     .duration('60')
     .attr('y1', yPos)
}

const yHatPointDelete = () => d3.selectAll(".yHatHover").each(function(d) {d3.select(this).remove()})

const draw = () => {

  meanX = d3.mean(data, x => x.x)
  meanY = d3.mean(data, x => x.y)
  const numerator = d3.sum(data, el => (el.x - meanX) * (el.y - meanY)),
        // sumSqX = d3.sum(data, el => (el.x - meanX) ** 2)
        sumSqX = d3.variance(data, el => el.x) * (data.length - 1)

  slope = numerator/sumSqX,
  intercept = meanY - meanX * slope
  data = data.map(el => {
    yHat = intercept + el.x * slope;
    return {...el, yHat: yHat, dev: Math.abs(el.y - yHat), yBarDev:  Math.abs(el.y - meanY)}
  })
  const allEqual = data.length > 2 && data.every(d => d.x == data[0].x)

  if (allEqual) {
    slope = 0
    intercept = meanY
    data = data.map(el => {
      yHat = meanY
      return {...el, yHat: yHat, dev: Math.abs(el.y - yHat), yBarDev:  Math.abs(el.y - meanY)}
    })
  }

  const sumSqResid = d3.sum(data.map( el => (el.y - el.yHat) ** 2)),
        sumSqTot = d3.variance(data, el => el.y) * (data.length - 1)

  if (data.length < 2) {
    rSq = "&nbsp; = NaN"
  } else if (data.length == 2) {
    rSq = "&nbsp; = 0.00"
  } else if (allEqual) {
    rSq = data.every(d => d.y == data[0].y) ? "&nbsp; = 1.00" : "&nbsp; = 0.00"
  } else {
    if (sumSqTot === NaN) {
      rSq = "&nbsp; = NaN"
    } else if (sumSqTot === 0) {
      rSq = "&nbsp; = 1.00"
    } else {
      rSq = Math.round((1 - sumSqResid / sumSqTot) * 1000) / 1000
      rSq = rSq ? "&nbsp; = " + rSq.toFixed(2).replace("0.", ".") : "&nbsp; < .01"
    }
  }
  rSqVal.innerHTML = rSq
  ssrVal.innerHTML = Math.round(sumSqResid * 100)/100
  sstVal.innerHTML = Math.round(sumSqTot * 100)/100
  graphLayer.selectAll("g").remove()


  lines = graphLayer.append("g")
    .attr("clip-path", "url(#rect-clip)")

  scatter = graphLayer.append("g")

  reg = graphLayer.append("g")
    .attr("clip-path", "url(#rect-clip)")

  if (data.length > 2) {
    lines.selectAll("devSq")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "devSq yHat togglable")
      .classed("hidden", yBarDevShow)
      .attr("x", (d) => x(d.x + d.dev > maxTickX ? d.x - d.dev : d.x))
      .attr("y", (d) => y(Math.max(d.y, d.yHat)))
      .attr("width", (d) => x(d.dev) - x(0))
      .attr("height", (d) => y(0) - y(d.dev))
      .on("click", click)
    lines.selectAll(".dev")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "dev yHat togglable")
      .classed("hidden", yBarDevShow)
      .attr("x1", (d) => x(d.x))
      .attr("y1", (d) => y(d.y))
      .attr("x2", (d) => x(d.x))
      .attr("y2", (d) => y(d.yHat))

    lines.selectAll(".devSq.yBar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "devSq yBar togglable")
      .classed("hidden", !yBarDevShow)
      .attr("x", (d) => x(d.x + d.yBarDev > maxTickX ? d.x - d.yBarDev : d.x))
      .attr("y", (d) => y(Math.max(d.y, meanY)))
      .attr("width", (d) => x(d.yBarDev) - x(0))
      .attr("height", (d) => y(0) - y(d.yBarDev))
      .on("click", click)
    lines.selectAll(".dev.yBar")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "dev yBar togglable")
      .classed("hidden", !yBarDevShow)
      .attr("x1", (d) => x(d.x))
      .attr("y1", (d) => y(d.y))
      .attr("x2", (d) => x(d.x))
      .attr("y2", (d) => y(meanY))
  }

  reg.append("line")
      .attr("id", "yHat")
      .attr("x1", x(-1))
      .attr("y1", y(intercept - slope))
      .attr("x2", x(maxTickX))
      .attr("y2", y(intercept + maxTickX * slope))
  reg.append("line")
      .attr("x1", x(-1))
      .attr("y1", y(intercept - slope))
      .attr("x2", x(maxTickX))
      .attr("y2", y(intercept + maxTickX * slope))
      .attr("stroke-width", 6)
      .attr("opacity", 0)
      .on('mouseover', yHatPoint)
      .on('mousemove', yHatPointMove)
      .on('mouseout', yHatPointDelete)

  scatter.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .on("click", removeElement)
    .call(drag)
    .on('mouseover', function (d) {
              d3.select(this).transition()
                   .duration('200')
                   .attr('r', hoverRadius.raw)
                 })
    .on('mouseout', function (d) {
              d3.select(this).transition()
                   .duration('200')
                   .attr('r', 8)
                 })
    .attr("class", "dot")
    .classed("selected", (d) => d.selected)
    .attr("index", (d, i) => i)
    .attr("cx", function (d) { return x(d.x); } )
    .attr("cy", function (d) { return y(d.y); } )
    .attr("r", (d) => d.hover ? hoverRadius.raw : 8)

  lines.append("line")
    .attr("id", "yBar")
    .attr("x1", x(0))
    .attr("y1", y(meanY))
    .attr("x2", x(maxTickX))
    .attr("y2", y(meanY))
  lines.append("line")
    .attr("id", "xBar")
    .attr("x1", x(meanX))
    .attr("y1", y(0))
    .attr("x2", x(meanX))
    .attr("y2", y(maxTickY))
  positionInfo()

}



const reset = () => {
  d3.selectAll("#plot > svg").remove()
  // document.getElementById('rValue').value = "0"
  init()
  draw()
}

// listen in on the sliders
// document.getElementById('rValue').addEventListener("input", draw)
// document.getElementById('rValue').addEventListener("touchmove", draw)

const deselect = () => {
  data = data.map((x) => {return {...x, selected: false}})
  d3.selectAll(".dot").each(function(d,i) {
    d3.select(this).classed( "selected", false)
  })
  anySelected = false
}

function click(){
  if (anySelected) {
    deselect()
  } else {
    // Extract the click location\
    const point = d3.mouse(this),
          p = {x: point[0], y: point[1]}
    data.push({x: x.invert(p.x), y: y.invert(p.y)})
    draw()
  }
}


let selectRectOrigin,
    draggedIndices = []

function dragScaleX(x) {
  return x / bounds.width * w
}

function invScaleX(x) {
  return x / w * bounds.width
}

function dragScaleY(y) {
  return y / bounds.height * h
}

function invScaleY(y) {
  return y / h * bounds.height
}
const beginSelect = (d) => {
  selectRectOrigin = {x: dragScaleX(d3.event.x), y: dragScaleY(d3.event.y)}
  svg.append("rect")
  .attr("id", "selectRect")
  .attr("x", selectRectOrigin.x)
  .attr("y",selectRectOrigin.y)
  .attr("width", 0)
  .attr("height", 0)
  .attr("fill", "#f4c30022")
  .attr("stroke", "#f4c30088")
  .attr("stroke-width", .5)
  .attr("clip-path", "url(#rect-clip)")
}

const dragSelect = (d) => {
  const x1 = selectRectOrigin.x,
        y1 = selectRectOrigin.y,
        x2 = dragScaleX(d3.event.x),
        y2 = dragScaleY(d3.event.y),
        minX = Math.min(x1, x2),
        minY = Math.min(y1, y2),
        maxX = Math.max(x1, x2),
        maxY = Math.max(y1, y2)

  let isSelected = []

  data.forEach((d, i) => {
    if (x(d.x) >= minX & x(d.x) <= maxX & y(d.y) >= minY & y(d.y) <= maxY) {
      isSelected[i] = true
      d.selected = true
    } else {
      isSelected[i] = false
      d.selected = false
    }
  })

  if (isSelected.length > 0) anySelected = true

  d3.select("#selectRect")
  .attr("x", minX)
  .attr("y", minY)
  .attr("width", Math.abs(x1 - x2))
  .attr("height", Math.abs(y1 - y2))

  d3.selectAll("circle").each(function(d,i) {
    if(isSelected[i]) {
      d3.select(this).classed( "selected", true)
    } else {
      d3.select(this).classed( "selected", false)
    }
  })
}

const endSelect = (d) => {
  d3.select("#selectRect").remove()
  draw()
}



const select = d3.drag()
.on("start", beginSelect)
.on("drag", dragSelect)
.on("end", endSelect)

// Define drag beavior
var drag = d3.drag()
.on("start", dragStart)
.on("drag", dragmove)
.on("end", function(d) {
  data[+d3.select(this).attr("index")].hover = false
  if (wasDragged) {
    draw()
    wasDragged = false
  }
  disableHint = false
})

let dragMoveStartingPosition,
    isTouch = false,
    movingPoint,
    diffMousePoint

function dragmove(d) {
  wasDragged = true
  const thisX = x(data[movingPoint].x)
  const thisY = y(data[movingPoint].y)
  if (isTouch) {
    ev = event.touches[0]
    dx = ev.clientX - dragMoveStartingPosition.x
    dy = ev.clientY - dragMoveStartingPosition.y
    dragMoveStartingPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    }
  } else {
    ev = event
    dx = ev.movementX
    dy = ev.movementY
  }

  const freezeX = (thisX > ev.clientX - diffMousePoint.x && dx > 0) || (thisX < ev.clientX - diffMousePoint.x && dx < 0),
        freezeY = (thisY > ev.clientY - diffMousePoint.y && dy > 0) || (thisY < ev.clientY - diffMousePoint.y && dy < 0)
  if (!freezeX) {
    for (let i of draggedIndices) {
      const moveTo = x.invert(x(data[i].x) + invScaleX(dx))
      if (moveTo < hoverRadius.scaled) {
        data[i].x = hoverRadius.scaled
      } else if (moveTo > maxTickX - hoverRadius.scaled) {
        data[i].x = maxTickX - hoverRadius.scaled
      } else {
        data[i].x = moveTo
      }
    }
  }
  if (!freezeY) {
    for (let i of draggedIndices) {
      const moveTo = y.invert(y(data[i].y) + dragScaleY(dy))
      if (moveTo < hoverRadius.scaled) {
        data[i].y = hoverRadius.scaled
      } else if (moveTo > maxTickY - hoverRadius.scaled) {
        data[i].y = maxTickY - hoverRadius.scaled
      } else {
        data[i].y = moveTo
      }
    }
  }
  draw()
}

function dragStart(d) {
  disableHint = true
  if (event.touches) {
    isTouch = true
    dragMoveStartingPosition = {x: event.touches[0].clientX, y: event.touches[0].clientY}
  } else {
    dragMoveStartingPosition = {x: event.clientX, y: event.clientY}
  }
  draggedIndices = []
  movingPoint = +d3.select(this).attr("index")
  data[movingPoint].hover = true
  diffMousePoint = {x: dragMoveStartingPosition.x - x(data[movingPoint].x), y: dragMoveStartingPosition.y - y(data[movingPoint].y)}
  if (!d3.select(this).classed("selected")) {
    deselect()
    draggedIndices.push(+d3.select(this).attr("index"))
  } else {
    d3.selectAll(".selected").nodes().forEach(el => draggedIndices.push(+el.getAttribute("index")))
  }
}


function removeElement(d) {
  d3.event.stopPropagation()
  if (anySelected) {
    let remove = []
    d3.selectAll(".selected").nodes().forEach(el => remove.push(+el.getAttribute("index")))
    while(remove.length) {
      data.splice(remove.pop(), 1);
    }
  } else {
    data.splice(+d3.select(this).attr("index"), 1)
  }
  draw()
}

function switchSS(ssT = false) {
  if (yBarDevShow != ssT) {
    d3.selectAll(".togglable").each(function(d) {d3.select(this).classed("hidden", !d3.select(this).classed("hidden"))})
    yBarDevShow = !yBarDevShow
  }
}

init()
draw()
