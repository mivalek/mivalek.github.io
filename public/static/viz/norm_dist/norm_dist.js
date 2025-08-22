
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const data = [-10,-9.8985,-9.797,-9.6954,-9.5939,-9.4924,-9.3909,-9.2893,-9.1878,-9.0863,-8.9848,-8.8832,-8.7817,-8.6802,-8.5787,-8.4772,-8.3756,-8.2741,-8.1726,-8.0711,-7.9695,-7.868,-7.7665,-7.665,-7.5635,-7.4619,-7.3604,-7.2589,-7.1574,-7.0558,-6.9543,-6.8528,-6.7513,-6.6497,-6.5482,-6.4467,-6.3452,-6.2437,-6.1421,-6.0406,-5.9391,-5.8376,-5.736,-5.6345,-5.533,-5.4315,-5.3299,-5.2284,-5.1269,-5.0254,-4.9239,-4.8223,-4.7208,-4.6193,-4.5178,-4.4162,-4.3147,-4.2132,-4.1117,-4.0102,-3.9086,-3.8071,-3.7056,-3.6041,-3.5025,-3.401,-3.2995,-3.198,-3.0964,-2.9949,-2.8934,-2.7919,-2.6904,-2.5888,-2.4873,-2.3858,-2.2843,-2.1827,-2.0812,-1.9797,-1.8782,-1.7766,-1.6751,-1.5736,-1.4721,-1.3706,-1.269,-1.1675,-1.066,-1,-0.9645,-0.8629,-0.7614,-0.6599,-0.5584,-0.4569,-0.3553,-0.2538,-0.1523,-0.0508,0.0508,0.1523,0.2538,0.3553,0.4569,0.5584,0.6599,0.7614,0.8629,0.9645,1,1.066,1.1675,1.269,1.3706,1.4721,1.5736,1.6751,1.7766,1.8782,1.9797,2.0812,2.1827,2.2843,2.3858,2.4873,2.5888,2.6904,2.7919,2.8934,2.9949,3.0964,3.198,3.2995,3.401,3.5025,3.6041,3.7056,3.8071,3.9086,4.0102,4.1117,4.2132,4.3147,4.4162,4.5178,4.6193,4.7208,4.8223,4.9239,5.0254,5.1269,5.2284,5.3299,5.4315,5.533,5.6345,5.736,5.8376,5.9391,6.0406,6.1421,6.2437,6.3452,6.4467,6.5482,6.6497,6.7513,6.8528,6.9543,7.0558,7.1574,7.2589,7.3604,7.4619,7.5635,7.665,7.7665,7.868,7.9695,8.0711,8.1726,8.2741,8.3756,8.4772,8.5787,8.6802,8.7817,8.8832,8.9848,9.0863,9.1878,9.2893,9.3909,9.4924,9.5939,9.6954,9.797,9.8985,10]
      sdFactor = [
0.5,0.5049,0.5099,0.5148,0.5198,0.5247,0.5297,0.5346,0.5396,0.5445,0.5495,0.5544,0.5594,0.5643,0.5693,0.5742,0.5792,0.5841,0.5891,0.594,0.599,0.6039,0.6089,0.6138,0.6188,0.6237,0.6287,0.6336,0.6386,0.6435,0.6485,0.6534,0.6584,0.6633,0.6683,0.6732,0.6782,0.6831,0.6881,0.693,0.698,0.7029,0.7079,0.7128,0.7178,0.7227,0.7277,0.7326,0.7376,0.7425,0.7475,0.7524,0.7574,0.7623,0.7673,0.7722,0.7772,0.7821,0.7871,0.792,0.797,0.8019,0.8069,0.8118,0.8168,0.8217,0.8267,0.8316,0.8366,0.8415,0.8465,0.8514,0.8564,0.8613,0.8663,0.8712,0.8762,0.8811,0.8861,0.891,0.896,0.9009,0.9059,0.9108,0.9158,0.9207,0.9257,0.9306,0.9356,0.9405,0.9455,0.9504,0.9554,0.9603,0.9653,0.9702,0.9752,0.9801,0.9851,0.99,1,1.0202,1.0404,1.0606,1.0808,1.101,1.1212,1.1414,1.1616,1.1818,1.202,1.2222,1.2424,1.2626,1.2828,1.303,1.3232,1.3434,1.3636,1.3838,1.404,1.4242,1.4444,1.4646,1.4848,1.5051,1.5253,1.5455,1.5657,1.5859,1.6061,1.6263,1.6465,1.6667,1.6869,1.7071,1.7273,1.7475,1.7677,1.7879,1.8081,1.8283,1.8485,1.8687,1.8889,1.9091,1.9293,1.9495,1.9697,1.9899,2.0101,2.0303,2.0505,2.0707,2.0909,2.1111,2.1313,2.1515,2.1717,2.1919,2.2121,2.2323,2.2525,2.2727,2.2929,2.3131,2.3333,2.3535,2.3737,2.3939,2.4141,2.4343,2.4545,2.4747,2.4949,2.5152,2.5354,2.5556,2.5758,2.596,2.6162,2.6364,2.6566,2.6768,2.697,2.7172,2.7374,2.7576,2.7778,2.798,2.8182,2.8384,2.8586,2.8788,2.899,2.9192,2.9394,2.9596,2.9798,3] ,

    margin = {top: 20, right: 10, bottom: 40, left: 70},
    w = 500,
    h = 350,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3.scaleLinear()
    .domain([-5, 5])
    .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3.scaleLinear()
      .domain([0, 0.8])  // d3.hist has to be called before the Y axis obviously
      .range([h - margin.bottom, margin.top])

function dnorm(x, mu, sigma) {
  return Math.exp(-1/2 * (((x - mu) / sigma) ** 2))/(sigma * Math.sqrt(2 * Math.PI))
}

let svg, g, graphLayer




const init = () => {


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
    .attr("x", x(-5.1))
    .attr("y", 0)
    .attr("width", x(10.2))
    .attr("height", height + margin.top + 1)
}

const draw = () => {
  const mu = +document.getElementById('muValue').value,
        sigma = sdFactor[+document.getElementById('sigmaValue').value]

  svg.select(".graph").remove()

  graphLayer = svg.append("g")
     .attr("class", "graph")

 // graphLayer

  graphLayer.append("path")
        .datum(data.slice(89,111))
        .attr("class", "sigma")
        .attr("d", d3.area()
          .x(function(d) {return x(d * sigma + mu)})
          .y0(y(0))
          .y1(function(d) { return y(dnorm(d * sigma, 0, sigma))})
          )
        .attr("clip-path", "url(#rect-clip)")

  graphLayer.append("line")
      .attr("class", "mu")
      .attr("x1", x(mu))
      .attr("x2", x(mu))
      .attr("y1", y(0))
      .attr("y2", y(dnorm(0, 0, sigma)))
  graphLayer.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", d3.line()
          .x(function(d) {return x(d + mu)})
          .y(function(d) { return y(dnorm(d + mu, mu, sigma))})
          )
        .attr("clip-path", "url(#rect-clip)")
}

const reset = () => {
  d3.selectAll("#plot > svg").remove()
  document.getElementById('muValue').value = "0"
  document.getElementById('sigmaValue').value = "100"
  init()
  draw()
}

const resetMu = () => {
  document.getElementById('muValue').value = "0"
  draw()
}
const resetSigma = () => {
  document.getElementById('sigmaValue').value = "100"
  draw()
}

// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('muValue').addEventListener("input", draw)
document.getElementById('muValue').addEventListener("touchmove", draw)
document.getElementById('sigmaValue').addEventListener("input", draw)
document.getElementById('sigmaValue').addEventListener("touchmove", draw)

init()
draw()
