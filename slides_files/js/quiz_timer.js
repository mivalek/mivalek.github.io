
function quizTimer(){
  var current_time = Date.parse(new Date());
  var deadline = new Date(current_time + 7*60*1000);

  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  var x = setInterval(function() {
  var now = new Date().getTime();
  var t = deadline - now;
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);
  document.getElementById("timer").innerHTML = minutes + ":" + seconds.pad(2);
      if (t < 60000) {
          document.getElementById("timer").classList.add("lastMin");
  }
      if (t < 0) {
          clearInterval(x);
          document.getElementById("timer").classList.add("timeout");
      }
  }, 1000);
}

$("#timer").click(function(){
    quizTimer();
 });