class Question {
  constructor(
    questionText,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
    allreadyAsked
  ) {
    this.questionText = questionText;
    this.answerArray = [answer1, answer2, answer3, answer4];
    this.correctAnswer = correctAnswer;
    this.allreadyAsked = allreadyAsked;
  }
}

/* Define the Question as an Array*/

var questionArray = [
  new Question("Element Eisen?", "Fe", "Br", "I", "Cl", "Fe", false),
  new Question("Element Gold?", "Fe", "Au", "I", "Cl", "Au", false),
  new Question("Element Brom?", "Fe", "Br", "I", "Cl", "Br", false),
  new Question("Element Iod?", "Fe", "Br", "I", "Cl", "I", false),
  new Question("Element Clor?", "Fe", "Br", "I", "Cl", "Cl", false),
  new Question("Element Natrium?", "Na", "Br", "I", "Cl", "Na", false),
  new Question("Element Lithium?", "Fe", "Li", "I", "Cl", "Li", false),
  new Question("Element Zinn?", "Fe", "Br", "Sn", "Cl", "Sn", false),
  new Question("Element Zink?", "Fe", "Br", "I", "Zn", "Zn", false),
];

/*Global Variables*/

var questionNumberToShow = Math.floor(Math.random() * questionArray.length);
var score = 0;
var numberOfQuestionsAllreadyAsked = 0;
var scoringAllowed = true;

/*Elements got from HTML DOCUMENT*/

var questionTextHTML = document.getElementById("questionTextHTML");
var answer1HTML = document.getElementById("answer1HTML");
var answer2HTML = document.getElementById("answer2HTML");
var answer3HTML = document.getElementById("answer3HTML");
var answer4HTML = document.getElementById("answer4HTML");
var scoreHTML = document.getElementById("scoreHTML");
var noqaaHTML = document.getElementById("noqaaHTML");

/*Event Listeners*/

answer1HTML.addEventListener("click", checkAnswer);
answer2HTML.addEventListener("click", checkAnswer);
answer3HTML.addEventListener("click", checkAnswer);
answer4HTML.addEventListener("click", checkAnswer);

/* LOGIC */

/* Array shuffle function*/

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* Show Questions and Asnwers*/

function showNextQuestionAndAnswers() {
  while (questionArray[questionNumberToShow].allreadyAsked) {
    questionNumberToShow = Math.floor(Math.random() * questionArray.length);
  }

  questionTextHTML.innerText = questionArray[questionNumberToShow].questionText;
  questionArray[questionNumberToShow].answerArray = shuffle(
    questionArray[questionNumberToShow].answerArray
  );

  answer1HTML.innerText = questionArray[questionNumberToShow].answerArray[0];
  answer2HTML.innerText = questionArray[questionNumberToShow].answerArray[1];
  answer3HTML.innerText = questionArray[questionNumberToShow].answerArray[2];
  answer4HTML.innerText = questionArray[questionNumberToShow].answerArray[3];
  questionArray[questionNumberToShow].allreadyAsked = true;
}

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

/*INIT*/

showNextQuestionAndAnswers();
scoreHTML.innerText = score;
noqaaHTML.innerText = numberOfQuestionsAllreadyAsked;
