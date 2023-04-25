var scoresList = document.getElementById('scores');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var scores = [];

function getHighScores(){
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores != null){
        scores = storedScores;
    }    
    console.log(scores);
    for (var i=0; i< scores.length; i++){
        var score = scores[i];
        var li = document.createElement("li");
        var count = i+1;
        li.classList.add('score');
        li.textContent = count + ". " + score;
        scoresList.appendChild(li);
    }
}

function clearStorage(){
    localStorage.removeItem("scores");
    // remove Childs
    li = document.querySelectorAll('li');
    console.log(li);
    for (var i=0; i< li.length; i++){
        scoresList.removeChild(li[i]);
    }
    scores = [];
    getHighScores();
}

function backPage() {
    window.location.href = './index.html'; 
}
  

getHighScores();
back.addEventListener("click", backPage);
clear.addEventListener("click", clearStorage);


