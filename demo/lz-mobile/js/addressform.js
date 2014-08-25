$(function() {
	$('.zip-error').hide();
	$('.biz_address').hide();
	$('.biz_address_city').hide();
	$('.biz_address_state').hide();
	
	$("#biz_address_zip").keyup(function() {
	  var el = $(this);
	  if ((el.val().length == 5) && (is_int(el.val()))) {

		$.ajax({
		  url: "http://zip.elevenbasetwo.com",
		  cache: false,
		  dataType: "json",
		  type: "GET",
		  data: "zip=" + el.val(),
		  success: function(result, success) {

		    $(".biz_address").slideDown(); 
			$(".biz_address_city").slideDown();
			$(".biz_address_state").slideDown();

		    $("#biz_address_city").val(result.city);
		    $("#biz_address_state").val(result.state);

		    $(".zip-error").hide(); 

		    $("#biz_address").focus();

		  },
	
		  error: function(result, success) {
		    $(".zip-error").show();
		  }
		});
	  }
	});
});

function is_int(value){ 
  if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
      return true;
  } else { 
      return false;
  } 
}