/* Question Class and Array -- Defines the global Question Object*/
/******************************************************************/

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

/********************************************************************/
/********************************************************************/

/*********************  Global variables **************************/
/******************************************************************/

let quizTitle = "Chemie Quiz v.4 (with Timer)";

let numberofQuestionsToAsk = 3;

let questionNumberToShow = Math.floor(Math.random() * questionArray.length);
let numberOfQuestionsAllreadyAsked = 0;
let answerTrys = 4;

let score = 0;
let maxScore = numberofQuestionsToAsk * 4;

let timePerQuestion = 60;
let totalTime = timePerQuestion * numberofQuestionsToAsk;
let timeSaved = 0;
let stoppTimer = false;

let timeLeftPerQuestion = 5;

/********************************************************************/
/********************************************************************/

/****************  Get elements from site **************************/
/*******************************************************************/

let titleHTML = document.getElementById("title");
let questionNumberHTML = document.getElementById("questionNumberHTML");
let maxQuestionsHTML = document.getElementById("maxQuestionsHTML");

let questionTextHTML = document.getElementById("questionTextHTML");
let answer1HTML = document.getElementById("answer1HTML");
let answer2HTML = document.getElementById("answer2HTML");
let answer3HTML = document.getElementById("answer3HTML");
let answer4HTML = document.getElementById("answer4HTML");

let allAnswersHTML = document.getElementById("allAnswers");
let correctToShowHTML = document.getElementById("correctToShow");

let scoreHTML = document.getElementById("scoreHTML");
let maxScoreHTML = document.getElementById("maxScoreHTML");

let timeSavedHTML = document.getElementById("timeSavedHTML");
let totalTimeHTML = document.getElementById("totalTimeHTML");
let progressbarHTML = document.getElementById("progressBar");
let timeInSecondsHTML = document.getElementById("timeInSeconds");

let imageFeedbackHTML = document.getElementById("imageFeedback");

let nextButton = document.getElementById("btn");
let actualQuizHTML = document.getElementById("actualQuiz");
let momentScoreHTML = document.getElementById("momentScore");

/*******************************************************************/
/*******************************************************************/

/************************ EVENTLISTENERS **************************/
/******************************************************************/

answer1HTML.addEventListener("click", checkAnswer);
answer2HTML.addEventListener("click", checkAnswer);
answer3HTML.addEventListener("click", checkAnswer);
answer4HTML.addEventListener("click", checkAnswer);

nextButton.addEventListener("click", updateContent);

/*******************************************************************/
/*******************************************************************/

/**************  Updates elements to the site *********************/
/******************************************************************/

/* Initialisation of the site*/

initGame();

/*******************************************************************/
/*******************************************************************/

/************** Functions to use - Logic **************************/
/******************************************************************/

function updateContent() {
  if (numberofQuestionsToAsk > 0) {
    correctToShowHTML.classList.add("hidden");
    if (numberofQuestionsToAsk == 1) {
      btn.textContent = "Quiz beenden";
    }
    questionNumberHTML.textContent = numberOfQuestionsAllreadyAsked + 1;
    momentScoreHTML.textContent = "";
    stoppTimer = false;
    quizTimer();
    nextQuestion();
  } else {
    gameOver();
  }
}

/* Function called to show the next question (on button click and on first loading) */

function nextQuestion() {
  /* Chose new question until the question was not asked yet -- Crashes if no more available questions */

  while (questionArray[questionNumberToShow].allreadyAsked) {
    questionNumberToShow = Math.floor(Math.random() * questionArray.length);
  }

  /* Shuffle the answers of the chosen question */

  questionArray[questionNumberToShow].answerArray = shuffleArray(
    questionArray[questionNumberToShow].answerArray
  );

  /* Set the question in the site content */

  questionTextHTML.innerText = questionArray[questionNumberToShow].questionText;
  answer1HTML.innerText = questionArray[questionNumberToShow].answerArray[0];
  answer2HTML.innerText = questionArray[questionNumberToShow].answerArray[1];
  answer3HTML.innerText = questionArray[questionNumberToShow].answerArray[2];
  answer4HTML.innerText = questionArray[questionNumberToShow].answerArray[3];

  correctToShowHTML.innerText = `Leider ze spéit! Déi richteg Äntwert war ${questionArray[questionNumberToShow].correctAnswer}`;

  /* Set allready asked to true because question was asked */

  questionArray[questionNumberToShow].allreadyAsked = true;

  /* Remove colors and hidden from answers */

  answer1HTML.classList.remove("answerfalse");
  answer2HTML.classList.remove("answerfalse");
  answer3HTML.classList.remove("answerfalse");
  answer4HTML.classList.remove("answerfalse");
  answer1HTML.classList.remove("answercorrect");
  answer2HTML.classList.remove("answercorrect");
  answer3HTML.classList.remove("answercorrect");
  answer4HTML.classList.remove("answercorrect");
  allAnswersHTML.classList.remove("hidden");

  /* Set possible trys back to 4 */

  answerTrys = 4;

  /* Update questions to ask */
  numberOfQuestionsAllreadyAsked++;
  numberofQuestionsToAsk--;
  console.log(numberofQuestionsToAsk);

  /* Update image */

  imageFeedbackHTML.setAttribute("src", "questionMark.png");
}

/* Function to check if the answer is correct */

function checkAnswer() {
  if (this.innerText == questionArray[questionNumberToShow].correctAnswer) {
    imageFeedbackHTML.setAttribute("src", "yeah.jpg");
    this.classList.add("answercorrect");
    setScore(answerTrys);
    timeSaved += timeLeftPerQuestion;
    timeSavedHTML.textContent = timeSaved;
    stoppTimer = true;
  } else {
    imageFeedbackHTML.setAttribute("src", "fail.jpg");
    this.classList.add("answerfalse");
    answerTrys--;
  }
}

/* Function to shuffle randomly an array*/

function shuffleArray(array) {
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

/* Function to set the new score*/

function setScore(value) {
  switch (value) {
    case 4:
      momentScoreHTML.textContent = "+4";
      score += 4;
      break;
    case 3:
      momentScoreHTML.textContent = "+2";
      score += 2;
      break;
    case 2:
      momentScoreHTML.textContent = "+1";
      score += 1;
      break;
    case 1:
      momentScoreHTML.textContent = 0;
      score += 0;
      break;
    default:
      momentScoreHTML.textContent = 0;
      score += 0;
  }

  scoreHTML.textContent = score;
}

/* Function when the game is over */

function gameOver() {
  btn.classList.add("hidden");
  actualQuizHTML.classList.add("hidden");
  imageFeedbackHTML.setAttribute("src", "results.png");
}

/* Function called to init the game on site loading*/

function initGame() {
  /*set title*/

  titleHTML.textContent = quizTitle;

  /*set max questions number*/

  maxQuestionsHTML.textContent = numberofQuestionsToAsk;

  /*set score*/

  scoreHTML.textContent = score;
  maxScoreHTML.textContent = maxScore;

  /*set timeleft total*/

  timeSavedHTML.textContent = timeSaved;
  totalTimeHTML.textContent = totalTime;

  /*no image to start*/

  imageFeedbackHTML.setAttribute("src", "questionMark.png");
  updateContent();
}

/*TIMER*/

function quizTimer() {
  progressbarHTML.setAttribute("max", timePerQuestion);
  timeLeftPerQuestion = timePerQuestion;
  var downloadTimer = setInterval(function () {
    if (timeLeftPerQuestion <= 0) {
      allAnswersHTML.classList.add("hidden");
      correctToShowHTML.classList.remove("hidden");
      clearInterval(downloadTimer);
    }

    if (stoppTimer) {
      clearInterval(downloadTimer);
    }
    progressbarHTML.value = timePerQuestion - timeLeftPerQuestion;
    timeInSecondsHTML.textContent = timeLeftPerQuestion;
    timeLeftPerQuestion -= 1;
  }, 1000);
}

/*******************************************************************/
/*******************************************************************/
