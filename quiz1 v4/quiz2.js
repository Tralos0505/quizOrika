/*TIMER*/

var timeleft = 60;
var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    alert("Zait/Spill ass eriwer du hues " + score + " / 5 Punkten");
  }
  document.getElementById("progressBar").value = 60 - timeleft;
  timeleft -= 1;
}, 1000);
