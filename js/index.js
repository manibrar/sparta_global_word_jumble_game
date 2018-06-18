console.log("We're beginning!!");

var list = document.getElementsByTagName('li');
var starting = document.getElementById('startbutton');
var jumbo = document.getElementsByClassName('jumbotron');
var subheading = document.getElementsByTagName('h2');
var clickCounter = 0;
var yArray = [];
var a = [];
var b = [];
var c = [];
var d = [];

console.log(list);
console.log(starting);


details("name", "Manvir Brar", "age", "29", 'click');

writer("#fafafa",["hello " + name, "How's life as a year old?"],list,'scroll');
writer("teal",["<h1>Shhhh</h1>"],jumbo,'click');
writer("teal",["<h1>Word Jumble</h1>"],jumbo,'mouseout');



function details(avariable, bvariable, cvariable, dvariable, event){
  avariable = bvariable;
  cvariable = dvariable;
}

function writer(w, x, y, event) {
  this.addEventListener(event, function(event) {
    i = y.length
      yArray.push(this);
      for (var i = 0; i < y.length; i++) {
        y[i].innerHTML = x[i];
        y[i].style.backgroundColor = w;
      }
  });
  clickCounter++;
};
