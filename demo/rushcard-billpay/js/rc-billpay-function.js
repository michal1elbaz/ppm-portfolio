(function($, window) {

	$(function(){
		
		// dismiss new message box
		$('.dismiss a').live('click', function(e){
			$('.content-whats-new').slideUp(300);
			e.preventDefault();
		});

		// payment source selection
		$('.payment-cards').live('click',function(e){
			$('.payment-source li').removeClass('selected');
			$(this).parent().addClass('selected');
			e.preventDefault();
		});
		
		// autocomplete search field mock
		var availablePayees = [
			"Apple",
			"Best Buy",
			"Comcast Cable TV",
			"Comcast Internet",
			"Pacific Gas & Electric",
			"Xfinity"
		];
		$('#search').autocomplete({
			source: availablePayees
		});
		
		// jquery datepicker for statement filters
		
		$( ".date-start" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 3,
			onSelect: function( selectedDate ) {
				$( ".date-end" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( ".date-end" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 3,
			onSelect: function( selectedDate ) {
				$( ".date-start" ).datepicker( "option", "maxDate", selectedDate );
			}
		});

		// jquery datepicker for payment scheduling
		$('.payment-schedule-datepicker').datepicker({
			minDate: "+1"
		});
				
		// back link
		$('.back-link a').live('click', function(e){
			$('.payment-selection').hide();
			$('.payee-selection').fadeIn(800);
			e.preventDefault();
		});
		
		// payment schedule selection
		$('.payment-schedule .radio').live('click', function(e) {
			$('.payment-schedule li').removeClass('active');
			$(this).parent().addClass('active', 200);
		});

		// payment memo toggle
		$('.memo-link').live('click', function(e) {
			$(this).toggleClass('active');
			$('.memo').toggleClass('active');
		});

		// payment submit
		$('.button-submit .button').live('click', function(e){
			$('.payment-selection').hide();
			$('.payment-confirmation').fadeIn(800);
			e.preventDefault();
		});

		// statement table row colors
		$('.statement-table > ul:nth-child(even)').addClass('even');
		
		// statement table detail toggle
		$('.hasdetail .list > li:not(.details)').live('click',function(){
			if ($(this).parent().find('.details').hasClass('active')) {
				$('.viewdetail span').removeClass('selected');
				$(this).parent().find('.details .display, .details .editable').slideUp(500, function(){
					$(this).parent().removeClass('active');
				});
			} else {
				$('.viewdetail span').removeClass('selected');
				$(this).parent().find('.viewdetail span').addClass('selected');
				$('.statement-table .details .display, .statement-table .details .editable').slideUp(500);
				$('.statement-table .details').removeClass('active');
				$(this).parent().find('.details .display').slideDown(500, function(){
					$(this).parent().addClass('active');
				});
			}
		});


		// statement sort functions
		$('.table-heading.sortable li').live('click', function(e){
			if ($(this).find('.sort').hasClass('descending')) {
				$(this).find('.sort').removeClass('descending').addClass('ascending');
			} else if ($(this).find('.sort').hasClass('ascending')) {
				$(this).find('.sort').removeClass('ascending').addClass('descending');
			} else {
				$('.table-heading.sortable li a .sort').removeClass('ascending').removeClass('descending');
				$(this).find('.sort').addClass('descending');
			}
		});

		// statement filter advanced and simple toggle
		$('.advanced-filters').live('click', function(e){
			$('.statement-filters.simple').hide();
			$('.statement-filters.advanced').show();
			e.preventDefault();
		});

		$('.simple-filters').live('click', function(e){
			$('.statement-filters.advanced').hide();
			$('.statement-filters.simple').show();
			e.preventDefault();
		});
				
		// payee edit buttons
		$('.details .display .button.edit').live('click',function(){
			$(this).parent().parent().hide();
			$(this).parent().parent().parent().find('.editable').show();
		});
		
		$('.details .editable .button.save, .details .editable .button.cancel').live('click',function(){
			$(this).parent().parent().hide();
			$(this).parent().parent().parent().find('.display').show();
		});
		
	});


} (jQuery, window));

// function for opening panels
function paymentPanelReset() {
	$('.payee-selection').show();
	$('.payee-list').hide();
	$('.payee-info').hide();
	$('.auto-complete-search').show();
	$('.payment-selection').hide();
	$('.payment-confirmation').hide();
}

function payeePanelReset() {
	$('.payee-selection').show();
	$('.payee-list').hide();
	$('.payee-info').hide();
	$('.auto-complete-search').show();
	$('.search-results').hide();
}

function panelClose(id) {
	$('.paneloverlay').fadeOut(100);
	$('#' + id).slideUp(500);
}

function openPanel(id) {
	$('html, body').animate({scrollTop: 0}, 500);
	$('.paneloverlay').fadeIn(500);
	$('#' + id).slideDown(500);
}

// function for payee selection process
function payeeSearchSubmit() {
	$('.search-results').fadeIn(500);
}

function payeeList() {
	$('.payee-info').hide();
	$('.auto-complete-search').hide();
	$('.payee-list').show();
}

function payeeReset() {
	$('.payee-list').hide();
	$('.auto-complete-search').fadeIn(500);
}



