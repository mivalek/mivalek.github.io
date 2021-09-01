
const // format value as pixels
    px = function(v) { return v ? (v|0) + "px" : '0'; },

    r = Math.random,
    // random value [0,m)
    rv = function(m) { return m*r(); },
    // random value [n,m)
    rb = function(n,m) { return rv(m-n)+n; },
    // random value centered around 0
    rc0 = function(rng) { return (r()*rng)-(rng/2); },
    // random pixel value [0,m)
    rpx = function(m) { return px(rv(m)) },
    // random background position
    bkg = function(w,h) { return rpx(w)+" "+rpx(h||w); },
    nToDraw = 7
    // Prototypes
    fp = Function.prototype,
    ap = Array.prototype,
    dp = Document.prototype,

    // callable forEach
    forEach = fp.call.bind(ap.forEach),
    // jQuery-ish
    $ = dp.querySelectorAll.bind(document),

    margin = {top: 20, right: 10, bottom: 50, left: 70},
    w = 500,
    h = 350,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([0, 7.5])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([0, 50])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top])

const letters = [
  {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1},
  {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1},
  {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1}, {"letter":"a","points":1},
  {"letter":"e","points":1}, {"letter":"e","points":1}, {"letter":"e","points":1}, {"letter":"e","points":1},
  {"letter":"e","points":1}, {"letter":"e","points":1}, {"letter":"e","points":1}, {"letter":"e","points":1},
  {"letter":"e","points":1}, {"letter":"i","points":1}, {"letter":"i","points":1}, {"letter":"i","points":1},
  {"letter":"i","points":1}, {"letter":"i","points":1}, {"letter":"i","points":1}, {"letter":"i","points":1},
  {"letter":"i","points":1}, {"letter":"i","points":1}, {"letter":"o","points":1}, {"letter":"o","points":1},
  {"letter":"o","points":1}, {"letter":"o","points":1}, {"letter":"o","points":1}, {"letter":"o","points":1},
  {"letter":"o","points":1}, {"letter":"o","points":1}, {"letter":"u","points":1}, {"letter":"u","points":1},
  {"letter":"u","points":1}, {"letter":"u","points":1}, {"letter":"u","points":1}, {"letter":"u","points":1},
  {"letter":"n","points":1}, {"letter":"n","points":1}, {"letter":"n","points":1}, {"letter":"n","points":1},
  {"letter":"n","points":1}, {"letter":"n","points":1}, {"letter":"r","points":1}, {"letter":"r","points":1},
  {"letter":"r","points":1}, {"letter":"r","points":1}, {"letter":"r","points":1}, {"letter":"r","points":1},
  {"letter":"l","points":1}, {"letter":"l","points":1}, {"letter":"l","points":1}, {"letter":"l","points":1},
  {"letter":"t","points":1}, {"letter":"t","points":1}, {"letter":"t","points":1}, {"letter":"t","points":1},
  {"letter":"s","points":1}, {"letter":"s","points":1}, {"letter":"s","points":1}, {"letter":"s","points":1},
  {"letter":"d","points":2}, {"letter":"d","points":2}, {"letter":"d","points":2}, {"letter":"d","points":2},
  {"letter":"g","points":2}, {"letter":"g","points":2}, {"letter":"g","points":2}, {"letter":"m","points":3},
  {"letter":"m","points":3}, {"letter":"c","points":3}, {"letter":"c","points":3}, {"letter":"b","points":3},
  {"letter":"b","points":3}, {"letter":"p","points":3}, {"letter":"p","points":3}, {"letter":"f","points":4},
  {"letter":"f","points":4}, {"letter":"h","points":4}, {"letter":"h","points":4}, {"letter":"v","points":4},
  {"letter":"v","points":4}, {"letter":"w","points":4}, {"letter":"w","points":4}, {"letter":"y","points":4},
  {"letter":"y","points":4}, {"letter":"k","points":5}, {"letter":"j","points":8}, {"letter":"x","points":8},
  {"letter":"q","points":10}, {"letter":"z","points":10}, {"letter":"","points":0}, {"letter":"","points":0}
]


const getLetter = () => letters[Math.floor(letters.length * r())],
      sum = (x) => {
        if (x.length > 1) {
          return x.reduce((a, b) => a + b);
        } else {
          return x[0]
        }
      }
      round = (x) => ~~(x * 100) / 100,
      mean = (x) => sum(x) / x.length,
      sd = (x) => {
          let squares = []
          x.forEach((a) => squares.push(a * a));
          let out = Math.sqrt((sum(squares) - (sum(x) ** 2) / x.length) / (x.length - 1));
          return out;
      }

let svg,
    stats,
    bars,
    data = [],
    means = [],
    se = [],
    maxBin,
    interval = [],
    yMax,
    paused




const init = () => {

paused = true
 data = []
 means = []
 maxBin = 0
 interval = []
 isPlot = false
 yMax = 50

 svg = d3.select("#plot").append("svg")
   .attr("width", w)
   .attr("height", h)

 stats = svg.append("g")
        .attr("id", "stats"),
 bars = svg.append("g")
        .attr("id", "bars")

  stats.append("line")
    .attr("id", "meanLine")
    .attr("x1", x(1.87))
    .attr("x2", x(1.87))
    .attr("y1", 10)
    .attr("y2", height + 20)
    .attr("stroke-width", 2)
    .attr("stroke", "#df03fc")

  svg.append("g")
    .attr("transform", `translate(0, ${h-margin.bottom})`)
    .attr("class", "axis")
    .call(d3.axisBottom(x)
    .ticks(10))

  svg.append("g")
     .attr("id", "y-axis")
     .attr("class", "axis")
     .attr("transform", `translate(${margin.left-5}, 0)`)
     .call(d3.axisLeft(y));

     // text label for the x axis
  svg.append("text")
    .attr("class", "axis")
     .attr("transform",
           "translate(" + (w/2 + 45) + " ," +
                          (h - 10) + ")")
     .style("text-anchor", "middle")
     .text("Mean of drawn tiles");

  // text label for the y axis
  svg.append("text")
     .attr("class", "axis")
     .attr("transform", "rotate(-90)")
     .attr("y", 0)
     .attr("x", 0 - ((h - margin.bottom) / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Count");


  se = round(sd(letters.map(l => l.points))/Math.sqrt(nToDraw))
  stats.append("rect")
  .attr("id", "seRect")
  .attr("x", x(1.87 - se))
  .attr("y", 10)
  .attr("width", (x(se) - x(0)) * 2)
  .attr("height", height + 10)
  .attr("fill", "#df03fc44")
}


const draw = () => {
  const rack = $(".rack")[0]

  let samplePoints = []
  document.querySelectorAll('.tile').forEach(e => e.remove());

  for (var i = 0; i < nToDraw; i++) {
    data[i] = getLetter()
    samplePoints.push(data[i].points)
  }

  const currentMean = round(mean(samplePoints))
  means.push(currentMean)

  const muHat = round(mean(means))

  document.getElementById('mean').innerHTML = "Mean points of drawn tiles = <span id='meanValue'>" + currentMean + "</span>"
  forEach(data, (i) => {
    let tile = document.createElement("div")

    tile.classList.add("tile")
    tile.setAttribute("data-letter", i.letter)
    tile.style.backgroundPosition = bkg(600)
    tile.style.transform = "rotate("+ rc0(5) + "deg)"
    rack.appendChild(tile)
  });


  // // Randomize the wood grain
  // forEach(tiles, function(el) {
  //   el.style.backgroundPosition = bkg(600)
  //
  // })
  //
  // // randomize the rotation of the rack tiles.
  // forEach(tiles, function(el) {
  //   el.style.transform = "rotate("+ rc0(5) +"deg)";
  // })
  tiles = document.getElementsByClassName("tile");
  // randomize the background-color of the all the tiles
  forEach(tiles, function(el) {
  	var s = el.style,
        cs = window.getComputedStyle(el),
        amt = r();
    s.backgroundColor = tinycolor(cs.backgroundColor)
      // .darken(amt*20)
    	// .desaturate(amt*30)
      .toHexString();
  })




  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(50)); // then the numbers of bins

  // And apply this function to data to get the bins
  const bins = histogram(means)

  maxBin = bins.map(b => b.length).reduce((a, b) => Math.max(a, b))

  svg.select("#muHatLine").remove()
  if (means.length > 0) {
    svg.append("line")
      .attr("id", "muHatLine")
      .attr("x1", x(muHat))
      .attr("x2", x(muHat))
      .attr("y1", 10)
      .attr("y2", height + 20)
      .attr("stroke-width", 2)
      .attr("stroke", "var(--main-col)")
      .style("stroke-dasharray", "10");
  }
  bars.selectAll("rect").remove()
  // append the bar rectangles to the svg element
  bars.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", function(d) {return x(d.x0) - (x(d.x1) - x(d.x0)) / 2})
        .attr("y", function(d) {return y(d.length)})
        .attr("width", function(d) {return x(d.x1) - x(d.x0)})
        .attr("height", function(d) { return y(0) - y(d.length)})
        // .style("fill", "#69b3a2")


  if (maxBin == yMax) {
    transition_axis()
  }
  if (maxBin == 10000) {setTimeout(() => clearInterval(interval), 10)}
}

const animate = () => {
    if (maxBin < 9999) {draw()}
}

const sliderValueToSpeed = (sliderValue) => {
  let freqValues = [1000, 700, 500, 400, 250, 180, 100, 50, 20, 5];
  // console.log(freqValues[+sliderValue]);
  return freqValues[+sliderValue];
}

const togglePlay = () => {

    setTimeout(() => clearInterval(interval), 10)
    let btn = document.getElementById("play")
    if (paused) {
      btn.classList.remove("play")
      btn.classList.add("pause")
      document.getElementById("sliders").classList.remove("hidden")
      draw()
      setTimeout(() => interval = setInterval(animate, sliderValueToSpeed(document.getElementById('speed').value)), 10)
    } else {
      btn.classList.remove("pause")
      btn.classList.add("play")
    }

    paused = !paused
}

const changeSpeed = () => {
  setTimeout(() => clearInterval(interval), 10)
  setTimeout(() => {
    if (paused) {
      togglePlay()
    } else {
      interval = setInterval(animate, sliderValueToSpeed(document.getElementById('speed').value))
    }
  }, 10)
}

plotSwitch = () => {
  if (!isPlot) {
    document.getElementById("plot").classList.remove("hidden")
  } else {
    document.getElementById("plot").classList.add("hidden")
  }
  isPlot = !isPlot
}
const reset = () => {
  clearInterval(interval)
  document.getElementById("plot").classList.add("hidden")

  d3.selectAll("svg").remove()
  document.querySelectorAll('.tile').forEach(e => e.remove());
  if (!paused) {
    let btn = document.getElementById("play")
    btn.classList.remove("pause")
    btn.classList.add("play")
  }
  document.getElementById("sliders").classList.add("hidden")

  document.getElementById("switch").checked = false
  document.getElementById('mean').innerHTML = "&nbsp;"

  // Update scale domain
  y.domain([0, 50]);

  svg.selectAll("#y-axis")
    .call(d3.axisLeft(y));

  document.getElementById('speed').value = "0"
  init()
}

const transition_axis = () => {

  // Dounle y scale if highest bin reaches top
  yMax = 2 * yMax

  // Update scale domain
  y.domain([0, yMax]);

  setTimeout(() => clearInterval(interval), 10)
  bars.selectAll("rect")
    .transition().duration(500)
    .attr("y", function(d) {return y(d.length)})
    .attr("height", function(d) { return y(0) - y(d.length)})

  svg.selectAll("#y-axis")
    .transition().duration(500)
    .call(d3.axisLeft(y))
  setTimeout(() => interval = setInterval(animate, sliderValueToSpeed(document.getElementById('speed').value)), 500)
}

document.getElementById("play").addEventListener("click", togglePlay)

// listen in on the sliders
document.getElementById('speed').addEventListener("input", changeSpeed)
document.getElementById('speed').addEventListener("touchmove", changeSpeed)

init()
