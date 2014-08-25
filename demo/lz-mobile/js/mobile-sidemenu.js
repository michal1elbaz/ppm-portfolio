jQuery(document).ready(function($) {

	// loading the site menu into the proper div
	$('#sidemenu_container').load('/sidemenu.html');

	// click action to invoke the menu
	$(document).on('click', '#remote-content-menu, .menu-overlay', function(e){

		if (pageState === 'ready') {
			if ($('.viewport').hasClass('menu-open')) {
				pageState = 'transform';
				$('.menu-overlay').removeClass('active');
				$('.menu-overlay').removeAttr('style');
				$('.viewport').removeClass('menu-open');
				setTimeout(function(){
					$('.sidemenu-container').removeClass('active');
				},300);		
			} else {
				pageState = 'transform';
				$('.viewport').addClass('menu-open');
				$('.sidemenu-container').addClass('active');
				setTimeout(function(){
					var windowWidth = $(window).width();
					$('.menu-overlay').width(windowWidth - 280);
					$(".menu-overlay").addClass("active");
				}, 300);
			}			
		}	
		pageState = 'ready';

		e.preventDefault();
		
	});

});