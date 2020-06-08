$(document).ready(function(){

$(document).on('mousedown',function(event){
	window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
	if(event.which==3){
		console.log(event.pageY,event.pageX);
		
		$('#context').css({
			top: event.pageY,
			left: event.pageX
		});
		
		$('#context').fadeIn();
		return false;
	}
	$('#context').fadeOut();
});

});


