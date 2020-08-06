
// function sliderToValue(value, addPlus) {
//   let out = Math.round(value * 100) / 100;
//   return addPlus && value >= 0 ?  '+ ' + out
//       : out;
// }

const sliderToValue = (value, slope) => {
  let out = Math.abs(Math.round(value * 100) / 100);
    if (slope) {
      if (value == 1) {
        out = " + x";
      } else if (value > 0) {
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
const margin = {top: 10, right: 30, bottom: 70, left: 60},
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
let interceptIn = document.getElementById('intercept'),
    interceptOut = document.getElementById('intercept-value'),
    slopeIn = document.getElementById('slope'),
    slopeOut = document.getElementById('slope-value');

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
const g = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


let intercept = 0,
    slope = 0;
const xScale = d3.scaleLinear()
            .domain([-1, 5])
            .range([0, width]),
      yScale = d3.scaleLinear()
            .domain([-10, 10])
            .range([height, 0]),
      rScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, height]);

// axes
g.append("g")
  .attr("transform", "translate(0," + (height + 10) + ")")
  .call(d3.axisBottom(xScale)
          .ticks(7));

g.append("text")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y", height + margin.bottom)
  .text("x");

  g.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 10 - margin.left)
    .attr("y", (height + margin.top)/2)
    .text("y");

g.append("g")
  .call(d3.axisLeft(yScale))
  .attr("transform", "translate(-10, 0)");

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
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height);


function updatePlot() {
  d3.select("#gg").remove()
  intercept = +interceptIn.value;
  slope = +slopeIn.value;

  const gg = g.append("g")
    .attr("id", "gg")
    .attr("clip-path", "url(#clip)");

  gg.append("circle")
    .attr("cx", xScale(0))
    .attr("cy", yScale(intercept))
    .attr("r", rScale(1))
    .attr("fill", "rgba(51, 160, 225, .35)");

  gg.append("circle")
    .attr("cx", xScale(1))
    .attr("cy", yScale((intercept + (intercept + slope))/2))
    .attr("r", rScale(Math.abs(slope/4)))
    .attr("fill", "rgba(255, 228, 78, .4)")
    .attr("transform", "translate(10, 0)");

  // slope indicator
  gg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", yScale(intercept + slope))
    .attr("x2", xScale(1))
    .attr("y2", yScale(intercept))
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("transform", "translate(10, 0)");

  gg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", yScale(intercept + slope))
    .attr("x2", xScale(1.1))
    .attr("y2", yScale(intercept + slope))
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("transform", "translate(7, 0)");

  gg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", yScale(intercept))
    .attr("x2", xScale(1.1))
    .attr("y2", yScale(intercept))
    .attr("stroke-width", 1)
    .attr("stroke", "black")
    .attr("transform", "translate(7, 0)");

  // horizontal at y=intercept
  gg.append("line")
    .attr("x1", xScale(-1.2))
    .attr("y1", yScale(intercept))
    .attr("x2", xScale(5))
    .attr("y2", yScale(intercept))
    .attr("stroke-width", 0.5)
    .attr("stroke", "#888")
    .style("stroke-dasharray", ("4, 5"));

  // regression line
  gg.append("line")
     .attr("x1", xScale(-1))
     .attr("y1", yScale(intercept - 1 * slope))
     .attr("x2", xScale(5))
     .attr("y2", yScale((intercept + 5 * slope)))
     .attr("stroke-width", 3)
     .attr("stroke", "orangered");
}


updateInterceptValue(intercept);
updateSlopeValue(slope);
updatePlot();
