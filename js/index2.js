
var goCounter = 0;
var lives = 3;
var myMainHeader = document.getElementById('mainHeader');
var myStartButton = document.getElementById('startButton')
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.getElementById('guessPreview');
var mySubmitButton = document.getElementById('submitButton')
var myUndoButton = document.getElementById('undoButton')
var wordLibrary = ["spartan","javascript","champion","bootstrap","lexiscope"];
var wordLibrarySplit = wordLibrary.shift('');
var selectedWord = wordLibrarySplit.split('');
shuffleArray(selectedWord);
var guesses = [];
var guessesJoined = "";

if (goCounter === 0) {
for (var i = 0; i < wordLibrary.length; i++) {
    myStartButton.addEventListener('click', function(e) {
      myStartButton.innerHTML = "Game Started!";
      myStartButton.style.backgroundColor = "orange";
      for (var i = 0; i < selectedWord.length; i++) {
        myJumbledPanel[i].innerHTML = (selectedWord[i]);
      }
      });
    }
submitButton1();
goCounter++;
  } else if (goCounter === 1) {

  }



//word shuffle
function shuffleArray(array) {
    for (var i = selectedWord.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


//Start button and transfer letters into panels



//Guess preview with maximum length condition
for (var i = 0; i < selectedWord.length; i++) {
  myJumbledPanel[i].addEventListener('click', function(e) {
    if (guesses.length >= selectedWord.length && e.target.innerHTML != "") {
      alert("Maximum Letters")
    } else if (guesses.length <= selectedWord.length && e.target.innerHTML != "") {
      guessWrite(e, guesses);
      this.innerHTML = "";
    }
  });
}

//Reset button
myUndoButton.addEventListener('click', function(e) {
  for (var i = 0; i < selectedWord.length; i++) {
    myJumbledPanel[i].innerHTML = (selectedWord[i]);
    myGuessPreview.innerText = "";
  }
  guesses = [];
  guessesJoined = "";
});

//Submit and check for win
function submitButton1(){
mySubmitButton.addEventListener('click', function(e) {
  if (guessesJoined === wordLibrarySplit.toLowerCase()) {
    alert('You win');
    win = true;
  } else if (guessesJoined != selectedWord.toLowerCase) {
    lives = lives - 1;
    alert('Incorrect, Life lost! '+lives+' Lives left!');
  } else{
  alert('Not enough characters');
}
});
}

//write to preview box function and update guessJoined
function guessWrite(e, guesses) {
  t = document.createTextNode(e.target.innerHTML.toLowerCase());
  var para = document.createElement("row");
  guesses.push(t.textContent);
  guessesJoined = guesses.join('');
  para.appendChild(t);
  // console.log(guesses);
  // console.log(event);
  myGuessPreview.appendChild(para);
}

//wordSplit function
function wordSplit(wordLibrary){
  for (var i = 0; i < wordLibrary.length; i++) {
    a = [];
    a = wordLibrary[i];
    return a;
  }
}

//wordJoin function

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
