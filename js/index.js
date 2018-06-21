var myMainHeader = document.getElementById('mainHeader');
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var myStartButton = document.getElementById('startButton');
var mySubmitButton = document.getElementById('submitButton');
var myResetButton = document.getElementById('resetButton');
var info = document.getElementById('info');
var turnCounter = 0;
var t = turnCounter;
var ticker = 0;
var submitValuesArray = [];
var wordLibrary = ["spartan", "richmond","animation", "cyberspace", "kickboxing", "wildebeast"];
var wordLibrarySplit = [];
selectedWord = "";
var guesses = [];
var guessesJoined = "";
var lives = 3;
var userScore = 0;
var roundScore = 0;
var userRoundScore = 0;
var totalScore = 0;
var userTicker = 0;
var scoreNames = [];
var scoreScores = [];
var timer = 0;
const allScores = {
  name: [""],
  score: [30],
};
//--------------- main variables ------------------\\


//Introduction start
//elementEditor (myStartButton, "Click for info", "2em", "initial", "color", "orange", "initial" );
//hidden buttons
elementEditor(mySubmitButton, ".", "0", "Raleway", "border", "0px", "none");
elementEditor(myResetButton, ".", "0", "Raleway", "border", "0px", "none");
elementEditor(myStartButton, "Start", "4em", "Raleway", "border", "0px", "inline");


//Intro How to play button
elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "inline");


//#How to play = When the letters are displayed on the screen you will have 30 seconds and three attempts to guess the correct word. If you win you will continue untill you have learnt all the words in the dictionary.
info.addEventListener('click', function(e) {
  //myGuessPreview.innerHTML = "When the letters are displayed in their panels you will have 30 seconds and three attempts to guess the correct word (made up from all the letters available). If you win you will continue untill you have learnt every word in the dictionary. Good Luck!!";
  elementEditor(myGuessPreview, "When the letters are displayed in their panels you will have 30 seconds <br> and three attempts to guess the correct word<br> (made up from all the letters available). If you win <br> you will continue untill you have learnt every word in the dictionary. <br><bold>Good Luck!!</bold><br>",
    "2em", "Raleway", "alignContent", "initial", "inline");
  elementEditor(myResetButton, ".", "0", "Raleway", "border", "0px", "none");
  elementEditor(myStartButton, "Start", "4em", "Raleway", "border", "0px", "inline");
  elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "inline-block");
  info.style.display = "none";
});


//Game start
gameInitial();


//Even round
if (wordLibrary.length == 0){
  win();
} else if (turnCounter % 2 == 0) {
  roundStart('click');

  //Odd round
} else if (turnCounter % 2 != 0) {
  roundStart();
}


//---------------- FUNCTIONS ----------------\\


//roundStart function
function roundStart(){
  myStartButton.addEventListener('click', function(e) {
    wordLibShuffle = [wordLibrary[ticker]];
    wordLibrarySplit = wordLibShuffle.shift();
    selectedWord = wordLibrarySplit.split('');
    shuffleLetters(selectedWord);
    elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "none"); //(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal)
    elementEditor(myGuessPreview, "", "5em", "Raleway", "alignContent", "initial", "inline");
    elementEditor(mySubmitButton, "Submit", "2em", "Raleway", "border", "0px", "inline");
    elementEditor(myResetButton, 'Reset', "2em", "initial", "backgroundColor", "orange", "inline");
    myStartButton.innerHTML = "Game Started ";
    myStartButton.style.backgroundColor = "orange";
    for (var i = 0; i < selectedWord.length; i++) {
      myJumbledPanel[i].innerHTML = (selectedWord[i]);
    }
    for (var i = 0; i < selectedWord.length; i++) {
      myJumbledPanel[i].addEventListener('click', function(e) {
        if (guesses.length > selectedWord.length) {
          alert("Maximum Letters")
        } else if (guesses.length <= selectedWord.length && e.target.innerHTML != "") {
          guessWrite(e, guesses);
          this.innerHTML = "";
        }
      });
    }

    });
  myResetButton.addEventListener('click', function(e) {
    resetter();
  });
  submitButton1();
}


//Custom document elements editor function
function elementEditor(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal) {
  myGuessPreview.innerHTML = message;
  myGuessPreview.style.fontSize = fontSize;
  myGuessPreview.style.fontFamily = fontStyle;
  myGuessPreview.style.something = someStyle;
  myGuessPreview.style.display = displayVal;
}


//Shuffle Array function
function shuffleLetters(array) {
  for (var i = selectedWord.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}


//Guesses write to div panel
function guessWrite(e, guesses) {
  t = document.createTextNode(e.target.innerHTML.toLowerCase());
  var para = document.createElement("row");
  guesses.push(t.textContent);
  guessesJoined = guesses.join('');
  para.appendChild(t);
  myGuessPreview.appendChild(para);
}


//win, lose or other condition via submit button
function submitButton1() {
  mySubmitButton.addEventListener('click', function(e) {
    if (guessesJoined === wordLibrarySplit.toLowerCase()) {
      win();
    } else if (guessesJoined != selectedWord.toLowerCase && guessesJoined.length == wordLibrarySplit.length && lives > 1) {
      lives--;
      alert('Incorrect, Life lost! ' + lives + ' Lives left!');
      resetter();
    } else if (guessesJoined.length < selectedWord.length && lives != 0) {
      alert('Not enough characters');
    } else {
      gameOver();
      lives = 3;
      userScore = 0;
      roundScore = 0;
      userRoundScore = 0;
      totalScore = 0;
    }
  });
}


//Reset button function
function resetter() {
  for (var i = 0; i < selectedWord.length; i++) {
    myJumbledPanel[i].innerHTML = (selectedWord[i]);
  }
  myGuessPreview.innerText = "";
  guesses.push([]);
  guessesJoined = "";
  guesses = [];

}


//function to jumble words and split
function wordJumble() {
  wordLibrarySplit = wordLibrary.shift();
  selectedWord = wordLibrarySplit.split('');
  shuffleLetters(selectedWord);
}


//gameOver function
function gameOver() {
  alert('Game over!');
  elementEditor(myStartButton, "New Game", "4em", "initial", "backgroundColor", "inerit", "inline");
  elementEditor(mySubmitButton, ".", "0", "Raleway", "border", "0px", "none");
  elementEditor(myResetButton, ".", "0", "Raleway", "border", "0px", "none");
  scoreNames[userTicker] = (prompt("Enter your name to save to leader board") + " " + userScore + "<br>");
  myGuessPreview.style.fontSize = "2em";
  myGuessPreview.innerHTML = "Scores: <br>" + scoreNames;
  myStartButton.addEventListener('click', function(e) {
    resetter();
    totalScore = 0;
  });
  userTicker++;
}


//elementEditor(myGuessPreview, "Welcome to Word Jumble!<br>", "1em", "Raleway", "alignContent", "initial", "inline");
function gameInitial(){
elementEditor(mySubmitButton, "Submit", "2em", "Raleway", "border", "0px", "none");
elementEditor(myStartButton, "Start", "4em", "Raleway", "border", "0px", "inline");
elementEditor(myResetButton, 'Reset', "2em", "Raleway", "backgroundColor", "orange", "none");
elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "inline-block"); //(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal)
}



//Win FUNCTION
function win(){
alert('You win');
userRoundScore = (lives * selectedWord.length);
totalScore = userScore + userRoundScore;
userScore = totalScore;
elementEditor(myGuessPreview, ("Your score is " + userScore), "5em", "Raleway", "alignContent", "initial", "inline");
elementEditor(myStartButton, "Click for next word", "4em", "initial", "border", "0px", "inline");
myStartButton.addEventListener('click', function(e) {
  turnCounter++;
  resetter();
  lives = 3;
});
ticker++;
}


//-------------------- MAIN VARIABLES --------------------------\\


//countedown timer
// setInterval(countdownTimer, 3000);

// var counter = 0;
// var timeleft = Math.floor(15);
// var timer = myStartButton.innerHTML;
// myStartButton.innerHTMl = "Game started " + (timeleft - counter);
//
// function countdownClock() {
//   counter++;
// myStartButton.innerHTMl = "Game started " + (timeleft - counter);
// if (counter == (timeleft +1)) {
//   counter = 0;
//   alert("Time's up");
//   clearInterval(counterInterval);
// }
// }
// var counterInterval = setInterval(countdownClock, 1000);


// var aTimer = 30;
// var gameTimer = setInterval(countdownTimer, 1000);
//
// function countdownTimer() {
//   if (aTimer <= 30) {
//     aTimer--;
//   } else if (aTimer === 0) {
//     alert("Game Over");
//     myStartButton.innerHTML = "Game Started " + aTimer;
//     clearInterval(t);
//   }
//
// }
