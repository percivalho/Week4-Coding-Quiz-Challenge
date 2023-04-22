var timerEl = document.getElementById("timeleft");
//console.log(timerEl);
var startSection = document.querySelector(".start");
var questionSection = document.querySelector(".question");
var finishSection = document.querySelector(".finish");
var questionTitle = document.getElementById("questiontitle");
var resultOutput = document.getElementById("result");

function countdown() {
    var timeLeft = 76;
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {

      if (timeLeft > 0){
        timeLeft--;
        timerEl.textContent = timeLeft;
      }
      if(timeLeft === 0) {
        timerEl.textContent = "";
        // Stops execution of action at set interval
        clearInterval(countdown);
        // Calls function to create and append image
        //displayMessage();
  
      }
  
    }, 1000);
  }


// Listen for a click event on toggle switch
startSection.addEventListener("click", function() {
    // call the function
    countdown();

    // set the questions out:
    var question = questions[0];
    questionTitle.textContent = question.question;
	const choices = document.getElementById("choices");
	for (let i = 0; i < choices.children.length; i++) {
		const choice = choices.children[i].querySelector(".choice");
		choice.textContent = question.choices[i];
		//choice.addEventListener("click", handleChoice);
	}    
    //console.log(resultOutput)
    //resultOutput.textContent = "                        ";

    // display the questions out
    startSection.setAttribute("style", "display:none;");
    questionSection.setAttribute("style", "display:inline;");
    finishSection.setAttribute("style", "display:none;");
    //console.log(finish);

});
