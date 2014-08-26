$(function() {

	// modal open and close functions
	$('.modal-open, .content-block').on('click', function(){
		$('.modal-overlay, .modal').fadeIn();
	});
	$('.modal-close').on('click', function(){
		$('.modal-overlay, .modal').fadeOut();
	});

	// initializing local scroll
	$.localScroll.defaults.axis = 'x';
	$.localScroll({
		hash: true,
		target: '#content'
	});

	// highlighting the navbar
	$('#navbar .nav li a').on('click',function(){
		$('#navbar .nav li').removeClass('active');
		$(this).parent().addClass('active');
	});

});


//$(window).scroll(function(e){
//	if ($(this).scrollTop() > 152){
//		$('.nav-sections').addClass('fixed');
//		$('.viewport').addClass('scrolled');
//	} else {
//		$('.nav-sections').removeClass('fixed');
//		$('.viewport').removeClass('scrolled');
//	}
//});

$.fn.scrollBottom = function() {
  return $(document).height() - this.scrollTop() - this.height();
};

$(window).scroll(function(e){
	if ($(window).scrollBottom() < 464) {
		$('.footer-main').removeClass('fixed');
	} else {
		$('.footer-main').addClass('fixed');
	}
});