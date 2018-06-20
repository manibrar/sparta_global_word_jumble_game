var myMainHeader = document.getElementById('mainHeader');
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var myStartButton = document.getElementById('startButton');
var mySubmitButton = document.getElementById('submitButton');
var myResetButton = document.getElementById('resetButton');
var info = document.getElementById('info');
var turnCounter = 0;
var submitValuesArray = [];
var wordLibrary = ["magical","javascript","champion","bootstrap","lexiscope"];
var wordLibrarySplit = wordLibrary.shift('');
var selectedWord = wordLibrarySplit.split('');
var guesses = [];
var guessesJoined = "";
shuffleArray(selectedWord);


//Introduction start
//elementEditor (myStartButton, "Click for info", "2em", "initial", "color", "orange", "initial" );
//hide buttons
elementEditor(mySubmitButton, ".", "0", "initial", "border", "0px", "none");
elementEditor(myResetButton, ".", "0", "initial", "border", "0px", "none");
elementEditor(myStartButton, "Start", "4em", "initial", "border", "0px", "inline");

//Intro How to play button
elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "inline");

//#How to play = When the letters are displayed on the screen you will have 30 seconds and three attempts to guess the correct word. If you win you will continue untill you have learnt all the words in the dictionary.
info.addEventListener('click',function(e){
  //myGuessPreview.innerHTML = "When the letters are displayed in their panels you will have 30 seconds and three attempts to guess the correct word (made up from all the letters available). If you win you will continue untill you have learnt every word in the dictionary. Good Luck!!";
  elementEditor(myGuessPreview, "When the letters are displayed in their panels you will have 30 seconds <br> and three attempts to guess the correct word<br> (made up from all the letters available).If you win <br> you will continue untill you have learnt every word in the dictionary. <br><bold>Good Luck!!</bold>",
  "2em", "Raleway", "alignContent", "initial", "inline");
  elementEditor(myResetButton, ".", "0", "initial", "border", "0px", "none");
  elementEditor(myStartButton, "Start", "4em", "initial", "border", "0px", "inline");
  elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "none");
});

//Game start

myStartButton.addEventListener('click',function(e){
elementEditor(myGuessPreview, "Welcome to Word Jumble!<br>", "1em", "Raleway", "alignContent", "initial", "inline");
elementEditor(mySubmitButton, "Submit", "2em", "initial", "border", "0px", "inline");
elementEditor(myStartButton, "Start", "4em", "initial", "border", "0px", "inline");
elementEditor(myResetButton, 'Reset', "2em", "initial", "backgroundColor", "orange" , "inline");
elementEditor(info, 'How to play', "2em", "Raleway", "innerHTML", 'onclick="information"', "none");

turnCounter++;

switch (turnCounter) {
case 1:
  //First round
  for (var i = 0; i < wordLibrary.length; i++) {
    myStartButton.innerHTML = "Game Started!";
    myStartButton.style.backgroundColor = "orange";
  for (var i = 0; i < selectedWord.length; i++) {
    myJumbledPanel[i].innerHTML = (selectedWord[i]);
    }
  }
break;
default:
    }
});


//Custom document elements editor function
function elementEditor(myGuessPreview, message, fontSize, fontStyle, something, someStyle, displayVal) {
  myGuessPreview.innerHTML = message;
  myGuessPreview.style.fontSize = fontSize;
  myGuessPreview.style.fontFamily = fontStyle;
  myGuessPreview.style.something = someStyle;
  myGuessPreview.style.display = displayVal;
}

//Shuffle Array function
function shuffleArray(array) {
  for (var i = selectedWord.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
}
