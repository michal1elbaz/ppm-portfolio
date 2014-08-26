(function($, window) {

	$(function(){
		// Function for opening card detail links
		$('.view-detail .closed').live('click',function(e){
			$(this).parent().parent().parent().find('.detail-links').slideDown();
			$(this).removeClass('closed').addClass('open').html('<span class=\"float-left\"></span>Hide Details<span class=\"float-right\"></span>');
			e.preventDefault();
		});
		
		$('.view-detail .open').live('click',function(e){
			$(this).parent().parent().parent().find('.detail-links').slideUp();
			$(this).removeClass('open').addClass('closed').html('<span class=\"float-left\"></span>View Details<span class=\"float-right\"></span>');
			e.preventDefault();
		});
		
		// Function for changing the add & remove account link icon
		$('.account-add').hover(
			function(){
				$('.accounts-add-remove .icon').addClass('plus');
			},
			function(){
				$('.accounts-add-remove .icon').removeClass('plus');
			}
		);
		
		$('.account-remove').hover(
			function(){
				$('.accounts-add-remove .icon').addClass('minus');
			},
			function(){
				$('.accounts-add-remove .icon').removeClass('minus');
			}
		);	
	});

	// detect window scroll and change top nav styles accordingly
	$(window).scroll(function(e){ 
		if ($(this).scrollTop() > 38){ 
			$('.nav-site').addClass('fixed');
			$('.header-site').addClass('fixed'); 
		} else {
			$('.nav-site').removeClass('fixed');
			$('.header-site').removeClass('fixed');
		}
	});

} (jQuery, window));






