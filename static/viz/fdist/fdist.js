
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const data = [0,0.0251,0.0503,0.0754,0.1005,0.1256,0.1508,0.1759,0.201,0.2261,0.2513,0.2764,0.3015,0.3266,0.3518,0.3769,0.402,0.4271,0.4523,0.4774,0.5025,0.5276,0.5528,0.5779,0.603,0.6281,0.6533,0.6784,0.7035,0.7286,0.7538,0.7789,0.804,0.8291,0.8543,0.8794,0.9045,0.9296,0.9548,0.9799,1.005,1.0302,1.0553,1.0804,1.1055,1.1307,1.1558,1.1809,1.206,1.2312,1.2563,1.2814,1.3065,1.3317,1.3568,1.3819,1.407,1.4322,1.4573,1.4824,1.5075,1.5327,1.5578,1.5829,1.608,1.6332,1.6583,1.6834,1.7085,1.7337,1.7588,1.7839,1.809,1.8342,1.8593,1.8844,1.9095,1.9347,1.9598,1.9849,2.0101,2.0352,2.0603,2.0854,2.1106,2.1357,2.1608,2.1859,2.2111,2.2362,2.2613,2.2864,2.3116,2.3367,2.3618,2.3869,2.4121,2.4372,2.4623,2.4874,2.5126,2.5377,2.5628,2.5879,2.6131,2.6382,2.6633,2.6884,2.7136,2.7387,2.7638,2.7889,2.8141,2.8392,2.8643,2.8894,2.9146,2.9397,2.9648,2.9899,3.0151,3.0402,3.0653,3.0905,3.1156,3.1407,3.1658,3.191,3.2161,3.2412,3.2663,3.2915,3.3166,3.3417,3.3668,3.392,3.4171,3.4422,3.4673,3.4925,3.5176,3.5427,3.5678,3.593,3.6181,3.6432,3.6683,3.6935,3.7186,3.7437,3.7688,3.794,3.8191,3.8442,3.8693,3.8945,3.9196,3.9447,3.9698,3.995,4.0201,4.0452,4.0704,4.0955,4.1206,4.1457,4.1709,4.196,4.2211,4.2462,4.2714,4.2965,4.3216,4.3467,4.3719,4.397,4.4221,4.4472,4.4724,4.4975,4.5226,4.5477,4.5729,4.598,4.6231,4.6482,4.6734,4.6985,4.7236,4.7487,4.7739,4.799,4.8241,4.8492,4.8744,4.8995,4.9246,4.9497,4.9749,5],
    margin = {top: 20, right: 10, bottom: 50, left: 70},
    w = 500,
    h = 250,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([0, 5])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    yLim = 2,
    y = d3.scaleLinear()
      .domain([0, yLim])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top])

let svg, g, graphLayer

let df1 = 1,
    df2= 1,
    crit = 10


function df(x, df1, df2 ) {return Math.min(2, jStat.centralF.pdf(x, df1, df2 ))}

const init = () => {

 svg = d3.select("#plot").append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 " + w + " " + h)
   .classed("svg-content", true)


  g = svg.append("g")

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
        .attr("class", "axis lab")
        .attr("x", x(2.5))
        .attr("y", y(-0.5))
        .style("font-style", "italic")
        .style("text-anchor", "middle")
        .text("F");

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
      .attr("x", x(0))
      .attr("y", y(1.998))
      .attr("width", x(20) - x(0))
      .attr("height", y(0) - y(1.998))
}

const draw = () => {
  df1 =  +document.getElementById('df1Value').value
  df2 =  +document.getElementById('df2Value').value
  crit = jStat.centralF.inv(0.95, df1, df2)
  critOut = crit.toFixed(4)
  const upperIndex = data.findIndex((d) => d > crit)
  let tail = data.slice(upperIndex, data.length)

  if (upperIndex >= 0) {tail.unshift(crit)}

  document.getElementById("df1").innerHTML = df1
  document.getElementById("df2").innerHTML = df2
  document.getElementById("critValue").innerHTML = critOut
  document.querySelectorAll("#df1In").forEach((el) => el.innerHTML = df1)
  document.querySelectorAll("#df2In").forEach((el) => el.innerHTML = df2)
  document.querySelectorAll("#quantile").forEach((el) => el.innerHTML = critOut)
  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")

 // graphLayer



 graphLayer.append("path")
       .datum(data)
       .attr("class", "inner")
       .attr("d", d3.area()
         .x(function(d) {return x(d)})
         .y0(y(0))
         .y1(function(d) { return y(df(d, df1, df2 ))})
         )
   graphLayer.append("path")
         .datum(tail)
         .attr("class", "outer")
         .attr("d", d3.area()
           .x(function(d) {return x(d)})
           .y0(y(0))
           .y1(function(d) { return y(df(d, df1, df2 ))})
           )

  graphLayer.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {return x(d)})
          .y(function(d) { return y(df(d, df1, df2 ))})
          )
        .attr("clip-path", "url(#rect-clip)")
}

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  document.getElementById('df1Value').value = "1"
  document.getElementById('df2Value').value = "1"
  init()
  draw()
}

const resetDf = (id) => {
  document.getElementById(id).value = "1"
  draw()
}

// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('df1Value').addEventListener("input", draw)
document.getElementById('df1Value').addEventListener("touchmove", draw)
document.getElementById('df2Value').addEventListener("input", draw)
document.getElementById('df2Value').addEventListener("touchmove", draw)

init()
draw()
