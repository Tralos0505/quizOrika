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

let numberofQuestionsToAsk = 5;

let questionNumberToShow = Math.floor(Math.random() * questionArray.length);
let numberOfQuestionsAllreadyAsked = 0;

let score = 0;
let maxScore = numberofQuestionsToAsk * 4;
var scoringAllowed = true;

let timePerQuestion = 60;
let totalTime = timePerQuestion * numberofQuestionsToAsk;
let timeSaved = 0;

/********************************************************************/
/********************************************************************/

/****************  Get elements from site **************************/
/*******************************************************************/

let questionTextHTML = document.getElementById("questionTextHTML");
let answer1HTML = document.getElementById("answer1HTML");
let answer2HTML = document.getElementById("answer2HTML");
let answer3HTML = document.getElementById("answer3HTML");
let answer4HTML = document.getElementById("answer4HTML");

let scoreHTML = document.getElementById("scoreHTML");
let maxScoreHTML = document.getElementById("maxScoreHTML");

let timeSavedHTML = document.getElementById("timeSavedHTML");
let totalTimeHTML = document.getElementById("totalTimeHTML");

let nextButton = document.getElementById("btn");

/*******************************************************************/
/*******************************************************************/

/************************ EVENTLISTENERS **************************/
/******************************************************************/

answer1HTML.addEventListener("click", checkAnswer);
answer2HTML.addEventListener("click", checkAnswer);
answer3HTML.addEventListener("click", checkAnswer);
answer4HTML.addEventListener("click", checkAnswer);

nextButton.addEventListener("click", nextQuestion);

/*******************************************************************/
/*******************************************************************/

/**************  Updates elements to the site *********************/
/******************************************************************/

/* Initialisation of the site*/

initGame();

/*set question and answer text*/

/*set score*/

scoreHTML.textContent = score;
maxScoreHTML.textContent = maxScore;

/*set timeleft total*/

timeSavedHTML.textContent = timeSaved;
totalTimeHTML.textContent = totalTime;

/*******************************************************************/
/*******************************************************************/

/************** Functions to use - Logic **************************/
/******************************************************************/

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

  /* Set allready asked to true because question was asked */

  questionArray[questionNumberToShow].allreadyAsked = true;
  console.log(questionArray[questionNumberToShow]);
}

/* Function to check if the answer is correct */

function checkAnswer() {
  if (this.innerText == questionArray[questionNumberToShow].correctAnswer) {
    console.log("YEAH");
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

/* Function called to init the game on site loading*/

function initGame() {
  nextQuestion();
}

/*******************************************************************/
/*******************************************************************/
