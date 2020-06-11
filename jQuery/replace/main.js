$(document).ready(function(){

$('#add, #remove, #replace').on('click',function(e){
	e.preventDefault();
	var el = $(e.currentTarget);
	var action = el.attr('id');
	var content = $('.text').val();

	if(action=="prepend"){
		console.log("Prepending ",content,"...");
		$('#main').prepend(content);
		
	}else if (action=="append"){
		console.log("Appending ",content,"...");
		$('#main').append(content);
		
	}else if (action=="replace"){
		console.log("Replacing..");
		$('#main').html(content);	
		
	}
