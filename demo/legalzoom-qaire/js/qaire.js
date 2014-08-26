// fixed position for qaire-sidebar once page scrolls down
$(window).scroll(function(){
	if ($(this).scrollTop() > 270 && $('.content-sidebar').hasClass('email')){
		$('.qaire-sidebar').addClass('fixed');
	} else if ($(this).scrollTop() > 100 && !$('.content-sidebar').hasClass('email')) {
		$('.qaire-sidebar').addClass('fixed');
	} else {
		$('.qaire-sidebar').removeClass('fixed');
	}
});

// adds click action to the california compliance package text portion
$(document).on('click', '.california-compliance-package .text', function(c){
	if (!$(c.target).is('.expandable li a')) {
		$(this).parent().find('.checkbox input').click();
	}
});