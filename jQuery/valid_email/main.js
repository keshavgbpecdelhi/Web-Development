$(document).ready(function(){
	
	
$('input[type=email]').on('keyup',function(){
	
	window.passed = 0;
	if($(this).val().indexOf('@')>-1){
		window.passed++;
	}
	
	if($(this).val().indexOf('.')>-1){
		window.passed++;
	}
	
	if(window.passed>1){
		$('.status').html('<span style="color:green;">VALID</span>');
	}else{
		$('.status').html('<span style="color:red;">INVALID</span>');
	}
})

$('textarea').focusin(function(){
	console.log("Focused in");
});


$('textarea').focusout(function(){
	console.log("Focused out");
});


});


