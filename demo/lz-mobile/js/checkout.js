jQuery(document).ready(function($) {

	// opening reviewable order details
	$(document).on('click', '.items .detail', function(){
		if ($(this).hasClass('active')) {
			$(this).find('.icon').removeClass('icon-caret-down').addClass('icon-caret-right');
			$(this).find('ul').slideUp(300);
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			$(this).find('.icon').removeClass('icon-caret-right').addClass('icon-caret-down');
			$(this).find('ul').slideDown(300);
		}
	});

	// opening shipping details
	$(document).on('click', '.shipping .detail a', function(){
		if ($(this).parent().hasClass('active')) {
			$(this).parent().find('.icon').removeClass('icon-caret-down').addClass('icon-caret-right');
			$(this).parent().find('ul').slideUp(300);
			$(this).parent().removeClass('active');
		} else {
			$(this).parent().addClass('active');
			$(this).parent().find('.icon').removeClass('icon-caret-right').addClass('icon-caret-down');
			$(this).parent().find('ul').slideDown(300);
		}
	});

	// opening shipping details
	$(document).on('click', '.change .link-change-shipping', function(e){
		if ($('.detail.shipping').hasClass('active')) {
			$('.detail.shipping .icon').removeClass('icon-caret-down').addClass('icon-caret-right');
			$('.detail.shipping ul').slideUp(300);
			$('.detail.shipping').removeClass('active');
		} else {
			$('.detail.shipping').addClass('active');
			$('.detail.shipping .icon').removeClass('icon-caret-right').addClass('icon-caret-down');
			$('.detail.shipping ul').slideDown(300);
		}
		e.preventDefault();
	});

	// closing tooltips on window resize
	$(window).resize(function(){
		$('.tooltip').removeClass('active');
	});

});