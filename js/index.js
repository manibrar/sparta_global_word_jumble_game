var myMainHeader = document.getElementById('mainHeader');
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var myStartButton = document.getElementById('startButton');
var mySubmitButton = document.getElementById('submitButton');
var myResetButton = document.getElementById('resetButton');
var myShuffleButton = document.getElementById('shuffleButton');
var myInfo = document.getElementById('info');
var myTimerBox = document.getElementById('timerBox');
var myWelcomeBox = document.getElementById('introWelcome');
var myMessageDisplay = document.getElementById('messageDisplay');
var myUserName = document.getElementById('userName');
var turnCounter = 0;
var t = turnCounter;
var ticker = 0;
var submitValuesArray = [];
var wordLibrary = ["spartan", "richmond", "animation", "cyberspace", "kickboxing", "wildebeast"];
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
var atimer = 30;
const allScores = {
  name: [""],
  score: [30],
};
//--------------- main variables ------------------\\


//#How to play = When the letters are displayed on the screen you will have 30 seconds and three attempts to guess the correct word. If you win you will continue untill you have learnt all the words in the dictionary.
myInfo.addEventListener('click', function(e) {
  myWelcomeBox.style.display = "block";
  myInfo.style.display = "none";
  myMessageDisplay.style.display = "none";
});


//Game start - home screen - item configuration
gameInitial();


//Even round
  if (wordLibrary.length == 0) {
    win();
  } else if (turnCounter % 2 == 0) {
  atimer = -1;
    roundStart('click');
//Odd round
  } else if (turnCounter % 2 != 0) {
    atimer = -1;
    roundStart('click');
  }


//---------------- FUNCTIONS ----------------\\


//elementEditor(myGuessPreview, "Welcome to Word Jumble!<br>", "1em", "Raleway", "alignContent", "initial", "inline");
function gameInitial() {
  elementEditor(mySubmitButton, "Submit", "3em", "Raleway", "border", "0px", "none");
  elementEditor(myStartButton, "Start", "3em", "Raleway", "border", "0px", "inline");
  elementEditor(myResetButton, 'Reset', "3em", "Raleway", "backgroundColor", "orange", "none");
  elementEditor(myInfo, 'How to play', "2.5em", "Raleway", "innerHTML", 'onclick="information"', "inline-block"); //(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal)
  elementEditor(myShuffleButton, ".", "0", "Raleway", "border", "0px", "none");
  myTimerBox.style.display = "none";
  myMessageDisplay.style.display = "none";
}

//roundStart function
function roundStart() {
  atimer = -1;

  myStartButton.addEventListener('click', function(e) {
    if (atimer === -1) {
      atimer = 30;
      userName = myUserName.value;
    }
    myUserName.style.display = "none";
    guesses = [];
    myGuessPreview.innerHTML = "";
    wordLibShuffle = [wordLibrary[ticker]];
    wordLibrarySplit = wordLibShuffle.shift();
    selectedWord = wordLibrarySplit.split('');
    shuffleLetters(selectedWord);
    myWelcomeBox.style.display = "none";
    myInfo.style.display = "none";
    myStartButton.style.display = "inline"; myStartButton.innerHTML = "Shuffle";
    //elementEditor(myGuessPreview, "", "5em", "Raleway", "alignContent", "initial", "inline");
    elementEditor(mySubmitButton, "Submit", "3em", "Raleway", "border", "0px", "inline");
    elementEditor(myResetButton, 'Reset', "3em", "Raleway", "backgroundColor", "orange", "inline");
    elementEditor(myTimerBox, atimer, "3em", "initial", "textcolor", "orange", "inline");

    for (var i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] != "") {
        myJumbledPanel[i].innerHTML = (selectedWord[i]);
      }
    }
    for (var i = 0; i < myJumbledPanel.length; i++) {
      if (myJumbledPanel[i].innerHTML == "") {
        myJumbledPanel[i].style.display = "none";
      }
    }
    for (var i = 0; i < selectedWord.length; i++) {
      myJumbledPanel[i].addEventListener('click', function(e) {
        if (guesses.length > selectedWord.length) {
          elementEditor(myMessageDisplay, "Maximum Letters", "2em", "initial", "style.backgroundColor", "red", "inline");("Maximum Letters")
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
  setIt();
}

//Round timer function
function setIt() {
  setInterval(function() {
    if (atimer <= 30 && atimer >= 22) {
      atimer--;
      myTimerBox.innerHTML = atimer;
      myTimerBox.style.backgroundColor = "green";
    } else if (atimer <= 22 && atimer >= 12) {
      atimer--;
      myTimerBox.innerHTML = atimer;
      myTimerBox.style.backgroundColor = "orange";
    } else if (atimer <= 22 && atimer >= 1) {
      atimer--;
      myTimerBox.innerHTML = atimer;
      myTimerBox.style.backgroundColor = "red";
    } else if (0 == atimer) {
      resetter();
      newBoard();
      lives--;
      elementEditor(myMessageDisplay, "<small>Time's up.</small> Lose a life!", "2em", "initial", "border", "0px", "inline");
      lifeMessage = ('Times up,<br>' + lives + ' Lives left!');
      elementEditor(myGuessPreview, lifeMessage, "3em", "Raleway", "border", "0px", "inline");
      atimer = -1;
      myStartButton.addEventListener('click',function(e){
      elementEditor(myGuessPreview, "", "3em", "Raleway", "border", "0px", "inline");
      });
    }
  }, 31000 / 30);
  clearInterval();
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
      incorrectGuess = ('Incorrect, Life lost!\n' + lives + ' Lives left!');
      elementEditor(myMessageDisplay, incorrectGuess, "3em", "Raleway", "border", "0px", "inline");
      resetter();
      newBoard();
    } else if (guessesJoined.length < selectedWord.length && lives != 0) {
      notChar = ('Not enough characters');
      elementEditor(myMessageDisplay, notChar, "3em", "Raleway", "border", "0px", "inline");
      resetter();
      newBoard();
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


//new board after times up
function newBoard(){
elementEditor(myStartButton, "Try again", "3em", "Raleway", "backgroundColor", "inerit", "inline");
mySubmitButton.style.display = "none";
myResetButton.style.display = "none";
myTimerBox.style.display = "none";
myStartButton.addEventListener('click',function(e){
  myMessageDisplay.style.display = "none";
  elementEditor(myGuessPreview, "", "3em", "Raleway", "border", "0px", "inline");
});
atimer = -1;
}


//function to jumble words and split
function wordJumble() {
  wordLibrarySplit = wordLibrary.shift();
  selectedWord = wordLibrarySplit.split('');
  shuffleLetters(selectedWord);
}


//gameOver function
function gameOver() {
  alertGameOver = ('Game over!');
  newBoard();
  elementEditor(myMessageDisplay, alertGameOver, "3em", "initial", "backgroundColor", "red", "inline");
  myStartButton.innerHTML = "New Game";
  myUserName.style.display = "inline";
  userName = myUserName.value;
  scoreNames[userTicker] = userScore + " " + userName + "<br>";
  scoreNames2 = scoreNames.sort(sortNumber);
  myGuessPreview.innerHTML = "Top scores:<br>" + scoreNames2;
  myStartButton.addEventListener('click', function(e) {
  resetter();
  });
  userTicker++;
  atimer = -1;
  userScore = 0;
  totalScore = 0;
  roundScore = 0;
}

//Win FUNCTION
function win() {
  atimer = -1;
  userRoundScore = (lives * selectedWord.length);
  totalScore = userScore + userRoundScore;
  userScore = totalScore;
  winningMessage = ("<small>That's correct the word is:</small><br>" + "<bold>" + wordLibrarySplit + "</bold>");
  elementEditor(myGuessPreview, ("Your score is " + userScore), "3em", "Raleway", "alignContent", "initial", "inline");
  elementEditor(myStartButton, "Click for next word", "3em", "initial", "border", "0px", "inline");
  elementEditor(myMessageDisplay, winningMessage, "3em", "initial", "border", "0px", "inline");
  myTimerBox.style.display = "none";
  myResetButton.style.display = "none";
  mySubmitButton.style.display = "none";
  myStartButton.addEventListener('click', function(e) {
    turnCounter++;
    resetter();
    myMessageDisplay.style.display = "none";
  });
  ticker++;
  atimer = -1;
  lives = 3;
}

//num array sort FUNCTION
function sortNumber(a,b) {
    return a<b;
}


// function roundTime() {
//   if (atimer <= 30) {
//     atimer--;
//     roundTime = atimer;
//     myTimerBox.innerHTML = atimer;
//     return;
//   } else if (atimer<= 20) {
//     alert('Times up! \n Game over!');
//     resetter();
//   }
// }


//-------------------- MAIN VARIABLES --------------------------\\


// countdown timer




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
