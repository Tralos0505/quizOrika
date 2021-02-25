/* LOGIC */

function checkAnswer() {
  if (this.innerText == questionArray[questionNumberToShow].correctAnswer) {
    if (scoringAllowed) {
      score++;
    }

    numberOfQuestionsAllreadyAsked++;
    updateSite();
    showNextQuestionAndAnswers();
  } else {
    scoringAllowed = false;
    this.classList.add("answerfalls");
  }
}

function updateSite() {
  scoreHTML.innerHTML = score;
  noqaaHTML.innerText = numberOfQuestionsAllreadyAsked;
  scoringAllowed = true;
  answer1HTML.classList.remove("answerfalls");
  answer2HTML.classList.remove("answerfalls");
  answer3HTML.classList.remove("answerfalls");
  answer4HTML.classList.remove("answerfalls");
  gameOver();
}

/*GAME FINISHED*/
function gameOver() {
  if (numberOfQuestionsAllreadyAsked >= 5) {
    /*timeleft = -1;*/
    alert(
      "Zait/Spill ass eriwer du hues " +
        score +
        " / 5 Punkten an du hues nach" +
        timeleft +
        " Sekonnen"
    );
  }
}

/*TIMER*/

var timeleft = 60;
var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    alert("Zait/Spill ass eriwer du hues " + score + " / 5 Punkten");
  }
  document.getElementById("progressBar").value = 60 - timeleft;
  timeleft -= 1;
}, 1000);
