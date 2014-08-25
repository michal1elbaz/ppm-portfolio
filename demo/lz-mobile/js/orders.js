$(function() {
		
	var qlist = $('.qdiv');

	$(".qdiv").hide();
	$(qlist[0]).show();
	
	var i = 0;
	var qform;

	// hide the previous link if you're on form page one
	var checkFormStatus = function() {
		if (i === 0) {
			$('.qaire-nav .link-previous').hide();
		} else {
			$('.qaire-nav .link-previous').show();
		}
	}
	checkFormStatus();

	// "next" button form submission
	$('.qaire-nav').on('click','.next', function(e) {
		e.preventDefault(); 					// prevent non-ajax form submission
		
		if (pageState == 'ready') {				// check for pageState before executing 

			// set pageState to transport to prevent multiple function executing
			pageState = 'transport';

			qform = "#qform" + i.toString(); 		// get the right question div
			var qdata = $(qform).serialize();	  	// put all form data into query string
			
			$.ajax({  
				type: "POST",  
				url: "/orders/input_form_data",  
				data: qdata,  
				success: function() {  
					//console.log('about to show ' +  (i+1));
					$(qlist[i]).fadeOut(250, function() {
						// alert("showing " + qlist[i+1]);
						$(qlist[i+1]).fadeIn(250);
						
						// scroll back to the top of the page when loading new question
						$('body').animate({
							scrollTop: '0px',
						}, 300);

						i++;

						if (i == qlist.length) {
							// last question has been answered	
							var oid = $("#oid").serialize();						
							$('.qaire-content').html('Questionnaire complete.  One moment...');							
							window.location.assign('/orders/payment_info?' + oid);							
						}
						
						// check form status to show or hide the previous link
						checkFormStatus();		
						
						// set pageState back to ready
						pageState = 'ready';

					});		
				}
			});
		
		}


	});  
	
	$('.qaire-nav').on('click', '.link-previous', function(e){
		e.preventDefault();

		if (pageState == 'ready') {				// check for pageState before executing

			// set pageState to transport to prevent multiple function executing
			pageState = 'transport';

			// go back to previous question div
			$(qlist[i]).fadeOut(250, function(){
				$(qlist[i-1]).fadeIn(250);
				$('body').animate({
					scrollTop: '0px',
				}, 300);
				i--;
				
				checkFormStatus();

				// set pageState back to ready
				pageState = 'ready';

			});

		}
		
	});

});

