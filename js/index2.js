console.log("Hello Word Jumble");

var myMainHeader = document.getElementById('mainHeader');
var myStartButton = document.getElementById('startButton')
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var mySubmitButton = document.getElementById('submitButton')
var myUndoButton = document.getElementById('undoButton')
var wordLibrary = ["WordJumble"];
var wordInLetters = ["W", "O", "R", "D", "J", "U", "M", "B", "L", "E"];
var guesses = [];

//Start button and transfer letters into panels
myStartButton.addEventListener('click', function(e) {
  myStartButton.innerHTML = "Game Started!";
  myStartButton.style.backgroundColor = "orange";
  for (var i = 0; i < wordInLetters.length; i++) {
    myJumbledPanel[i].innerHTML = (wordInLetters[i]);
  }
});


//Guess preview with maximum length condition
for (var i = 0; i < myJumbledPanel.length; i++) {
  myJumbledPanel[i].addEventListener('click', function(e) {
    if (guesses.length >= wordInLetters.length && e.target.innerHTML != "") {
      alert("Maximum Letters")
    } else if (guesses.length <= wordInLetters.length && e.target.innerHTML != "") {
      guessWrite(e, guesses);
      this.innerHTML = "";
    }
  });
}

//write to preview box function and update guessArray
function guessWrite(e, guesses){
  t = document.createTextNode(e.target.innerText);
  var para = document.createElement("row");
  para.appendChild(t);
  guesses.push(t);
  console.log(guesses);
  console.log(event);
  document.getElementById("guessPreview").appendChild(para);
}

//Undo button
myUndoButton.addEventListener('click', function(e){
  for (var i = 0; i < wordInLetters.length; i++) {
    myJumbledPanel[i].innerHTML = (wordInLetters[i]);
    myGuessPreview.innerText = "";
  }
  guesses = [];
});




//
// for (var i = 0; i < myJumbledPanel.length; i++) {
//   myJumbledPanel[i].innerHTML = wordSplitter;
// }
//
//   console.dir(event.target);
// });
