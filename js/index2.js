console.log("Hello Word Jumble");

var myMainHeader = document.getElementById('mainHeader');
var myStartButton = document.getElementById('startButton')
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPreview = document.querySelectorAll('#guessPreview');
var mySubmitButton = document.getElementById('submitButton')
var wordLibrary = ["WordJumble"];

var wordInLetters = ["W","O","R","D","J","U","M","B","L","E"];
var guesses = [];


myStartButton.addEventListener('click',function(e){
  myStartButton.innerHTML = "Game Started!";
  myStartButton.style.backgroundColor = "orange";
  for (var i = 0; i < wordInLetters.length; i++) {
    myJumbledPanel[i].innerHTML = (wordInLetters[i]);
  }
});

for (var i = 0; i < myJumbledPanel.length; i++) {
myJumbledPanel[i].addEventListener('click',function(e){
  if (guesses.length >= wordInLetters.length) {
    alert("Maximum Letters")
  }else{
  var para = document.createElement("row");
  t = document.createTextNode(e.target.innerText);
  para.appendChild(t);
  guesses.push(t);
  document.getElementById("guessPreview").appendChild(para);
}
});
}






//
// for (var i = 0; i < myJumbledPanel.length; i++) {
//   myJumbledPanel[i].innerHTML = wordSplitter;
// }
//
//   console.dir(event.target);
// });
