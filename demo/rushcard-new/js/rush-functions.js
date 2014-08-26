$(function() {

	// modal open and close functions
	$('.modal-open, .content-block').on('click', function(){
		$('.modal-overlay, .modal').fadeIn();
	});
	$('.modal-close').on('click', function(){
		$('.modal-overlay, .modal').fadeOut();
	});

	// initializing local scroll
	$.localScroll.defaults.axis = 'y';
	$.localScroll({
		offset: 0,
		hash: true
	});

	// initialize scroll spy
	$('body').scrollspy({target: '#navbar'});

});


$(window).scroll(function(e){
	if ($(this).scrollTop() > 152){
		$('.nav-sections').addClass('fixed');
		$('.viewport').addClass('scrolled');
	} else {
		$('.nav-sections').removeClass('fixed');
		$('.viewport').removeClass('scrolled');
	}
});

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