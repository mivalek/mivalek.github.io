
function startTimer(lecture){
  var msg = ["Settle down please", "Let's get on with it", "Onwards!", "And now for something completely different"]
  var current_time = Date.parse(new Date());
  var deadline = new Date(current_time + 10*60*1000);

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
  document.getElementById("timer").innerHTML = minutes.pad(2) + ":" + seconds.pad(2);
      if (t < 60000) {
          document.getElementById("timer").style.color = "#ffa733";
  }
      if (t < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = msg[lecture - 1];
      }
  }, 1000);
}

$("#timer").click(function(){
    startTimer();
 });