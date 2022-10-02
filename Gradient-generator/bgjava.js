var css=document.querySelector("#HEXCODE");
var color1=document.querySelector("#COLOR1");
var color2=document.querySelector("#COLOR2")
var body=document.getElementById("BG");

function colorpick(){
	body.style.background=
	"linear-gradient(to right, "
	+color1.value
	+","
	+color2.value
	+")";
	css.textContent=body.style.background+";";
}

color1.addEventListener("input",colorpick);
color2.addEventListener("input",colorpick);
css.addEventListener("click", copy);

function copy() {
  // Get the text field
  var copyText = document.getElementById("HEXCODE");

 
   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.textContent);

  // Alert the copied text
  alert("Copied the text: " + copyText.textContent);
}