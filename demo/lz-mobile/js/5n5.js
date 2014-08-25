// state variables for homepage demo
var isStateSelected = '';

function updateState(pkg, price_array){
	// get selected state abbr
	tag_id = 'llc_state_' + pkg
	newStateAbbr = $('#' + tag_id).find(":selected").text();

	// set all dropdowns to newStateAbbr
	$('#llc_state_bronze').val(newStateAbbr);
	$('#llc_state_silver').val(newStateAbbr);
	$('#llc_state_gold').val(newStateAbbr);
	
	// set isStateSelected if necessary
	if (newStateAbbr == '--') {
		isStateSelected = 'none';
	} else {
		isStateSelected = newStateAbbr;
	}

	bofa_rebate_html = "<li class='col'>-Bank of America Rebate<sup>*</sup>:</li><li class='price rebate'>-$150</li>";
	bofa_disclaimer_html = "<span><sup>*</sup> For those who qualify</span>"
	
	// get new filing fees via ajax
	$.ajax({
	   type: 'POST', 
	   url: '/welcome/get_state_info',
	   data: { abbr: newStateAbbr },
	   success: function(state) {
			var json = JSON.parse(state);			
			
			if (json.filing_fee === 0) {
				$('.state_fee_amount').html('');
				$('.state_fee_exp').html('');
			} else {
				$('.state_fee_amount').html("$" + json.filing_fee);
				$('.state_fee_exp').html("$" + json.exp_filing_fee);
			}

			var tot_bronze = (json.filing_fee + price_array[0]) - json.bofa_rebate;
			var tot_silver = (json.filing_fee + price_array[1]) - json.bofa_rebate;
			var tot_gold = (json.exp_filing_fee + price_array[2]) - json.bofa_rebate;
			if (tot_bronze < 0) { tot_bronze = 0; }
			if (tot_silver < 0) { tot_silver = 0; }
			if (tot_gold < 0) { tot_gold = 0; }

			$('.price_total_bronze').html('$' + tot_bronze);
			$('.price_total_silver').html('$' + tot_silver);
			$('.price_total_gold').html('$' + tot_gold);
								
			// handle bofa rebate
			if (json.bofa_rebate > 0) {
				$('.rebate_div').html(bofa_rebate_html);
				$('.package-disclaimer').html(bofa_disclaimer_html);
			} else {
				$('.rebate_div').html('');
				$('.package-disclaimer').html('');
			}	
			
			// handle new business starter modal content
			$('.nbs_point').hide();
			if (json.nbs_modal_content.length > 0) {
				// blank out any existing state-specific content
				// get new state-specific points
				for (n in json.nbs_modal_content) {
					$('.nbs_list').prepend("<li class='nbs_point'><span>" + json.nbs_modal_content[n] + "</span></li>");
				}

			}		
			
	   }
	});
}

function getStarted(pkg) {
	// make sure a state is selected
	var select_class = 'llc_state_' + pkg;

	if ( $('#' + select_class).val() == '--') {
		// alert('Please select a state before getting started.');
	} else {
		// submit form
		if (pkg == 'bronze') {
			$('.bronze_form').submit();
		} else if (pkg == 'silver'){
			$('.silver_form').submit();
		} else if (pkg == 'gold') {
			$('.gold_form').submit();
		}
	}
}

function submitContactInfo() {
	// reset form field error display
	$('.form-group').removeClass('error');

	// validate form data
	var nameValue = $('#name_field').val();
	var emailValue = $('#email_field').val();
	var phoneValue = $('#phone_field').val();
	
	var emailRegex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	var validEmail = emailRegex.test(emailValue);
	
	if (nameValue.length < 5) {
		$('.error-message').hide().html('Please enter your name.').fadeIn('slow');
		$('#name_field').closest('.form-group').addClass('error');
		$('#name_field').focus();
	} else if (validEmail == false) {
		$('.error-message').hide().html('Please enter your email address.').fadeIn('slow');
		$('#email_field').closest('.form-group').addClass('error');
		$('#email_field').focus();		
	} else if (phoneValue.length < 10) {
		$('.error-message').hide().html('Please enter your phone number.').fadeIn('slow');
		$('#phone_field').closest('.form-group').addClass('error');
		$('#phone_field').focus();
	} else {
		$('#contact-info').submit();
	}
}

function submitPassword() {
	if ($('#password').val().length < 6) {
		$('.error-message').hide().html('Please enter your password.').fadeIn('slow');
	} else {
		$('#password-submit').submit();
	}
}

function resetPassword() {
	var emailRegex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	var validEmail = emailRegex.test($('#email').val());

	if (validEmail == false) {
		$('.error-message').hide().html('Please enter your email address.').fadeIn('slow');
	} else if ($('#password').val().length < 6) {
		$('.error-message').hide().html('Please choose a password at least 6 characters long.').fadeIn('slow');
	} else if ($('#password').val() != $('#retype_password').val()) {
		$('.error-message').hide().html('Error: passwords do not match.').fadeIn('slow');
	} else {
		$('#password-reset-form').submit();
	}
}


jQuery(document).ready(function($){

	// detect unknown state and hide bofa rebate
	if ($('#llc_state_bronze').val() == '--') {
		$('.rebate_div').html('');
	}
	// changing the value of state
	$(document).on('change', '#home-state', function(){
		isStateSelected = $('#home-state').val();
	});

	// activating homepage tooltip when there is an error
	$('.package').on('click', '.home-state-selection', function(e){
		var position = $(this).offset();
		var thisWidth = $(this).width();
		var thisID = $(this).attr("id");
		var tooltipID = $("#" + thisID + "_tooltip");

		// checks for state selection and only display if the state is selected
		if (isStateSelected === 'none') {
			if ($(tooltipID).hasClass('active')) {
				$(tooltipID).removeClass('active');
			}
			else {
				$('.state-not-selected').removeClass('active');
				$(tooltipID).addClass('active');
			}

			// check for viewport size and change positioning 
			if (viewportType === 'full-screen') {
				$(tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 170,
					'left' : position.left + thisWidth + -110
				});
			} else if(viewportType === 'ipad-portrait') {
				$(tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 194,
					'left' : position.left + thisWidth + -110
				});
			} else if (viewportType === 'iphone-landscape') {
				$(tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 120,
					'left' : position.left + thisWidth + -180
				});
			} else if (viewportType === 'iphone-portrait') {
				$(tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 154,
					'left' : position.left + thisWidth + -104
				});
			}
			$(tooltipID).on('click', '.close', function(){
				$('.modal-overlay').hide();
				$(tooltipID).removeClass('active');
				$(tooltipID).off('click', '.close');
			});

			e.preventDefault();
		}

	});

	// close homepage tooltip on resize window
	$(window).resize(function(){
		$('.state-not-selected').removeClass('active');
	});

	// expands the FAQ text
	$('.questions').on('click', '.faqs > li > a', function(e){
		var faqClicked = $(this).parent().find('ul');
		var faqLink = $(this);
		if ($(faqLink).hasClass('active')) {
			$(faqClicked).animate({
				opacity: '0'
			}, 200, function(){
				$(faqClicked).slideUp(200);
			});
			$(faqLink).removeClass('active');
		} else {
			$(faqClicked).slideDown(400, function(){
				$(faqClicked).animate({
					opacity: '1'
				}, 400);
			});
			$(faqLink).addClass('active');
		}
		e.preventDefault();
	});

	// shows the "see more" FAQs
	$('.questions').on('click', '.see-more', function(e){
		$(this).hide();
		$('.faqs.more').slideDown(600, function(){
			$('.faqs.more').animate({
				opacity: '1'
			},600);
		});
		$('.questions').off('click', '.see-more');
		e.preventDefault();
	});

	// submits form when you hit the enter key
	$(document).keyup(function(e) {
		if (e.keyCode === 13) {
			$('.submit').click();
		}
	});

});



$(document).ready(function(){
	
	// initialization for swipe js
	window.mySwipe = new Swipe(document.getElementById('slider'), {
		speed: 700,
		auto: 8000,
		continuous: true,
		disableScroll: false,
		stopPropagation: false,
		transitionEnd: function(index, elem){
			if (index === 3) {
				var iFrame = $('.slides.wrightway iframe');
				iFrame.attr('src', iFrame.data('src'));
			}
		}
	});

});