
let targetGrade = +document.getElementById("grade").value

function calcAll () {
  const xVal = +document.getElementById("xSlider").value
  const yVal = +document.getElementById("ySlider").value
  const zVal = +document.getElementById("zSlider").value
  targetGrade = +document.getElementById("grade").value
  document.getElementById('targetGrade').innerHTML = targetGrade
  gradeNeeded = 4 * targetGrade - (xVal + yVal + zVal)
  gradeNeeded = ~~(gradeNeeded * 100) / 100
  let msg = "cannot"
  if (gradeNeeded <= 0) {
    msg = "can score a 0 and still"
  } else if (gradeNeeded <= 100) {
    msg = "need a " + Math.ceil(gradeNeeded) + " or better to"
  } else {
    document.getElementById('targetGrade').innerHTML = targetGrade + " anymore"
  }
  document.getElementById('gradeNeeded').innerHTML = msg
}

const insertValue = (slider, id) => {
  value = document.getElementById(slider).value
  document.getElementById(id).innerHTML = value;

  calcAll()
}


// listen in on the sliders
// document.getElementById('xValue').addEventListener("change", draw)
document.getElementById('xSlider').addEventListener("input", () => {insertValue('xSlider', 'xValue')})
document.getElementById('ySlider').addEventListener("input", () => {insertValue('ySlider', 'yValue')})
document.getElementById('zSlider').addEventListener("input", () => {insertValue('zSlider', 'zValue')})
document.getElementById('grade').addEventListener("input", () => {calcAll()})







const resetSlider = (slider) => {
  document.getElementById(slider).value = "1"
  insertValue(slider, 'xValue')
}
