

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}
if (urlParams.get('squares') === 'false') {
  showSq = false
  d3.select("#ssr-container").style("display", "none")
} else {
  showSq = true
}

const margin = {top: 20, right: 20, bottom: 40, left: 50},
    w = 500,
    // h = 300,
    maxTickX = 30,
    maxTickY = 18
    width = w - margin.left - margin.right,
    height = width/5*3
    h = height + margin.top + margin.bottom,
    x = d3.scaleLinear()
    .domain([0, maxTickX])
    .range([margin.left, width + margin.left]),
    // Y axis scale
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
      xBarDiv.style.transform = "translate(" + invScaleX(~~(+document.getElementById("xBar").getAttribute("x1") + 5)) + "px, " + invScaleY(8) + "px)"
      yBarDiv.style.transform = "translate(" + (bounds.width - invScaleY(30)) + "px, " + invScaleY(~~(+document.getElementById("yBar").getAttribute("y1") + 2)) + "px)"
      document.getElementById("info").style.fontSize = invScaleY(25) + "px"
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
    }

let data = [{x: 4.5, y: 4.2}, {x: 7.5 , y: 3}, {x: 11.2, y: 10.7}, {x: 17.7, y: 4.6},
            {x: 15.7, y: 11.5}, {x: 13, y: 6}, {x: 20.3, y: 12.6}],
    meanX = d3.mean(data, x => x.x),
    meanY = d3.mean(data, x => x.y),
    intercept = Math.random() * maxTickY,
    yHat20 = Math.random() * maxTickY,
    slope = (yHat20 - intercept) / maxTickX,
    bounds,
    disableHint = false
const numerator = d3.sum(data, el => (el.x - meanX) * (el.y - meanY)),
          // sumSqX = d3.sum(data, el => (el.x - meanX) ** 2),
      sumSqX = d3.variance(data, el => el.x) * (data.length - 1),
      olsSlope = numerator/sumSqX,
      olsInt = meanY - meanX * olsSlope,
      targetYhat20 = olsInt + maxTickX * olsSlope

data = data.map(el => {
  yHat = intercept + el.x * slope;
  return {...el, yHat: yHat, dev: Math.abs(el.y - yHat)}
})

const init = () => {
  bounds = getBounds()

  svg = d3.select("#plot").append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 " + w + " " + h)
   .classed("svg-content", true)

  if (showSq) {
   ssPanel = d3.select("#ssr-container").append("svg")
    .attr("id", "ssPanel")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + w + " " + w)
    .classed("svg-content", true)


  ssPanel.append("rect")
    .attr("id", "ssr-rect")
    .attr("x", x(0))
    .attr("y", y(maxTickY))

  ssPanel.append("text")
     .attr("id", "ssr-label")
     .attr("x", x(maxTickX/2 - 2))
     .attr("dy", "-.8em")
     .text("SSR =")
  ssPanel.append("text")
      .attr("id", "ssr-value")
      .attr("x", x(maxTickX/2 - 2))
      .attr("dy", ".4em")
  }

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
      .attr("y", y(-.15 * maxTickY))
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


  if (showSq) {
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
      .on('click', function () {event.stopPropagation()})
  }
  innerPlot.append("text")
     .attr("id", "hint-label")
     .attr("x", x(maxTickX * .025))
     .attr("y", y(maxTickY * .015))
     .text("?")
     reg = graphLayer.append("g")
       .attr("clip-path", "url(#rect-clip)")

   graphLayer.append("line")
     .attr("id", "yBar")
     .attr("x1", x(0))
     .attr("y1", y(meanY))
     .attr("x2", x(maxTickX))
     .attr("y2", y(meanY))
   graphLayer.append("line")
     .attr("id", "xBar")
     .attr("x1", x(meanX))
     .attr("y1", y(0))
     .attr("x2", x(meanX))
     .attr("y2", y(maxTickY))
   positionInfo()

   graphLayer.selectAll(".dot")
     .data(data)
     .enter()
     .append("circle")
     .attr("class", "dot")
     .classed("selected", false)
     .attr("index", (d, i) => i)
     .attr("cx", function (d) { return x(d.x); } )
     .attr("cy", function (d) { return y(d.y); } )
     .attr("r", 10)

   reg.append("line")
       .attr("id", "yHat")
       .attr("x1", x(-1))
       .attr("y1", y(intercept - slope))
       .attr("x2", x(maxTickX))
       .attr("y2", y(intercept + maxTickX * slope))
    svg.append("circle")
      .attr("class", "control")
      .attr("id", "intercept")
      .attr("cx", x(0))
      .attr("cy", y(intercept))
      .attr("r", 20)
      .call(dragIntercept)
   svg.append("circle")
     .attr("class", "control-mid")
     .attr("id", "intercept-mid")
     .attr("cx", x(0))
     .attr("cy", y(intercept))
     .attr("r", 3)
   svg.append("circle")
     .attr("class", "control")
     .attr("id", "slope")
     .attr("cx", x(maxTickX))
     .attr("cy", y(yHat20))
     .attr("r", 20)
     .call(dragSlope)
   svg.append("circle")
     .attr("class", "control-mid")
     .attr("id", "slope-mid")
     .attr("cx", x(maxTickX))
     .attr("cy", y(yHat20))
     .attr("r", 3)

    positionHint()
}


const draw = (int, slp) => {
  intercept = int
  slope = slp

  if (Math.abs(intercept - olsInt) < .5 && Math.abs(yHat20 - targetYhat20) < .5) {
    intercept = olsInt
    slope = olsSlope
    yHat20 = targetYhat20
    d3.select("#yHat").classed("ols", true)
  } else {
    d3.select("#yHat").classed("ols", false)
  }

  data = data.map(el => {
    yHat = intercept + el.x * slope;
    return {...el, yHat: yHat, dev: Math.abs(el.y - yHat)}
  })

  const sumSqResid = d3.sum(data.map( el => (el.y - el.yHat) ** 2))

  graphLayer.selectAll(".devSq")
      .data(data)
      .join(
        enter => enter.append("rect")
              .attr("class", "devSq yHat")
              .classed("hidden", !showSq)
              .attr("x", (d) => x(d.x + d.dev > maxTickX ? d.x - d.dev : d.x))
              .attr("y", (d) => y(Math.max(d.y, d.yHat)))
              .attr("width", (d) => x(d.dev) - x(0))
              .attr("height", (d) => y(0) - y(d.dev)),
        update => update.attr("x", (d) => x(d.x + d.dev > maxTickX ? d.x - d.dev : d.x))
        .attr("y", (d) => y(Math.max(d.y, d.yHat)))
        .attr("width", (d) => x(d.dev) - x(0))
        .attr("height", (d) => y(0) - y(d.dev))
      )

  graphLayer.selectAll(".dev")
    .data(data)
    .join(
      enter => enter.append("line")
        .attr("class", "dev yHat togglable")
        .classed("hidden", !showSq)
        .attr("x1", (d) => x(d.x))
        .attr("y1", (d) => y(d.y))
        .attr("x2", (d) => x(d.x))
        .attr("y2", (d) => y(d.yHat)),
      update => update
        .attr("y2", (d) => y(d.yHat))
    )


  d3.select("#yHat")
      .attr("y1", y(intercept - slope))
      .attr("y2", y(intercept + maxTickX * slope))
  svg.select("#intercept")
     .attr("cy", y(intercept))
 svg.select("#intercept-mid")
    .attr("cy", y(intercept))
  svg.select("#slope")
    .attr("cy", y(yHat20))
  svg.select("#slope-mid")
    .attr("cy", y(yHat20))

  if (showSq) {
    const sstRectSize = Math.sqrt(sumSqResid)
    ssPanel.select("#ssr-rect")
      .attr("x", x((maxTickX - sstRectSize)/2))
      .attr("width", x(sstRectSize) - x(0))
      .attr("height", x(sstRectSize) - x(0))
    ssPanel.select("#ssr-label")
      .attr("y", x(sstRectSize)/2)
    ssPanel.select("#ssr-value")
      .attr("y", x(sstRectSize)/2)
      .text( sumSqResid.toFixed(2));
  }
   positionHint()
}

// Define drag beavior
const dragIntercept = d3.drag()
  .on("start", () => {
    event.preventDefault()
    event.stopPropagation()
    d3.select("#intercept").classed("hovered", true)
    d3.select("#hint-clip-circ").transition()
       .duration('300')
       .attr("r", 0)
    })
  .on("drag", moveIntercept)
  .on("end", () => {
    d3.select("#intercept").classed("hovered", false)
    d3.select("#hint-clip-circ").transition()
       .duration('300')
       .attr("r", 30)
    })

const dragSlope = d3.drag()
  .on("start", () => {
    event.preventDefault()
    event.stopPropagation()
    d3.select("#slope").classed("hovered", true)
    })
  .on("drag", moveSlope)
  .on("end", () => {
    d3.select("#slope").classed("hovered", false)
    })

function moveIntercept() {
  event.preventDefault()
  event.stopPropagation()
  let newInt
  if ("touches" in event) {
    newInt= y.invert(dragScaleY(event.touches[0].clientY))
  } else {
    newInt = y.invert(event.y)
  }
  newInt = Math.min(Math.max(0, newInt), maxTickY)
  yHat20 = Math.min(Math.max(0, newInt + maxTickX * slope), maxTickY)
  const newSlope = (yHat20 - newInt) / maxTickX
  draw(newInt, newSlope)
}

function moveSlope() {
  event.preventDefault()
  event.stopPropagation()
  if ("touches" in event) {
    yHat20 = y.invert(dragScaleY(event.touches[0].clientY))
  } else {
    yHat20 = y.invert(event.y)
  }
  yHat20 = Math.min(Math.max(0, yHat20), maxTickY)
  const newSlope = (yHat20 - intercept) / maxTickX
  draw(intercept, newSlope)
}

function dragScaleY(y) {
  return y / bounds.height * h
}

function invScaleX(x) {
  return x / w * bounds.width
}

function invScaleY(y) {
  return y / h * bounds.height
}

init()
draw(intercept, slope)
// draw(intercept, slope)
