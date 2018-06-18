console.log("Hello Word Jumble");

var myMainHeader = document.getElementById('mainHeader');
var myJumbledPanel = document.querySelectorAll('.panel1');
var myGuessPanel = document.querySelectorAll('.panel2');
var wordTest = "hello";
var letters = [];
letters = wordTest.split();
for (var i = 0; i < wordTest.length; i++) {
  letters[i] = wordTest[i];
}

console.log(myMainHeader);
console.log(myGuessPanel);
console.log(myJumbledPanel);

for (var i = 0; i < letters.length; i++) {
  myJumbledPanel[i].addEventListener('mouseover', function(e) {
        this.innerHTML = letters[i];
  });
}

for (var i = 0; i < myGuessPanel.length; i++) {
  myGuessPanel[i].addEventListener('click', function(e, y) {
    var ans = prompt("what's your name");
    this.innerHTML = ans;
    console.log(ans);
  });
}
