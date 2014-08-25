$(function() {
	
	$('#billing_info').hide();
	$('#payment_submit').hide();
	
	$('#payment_continue').click(function(e) {
		e.preventDefault();
		$('#payment_info').hide(500);
		$('#billing_info').show(500);
		$('.error-message').html(''); // if there's an error message, only show it for the first div (cc info)		
	});
	
	$('#billing_continue').click(function(e) {
		e.preventDefault();
		$('#billing_info').hide(500);
		$('#payment_submit').show(500);
				
	});
	
});