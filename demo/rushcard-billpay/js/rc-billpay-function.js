(function($, window) {

	$(function(){
		
		// buttons for closing panels
		$('.panel-close').live('click', function(e){
			$('.paneloverlay').fadeOut(100);
			$(this).parent().parent().parent().slideUp(500);
			e.preventDefault();
		});
		
		$('.panel-close-grip').live('click', function(e){
			$('.paneloverlay').hide();
			$('#paymentPanel').slideUp(500);
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
		
		// jCal initlization
		$('.payment-date-picker').jCal({
			day: new Date(),
			days: 4,
			showMonths: 2,
			monthSelect: true,
			callback: function (day, days) {
			//		var jMonth = day.getMonth()+1;
			//		var jDate = day.getDate();
			//		var jYear = day.getFullYear();
			//		console.log('selected ' + days + ' days starting ' + jMonth + '/' + jDate + '/' + jYear);
			//		$('.payment-date').val(jMonth + '/' + jDate + '/' + jYear);
				}
		});
		
		// continue button
		$('.button-continue .button').live('click', function(e){
			$('.payee-selection').hide();
			$('.payment-selection').fadeIn(800);
			e.preventDefault();
		});
		
		$('.button-submit .button').live('click', function(e){
			$('.payment-selection').hide();
			$('.payment-confirmation').fadeIn(800);
			e.preventDefault();
		});
		
		// back link
		$('.back-link a').live('click', function(e){
			$('.payment-selection').hide();
			$('.payee-selection').fadeIn(800);
			e.preventDefault();
		});
		
		// payment schedule selection
		$('.payment-schedule a.single').live('click', function(e){
			$('.payment-schedule a').removeClass('selected');
			$(this).addClass('selected');
			$('.payment-schedule-recurring').removeClass('active');
			$('.payment-schedule-single').addClass('active');
			e.preventDefault();
		});
		
		$('.payment-schedule a.recurring').live('click', function(e){
			$('.payment-schedule a').removeClass('selected');
			$(this).addClass('selected');
			$('.payment-schedule-single').removeClass('active');
			$('.payment-schedule-recurring').addClass('active');
			e.preventDefault();
		});
		
		// statement table row colors
		$('.statement-table > ul:nth-child(even)').addClass('even');
		
		// statement table detail toggle
		$('.statement-table.hasdetail > ul > li').live('click',function(){
			if ($(this).find('.details').hasClass('active')) {
				$(this).find('.details').slideUp(500).removeClass('active');
			} else {
				$('.statement-table.hasdetail > ul > li .details').slideUp(500).removeClass('active');
				$(this).find('.details').slideDown(500).addClass('active');
			}
		});
		
	});


} (jQuery, window));

// function for opening panels
function paymentPanelReset(){
	$('.payee-selection').show();
	$('.payee-list').hide();
	$('.payee-info').hide();
	$('.auto-complete-search').show();
	$('.payment-selection').hide();
	$('.payment-confirmation').hide();
}

function panelClose() {
	$('.paneloverlay').hide();
	$('#paymentPanel').slideUp(500);
}

function openPanel(id) {
	paymentPanelReset();
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

function payeeSelect() {
	$('.payee-list').hide();
	$('.auto-complete-search').fadeOut(500, function(){
		$('.payee-info').fadeIn(800);
	});
}

function payeeReset() {
	$('.payee-list').hide();
	$('.payee-info,').fadeOut(500, function(){
		$('.auto-complete-search').fadeIn(800);
	});
}



