var btn = document.getElementById("done");

function nameEnter(){
	var name = document.getElementsByClassName("its_inp"); 
	var output = document.getElementById("done_a");
   output.innerHTML = "Hi, " + name[0].value;
	}
	
btn.addEventListener("click", nameEnter);
