
// function sliderToValue(value, addPlus) {
//   let out = Math.round(value * 100) / 100;
//   return addPlus && value >= 0 ?  '+ ' + out
//       : out;
// }

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const mainColor = "#3a3f5a",
      altColor = "#fff"

const sliderToValue = (value, slope) => {
  let out = Math.abs(Math.round(value * 100) / 100);
    if (slope) {
      if (value >= 0) {
        out =  '+ ' + out;
      }
    }
    if (value < 0) out = '&minus; ' + out;
  return out;
}

const updateInterceptValue = (value) => {
  if (value < 0) {
    interceptOut.classList.add('negative');
  } else {
    interceptOut.classList.remove('negative');
  }
  interceptOut.innerHTML = sliderToValue(value, false);
}
const updateSlopeValue = (value) => {
  if (value < 0) {
    slopeOut.classList.add('negative');
  } else {
    slopeOut.classList.remove('negative');
  }
  slopeOut.innerHTML = sliderToValue(value, true);
}


// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 50, left: 60},
      w = 500,
      h = 400,
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom;
let interceptIn = document.getElementById('intercept'),
    interceptOut = document.getElementById('intercept-value'),
    slopeIn = document.getElementById('slope'),
    slopeOut = document.getElementById('slope-value');

const resetInt = () => {
   document.getElementById('intercept').value = 0;
   updatePlot();
   updateInterceptValue(intercept);
};

const resetSlope = () => {
   document.getElementById('slope').value = 0;
   updatePlot();
   updateSlopeValue(slope);
};

const reset = () => {
   resetInt()
   resetSlope()
};

// listen to sliders
interceptIn.addEventListener("mousemove", function(){
  updateInterceptValue(intercept);
  updatePlot();
});

slopeIn.addEventListener("mousemove", function(){
  updateSlopeValue(slope);
  updatePlot();
});
// touch devices
interceptIn.addEventListener("touchmove", function(){
  updateInterceptValue(intercept);
  updatePlot();
});

slopeIn.addEventListener("touchmove", function(){
  updateSlopeValue(slope);
  updatePlot();
});

// append the svg object to the body of the page
const g = d3.select("#plot").append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content", true)


let intercept = 0,
    slope = 0;
const xScale = d3.scaleLinear()
            .domain([-1, 5])
            .range([margin.left, width + margin.left]),
      yScale = d3.scaleLinear()
            .domain([-10, 10])
            .range([h - margin.bottom, margin.top]),
      rScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, height]);

// axes
g.append("g")
  .attr("transform", `translate(0, ${h-margin.bottom})`)
  .attr("class", "axis")
  .call(d3.axisBottom(xScale)
  .ticks(7))

g.append("g")
   .attr("id", "y-axis")
   .attr("class", "axis")
   .attr("transform", `translate(${margin.left-5}, 0)`)
   .call(d3.axisLeft(yScale));

   // text label for the x axis
   g.append("text")
      .attr("class", "axis lab")
      .attr("x", xScale(2))
      .attr("y", yScale(-13))
      .style("text-anchor", "middle")
      .text("x");

// text label for the y axis
g.append("text")
   .attr("class", "axis lab")
   .attr("y", yScale(0))
   .attr("x", xScale(-1.5))
   .style("text-anchor", "middle")
   .text("y");

// vertical at x=0
g.append("line")
  .attr("x1", xScale(0))
  .attr("y1", yScale(-10.6))
  .attr("x2", xScale(0))
  .attr("y2", yScale(10))
  .attr("stroke-width", 0.5)
  .attr("stroke", "#555");

// vertical at x=1
g.append("line")
  .attr("x1", xScale(1))
  .attr("y1", yScale(-10.6))
  .attr("x2", xScale(1))
  .attr("y2", yScale(10))
  .attr("stroke-width", 0.5)
  .attr("stroke", "#888")
  .style("stroke-dasharray", ("4, 5"));

g.append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("x", xScale(-1.06))
  .attr("y", yScale(10))
  .attr("width", width)
  .attr("height", height+1);


function updatePlot() {
  d3.select("#gg").remove()
  intercept = +interceptIn.value;
  slope = +slopeIn.value;

  const gg = g.append("g")
    .attr("id", "gg")

  // horizontal at y=slope
  // must be appended to gg instead of ggg so that it doesn't get clipped
  let relativeSlope = yScale((slope + intercept)),
      scaledIntercept = yScale(intercept);
  gg.append("line")
    .attr("x1", xScale(-1.16))
    .attr("y1", relativeSlope)
    .attr("x2", xScale(1.1))
    .attr("y2", relativeSlope)
    .attr("stroke-width", 1)
    .attr("stroke", mainColor)
    .attr("opacity", 1);

  // horizontal at y=intercept
  gg.append("line")
    .attr("x1", xScale(-1.05))
    .attr("y1", scaledIntercept)
    .attr("x2", xScale(5))
    .attr("y2", scaledIntercept)
    .attr("stroke-width", 0.5)
    .attr("stroke", "#888")
    .style("stroke-dasharray", ("4, 5"));

  const ggg = gg.append("g")
    .attr("clip-path", "url(#clip)");

  ggg.append("circle")
    .attr("id", "intercept-circle")
    .attr("cx", xScale(0))
    .attr("cy", scaledIntercept)
    .attr("r", rScale(.5))

  ggg.append("clipPath")
      .attr("id", "clip-circ")
      .append("circle")
      .attr("cx", xScale(0))
      .attr("cy", scaledIntercept)
      .attr("r", rScale(.5))

  ggg.append("line")
    .attr("x1", xScale(-1.16))
    .attr("y1", relativeSlope)
    .attr("x2", xScale(1.1))
    .attr("y2", relativeSlope)
    .attr("stroke-width", 1)
    .attr("stroke", altColor)
    .attr("clip-path", "url(#clip-circ)")

  // horizontal at y=intercept
  ggg.append("line")
    .attr("x1", xScale(-1.05))
    .attr("y1", scaledIntercept)
    .attr("x2", xScale(5))
    .attr("y2", scaledIntercept)
    .attr("stroke-width", 0.5)
    .attr("stroke", altColor)
    .style("stroke-dasharray", ("4, 5"))
    .attr("clip-path", "url(#clip-circ)")

  ggg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(-10.6))
    .attr("x2", xScale(0))
    .attr("y2", yScale(10))
    .attr("stroke-width", 0.5)
    .attr("stroke", altColor)
    .attr("clip-path", "url(#clip-circ)")

  ggg.append("circle")
    .attr("id", "slope-circle")
    .attr("cx", xScale(1))
    .attr("cy", yScale((intercept + (intercept + slope))/2))
    .attr("r", rScale(Math.abs(slope/4)))

  // slope indicator
  ggg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", relativeSlope)
    .attr("x2", xScale(1))
    .attr("y2", scaledIntercept)
    .attr("stroke-width", 1)
    .attr("stroke", altColor)

  ggg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", scaledIntercept)
    .attr("x2", xScale(1.1))
    .attr("y2", scaledIntercept)
    .attr("stroke-width", 1)
    .attr("stroke", altColor)
    .attr("transform", "translate(-3, 0)");


  // regression line
  ggg.append("line")
     .attr("x1", xScale(-1.1))
     .attr("y1", yScale(intercept - 1.1 * slope))
     .attr("x2", xScale(5))
     .attr("y2", yScale((intercept + 5 * slope)))
     .attr("stroke-width", 3)
     .attr("stroke", "#ffbf00");
}


updateInterceptValue(intercept);
updateSlopeValue(slope);
updatePlot();
