var timerEl = document.getElementById("timeleft");
//console.log(timerEl);
var startSection = document.querySelector(".start");
var questionSection = document.querySelector(".question");
var finishSection = document.querySelector(".finish");
var questionTitle = document.getElementById("questiontitle");
var resultOutput = document.getElementById("result");
var scoreOutput = document.getElementById("score");
var initialInput = document.getElementById("initial");

var currentQuestionIndex = 0;
var timeLeft = 76;
var score = 0;
// make it global for stop the timer later
var timeInterval;
var array = [];  // for storing the high scores

function countdown() {
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {

      if (timeLeft > 0){
        timeLeft--;
        timerEl.textContent = timeLeft;
      }
      if(timeLeft === 0) {
        timerEl.textContent = "0";
        // Stops execution of action at set interval
        clearInterval(timeInterval);
        // Calls function to end the quiz on times up
        endQuiz();
  
      }
  
    }, 1000);
  }

function displayQuestion(){
    var question = questions[currentQuestionIndex];
    questionTitle.textContent = question.question;
	const choices = document.getElementById("choices");
	for (let i = 0; i < choices.children.length; i++) {
		const choice = choices.children[i].querySelector(".choice");
		choice.textContent = question.choices[i];
		choice.addEventListener("click", handleChoice);
	}    

    // display the questions out
    startSection.setAttribute("style", "display:none;");
    questionSection.setAttribute("style", "display:inline;");
    finishSection.setAttribute("style", "display:none;");

}



// Listen for a click event on toggle switch
startSection.addEventListener("click", function() {
    // call the function
    countdown();

    // set the questions out:
    displayQuestion();

});


// Function to handle a choice click
function handleChoice(event) {
	// Get chosen answer
	var chosenAnswer = event.target.textContent;

    var question = questions[currentQuestionIndex];
	// Check if answer is correct
	if (chosenAnswer === question.answer) {
        score += 1;
		resultOutput.textContent = "Correct!";
	} else {
		// Subtract time and display feedback
		timeLeft -= 10;
		resultOutput.textContent = "Wrong!";
	}

	// Remove event listeners from choices buttons
	var choices = document.getElementById("choices");
	for (let i = 0; i < choices.children.length; i++) {
		const choice = choices.children[i].querySelector(".choice");
		choice.removeEventListener("click", handleChoice);
	}

	// Check if there are more questions
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		// Display next question
		displayQuestion();
	} else {
        // Quiz is over no more questions
		endQuiz();
	}

    if (timeLeft <= 0){
        endQuiz();            
    }

}

// Function to end the quiz
function endQuiz() {
	// Stop the timer
    clearInterval(timeInterval);

    // display the score out
    scoreOutput.textContent = score;

    // display the questions out
    startSection.setAttribute("style", "display:none;");
    questionSection.setAttribute("style", "display:none");
    finishSection.setAttribute("style", "display:inline;");

	// Add event listener to submit button
	document.getElementById("submit").addEventListener("click", submitScore);
}

// submit the score to local storage
function submitScore(){
    var input = initialInput.value + " - " + score;
    console.log(input)
    var data = localStorage.getItem("scores");
    if (data != null){
        array = JSON.parse(data);
    }
    array.push(input);
    //console.log(array)
    localStorage.setItem("scores", JSON.stringify(array));
    initialInput.value = ""; // clear up the initial inputted
}