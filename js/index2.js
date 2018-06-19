console.log("Hello Word Jumble");

var myMainHeader = document.getElementById('mainHeader');
var myStartButton = document.getElementById('startButton')
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var mySubmitButton = document.getElementById('submitButton')
var myUndoButton = document.getElementById('undoButton')
var wordLibrary = ["JumbleWord"];
var wordInLetters = wordSplit(wordLibrary);
var guesses = [];
// var wordInLetters = ["W", "O", "R", "D", "J", "U", "M", "B", "L", "E"];



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
function guessWrite(e, guesses) {
  t = document.createTextNode(e.target.innerHTML.toLowerCase());
  var para = document.createElement("row");
  guesses.push(t.textContent);
  para.appendChild(t);
  // console.log(guesses);
  // console.log(event);
  myGuessPreview.appendChild(para);
}

//Undo button
myUndoButton.addEventListener('click', function(e) {
  for (var i = 0; i < wordInLetters.length; i++) {
    myJumbledPanel[i].innerHTML = (wordInLetters[i]);
    myGuessPreview.innerText = "";
  }
  guesses = [];
});

//Submit and check for win
mySubmitButton.addEventListener('click', function(e) {
  if (guesses === wordInLetters) {
    alert('you win');
  } else {
    alert('not enough characters');
  }
});


var findOne = function(wordInLetters, guesses) {
  words2 = wordInLetters;
  guess2 = guesses;
  return words2.some(function(v) {
    return guess2.indexOf(v) >= 0;
  });
};


function wordSplit(wordLibrary){
  for (var i = 0; i < wordLibrary.length; i++) {
    a = [];
    a = wordLibrary[i];
    return a;
  }
}


//check for win
// function checkWin() {
//   for (var i = 0; i < wordInLetters.length; i++) {
//     var myGuesses = guesses[i];
//     var myWordInLetters = wordInLetters[i];
//     for (var j = 0; i < wordInLetters[i].length; i++) {
//       if (myWordInLetters[j] === myGuesses[j]) {
//         alert('you win');
//       }
//     }
//   }
// }

//
// for (var i = 0; i < myJumbledPanel.length; i++) {
//   myJumbledPanel[i].innerHTML = wordSplitter;
// }
//
//   console.dir(event.target);
// });
