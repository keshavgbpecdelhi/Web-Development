$(document).ready(function(){
	var event_ = document.getElementById('text');
	console.log("Calling using JS",event_);
	console.log("Calling using jQuery",$(event_));
	
	function using_js(){alert("Vanilla");}
	document.getElementById("pass").addEventListener("click",using_js)
	
	
	$('#pass').on('mousedown',function(){
		alert("Password: p@55w0rd");
	});
	
});


