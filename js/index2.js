console.log("Hello Word Jumble");

var myMainHeader = document.getElementById('mainHeader');
var myStartButton = document.getElementById('startButton')
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.querySelectorAll('#guessPreview');
var wordLibrary = [""];
var guesses = [];

var wordInLetters = ["W","O","R","D","J","U","M","B","L","E"];

myStartButton.addEventListener('click',function(e){
  myStartButton.innerHTML = "Game Started!";
  myStartButton.style.backgroundColor = "orange";
  for (var i = 0; i < wordInLetters.length; i++) {
    myJumbledPanel[i].innerHTML = (wordInLetters[i]);
  }
});

for (var i = 0; i < myJumbledPanel.length; i++) {
myJumbledPanel[i].addEventListener('click',function(e){
  // guesses.push(e.target.innerHTML);
  // for (var i = 0; i < e.target.length; i++) {
  // document.body.chilren[1].innerHTML = guesses;
  var para = document.createElement("P");                       // Create a <p> element
  t = [];
  t = document.createTextNode(e.target.innerHTML);      // Create a text node
  para.appendChild(t);                                          // Append the text to <p>
  document.getElementById("guessPreview").appendChild(para);
});
}



//
// for (var i = 0; i < myJumbledPanel.length; i++) {
//   myJumbledPanel[i].innerHTML = wordSplitter;
// }
//
//   console.dir(event.target);
// });
