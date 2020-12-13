
const param = new URLSearchParams(window.location.search).get('version')

let classesToRemove 
if (param == "text") {
  classesToRemove = ".animated, .interactive"
} else if (param == "animated") {
  classesToRemove = ".text, .interactive"
} else if (param == "interactive") {
  classesToRemove = ".animated, .text"
}

const divsToRemove = document.querySelectorAll(classesToRemove)
  
console.log(divsToRemove)
for (let i = 0; i < divsToRemove.length; i++) {
  divsToRemove[i].remove()
}