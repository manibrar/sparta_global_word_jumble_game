var myMainHeader = document.getElementById('mainHeader');
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var myStartButton = document.getElementById('startButton');
var mySubmitButton = document.getElementById('submitButton');
var myResetButton = document.getElementById('resetButton');
var myShuffleButton = document.getElementById('shuffleButton');
var info = document.getElementById('info');
var myTimerBox = document.getElementById('timerBox');
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
info.addEventListener('click', function(e) {
  elementEditor(myGuessPreview, "<h2>Welcome to Word jumble!</h2>The aim of the game is to guess the jumbled word using all<br> the letters before the time runs out. To make a guess click the letters<br>in the panels to enter the word into guess preview. You can press the shuffle<br>button to rearrange the letters and reset to start again. If you guess the word<br>correctly you will advance to the next level, when your go is over you can<br>enter your name and<br>challenge your friends to beat your score.", "1.5em", "Raleway", "alignContent", "initial", "inline");
  info.style.display = "none";
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
  elementEditor(mySubmitButton, "Submit", "2em", "Raleway", "border", "0px", "none");
  elementEditor(myStartButton, "Start", "4em", "Raleway", "border", "0px", "inline");
  elementEditor(myResetButton, 'Reset', "2em", "Raleway", "backgroundColor", "orange", "none");
  elementEditor(info, 'How to play', "3em", "Raleway", "innerHTML", 'onclick="information"', "inline-block"); //(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal)
  elementEditor(myShuffleButton, ".", "0", "Raleway", "border", "0px", "none");
  myTimerBox.style.display = "none";
}





//roundStart function
function roundStart() {
  atimer = -1;
  myStartButton.addEventListener('click', function(e) {
    if (atimer === -1) {
      atimer = 30;
    }
    guesses = [];
    aGo = 1;
    wordLibShuffle = [wordLibrary[ticker]];
    wordLibrarySplit = wordLibShuffle.shift();
    selectedWord = wordLibrarySplit.split('');
    shuffleLetters(selectedWord);
    elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "none"); //(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal)
    elementEditor(myGuessPreview, "", "5em", "Raleway", "alignContent", "initial", "inline");
    elementEditor(mySubmitButton, "Submit", "2em", "Raleway", "border", "0px", "inline");
    elementEditor(myResetButton, 'Reset', "2em", "Raleway", "backgroundColor", "orange", "inline");
    elementEditor(myTimerBox, atimer, "3em", "initial", "textcolor", "orange", "inline");
    elementEditor(myStartButton, "Shuffle", "3em", "Raleway", "backgroundColor", "orange", "inline");
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
  setIt();
}

function setIt() {
  setInterval(function() {
    if (atimer <= 30 && atimer >= 11 && (aGo = true)) {
      atimer--;
      myTimerBox.innerHTML = atimer;
      myTimerBox.style.backgroundColor = "orange";
      //console.log(atimer);
    }
    if (atimer < 10 && atimer >= 1 && (aGo = true)) {
      atimer--;
      myTimerBox.innerHTML = atimer;
      myTimerBox.style.backgroundColor = "red";
      //console.log(atimer);
    } else if (0 == atimer) {
      alert('Times up, You lose');
      atimer = -1;
      gameOver();
      aGo = 0;
    }
  }, 30000 / 30);
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
      alert('Incorrect, Life lost!\n' + lives + ' Lives left!');
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
  scoreNames = scoreNames.sort();
  myGuessPreview.innerHTML = "Scores: <br>" + scoreNames;
  myStartButton.addEventListener('click', function(e) {
    for (var i = 0; i < selectedWord.length; i++) {
      myJumbledPanel[i].innerHTML = (selectedWord[i]);

      myGuessPreview.innerText = "";
      guesses.push([]);
      guessesJoined = "";
      guesses = [];
      totalScore = 0;
    }
  });
  userTicker++;
  atimer = -1;

}

//Win FUNCTION
function win() {
  atimer = -1;
  alert('Thats correct the word is ' + wordLibrarySplit);
  userRoundScore = (lives * selectedWord.length);
  totalScore = userScore + userRoundScore;
  userScore = totalScore;
  elementEditor(myGuessPreview, ("Your score is " + userScore), "5em", "Raleway", "alignContent", "initial", "inline");
  elementEditor(myStartButton, "Click for next word", "3em", "initial", "border", "0px", "inline");
  myStartButton.addEventListener('click', function(e) {
    turnCounter++;
    resetter();
    lives = 3;
  });
  ticker++;
  atimer = -1;
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
