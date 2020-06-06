$(document).ready(function(){
	var event = document.getElementById('text');
	$('[data-trigger="dropdown"]').on('mouseenter',function(){
		var k = $(this).parent().find('.submenu');
		k.addClass('active');
		
		$('profile-menu').on('mouseleave',function(){
			k.removeClass('active');
		})
	})
	
});
