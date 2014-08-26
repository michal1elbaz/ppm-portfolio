$(function() {

	var s, Overview = {

		settings: {
			getStartedButton: $('.home-state-selection'),
			llcStateSelection: $('.llc_state_selection'),
			faqLinks: $('.questions .faqs > li > a'),
			moreFAQs: $('.questions .see-more'),
			closeThis: $('.close'),
			tooltipID: "#state_selection_error_tooltip"
		},

		init: function() {
			s = this.settings;
			this.bindUIActions();
			this.localScrollInit();
		},
		
		bindUIActions: function() {
		    s.getStartedButton.on("click", function(e) {					
				var thisElem = $('#' + this.id);
				var pkg = thisElem.data('pkg');				
				Overview.getStarted(pkg, this); // data-pkg holds package, i.e. bronze 
		    });	
		
			s.llcStateSelection.on("change", function() {
				var thisElem = $('#' + this.id);
				var pkg = thisElem.data('pkg');
				var prices = thisElem.data('prices');
				var upfront_filing_fee = thisElem.data('upfront-filing-fee');
				Overview.updateState(pkg, prices, upfront_filing_fee);
			});
			
			s.faqLinks.on("click", function(e) {
				e.preventDefault();
				Overview.showFAQLinks(this);
			});
			
			s.moreFAQs.on("click", function(e) {
				e.preventDefault();
				Overview.showMoreFAQs(this);
			});
			
			s.closeThis.on("click", function() {
				Overview.closeNoStateTooltip();
			});
		},
		
	
		headerWidowRemoval: function() {
			$('#state_headline').each(function() {
				var textAll = $(this).html(),
				text1 = textAll.slice(0, textAll.lastIndexOf(' ')),
				text2 = textAll.slice(textAll.lastIndexOf(' ')+1);
				if (textAll.indexOf(' ') !== -1) {
					$(this).html(text1 + '&nbsp;' + text2);
				}
			});
		},

	
		updateState: function(pkg, price_array, upfront_filing_fee) {
			// get selected state abbr
			tag_id = 'llc_state_' + pkg
			newStateAbbr = $('#' + tag_id).find(":selected").text();

			// set all dropdowns to newStateAbbr
			$('#llc_state_bronze').val(newStateAbbr);
			$('#llc_state_silver').val(newStateAbbr);
			$('#llc_state_gold').val(newStateAbbr);

			// set isStateSelected if necessary
			if (newStateAbbr == '--') {
				isStateSelected = null;
			} else {
				isStateSelected = newStateAbbr;
			}

			bofa_rebate_html = "<p>$150 Bank of America Cash Back offer available (<a onclick=\"AppGlobal.openModalExternal('text','/modals/bofa_disclaimer');\">see detail</a>)*</p>";
			bofa_disclaimer_html = "<span><sup>*</sup> For those who qualify</span>"
			state_required_fee_html = " - state required fee<br>(<a onclick=\"AppGlobal.openModalExternal('text','/modals/state_required_fees');\">what is this?</a>)"

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
						$('.state_required_fee_text').html('');
					} else {
						
						// only update fees if upfront_filing_fees is true
						if (upfront_filing_fee == "on") {
							$('.state_fee_amount').html("$" + json.filing_fee);
							$('.state_fee_exp').html("$" + json.exp_filing_fee);
							$('.state_required_fee_text').html(json.abbr + state_required_fee_html);
							if ($(s.tooltipID).hasClass('active')) {
								$(s.tooltipID).removeClass('active');
							}	
						}
					}

					if (upfront_filing_fee == "on") {
						var tot_bronze = json.filing_fee + price_array[0];
						var tot_silver = json.filing_fee + price_array[1];
						var tot_gold = json.exp_filing_fee + price_array[2];
					} else {
						var tot_bronze = price_array[0];
						var tot_silver = price_array[1];
						var tot_gold = price_array[2];
					}	

					// format the price, for Indiana's sake
					if (tot_bronze % 1 == 0) {
						tot_bronze_formatted = tot_bronze // it's a whole number
					} else {
						tot_bronze_formatted = tot_bronze.toFixed(2); // it's got a decimal
					}

					if (tot_silver % 1 == 0) {
						tot_silver_formatted = tot_silver // it's a whole number
					} else {
						tot_silver_formatted = tot_silver.toFixed(2); // it's got a decimal
					}

					if (tot_gold % 1 == 0) {
						tot_gold_formatted = tot_gold // it's a whole number
					} else {
						tot_gold_formatted = tot_gold.toFixed(2); // it's got a decimal
					}

					// if the total is < 0, make it 0

					if (tot_bronze_formatted < 0) { tot_bronze_formatted = 0; }
					if (tot_silver_formatted < 0) { tot_silver_formatted = 0; }
					if (tot_gold_formatted < 0) { tot_gold_formatted = 0; }

					// fill in total price div
					var double_asterisk;
					upfront_filing_fee == 'on' ? double_asterisk = "" : double_asterisk = "<sup>**</sup>";
					$('.price_total_bronze').html('$' + tot_bronze_formatted + double_asterisk);
					$('.price_total_silver').html('$' + tot_silver_formatted + double_asterisk);
					$('.price_total_gold').html('$' + tot_gold_formatted + double_asterisk);

					// handle bofa rebate
					if (json.bofa_rebate > 0) {
						$('.rebate-div').html(bofa_rebate_html);
						$('.package-disclaimer').html(bofa_disclaimer_html);
					} else {
						$('.rebate-div').html('');
						$('.package-disclaimer').html('');
					}	

					// handle filing fee disclaimer
					if (upfront_filing_fee == 'off') {
						$('.package-disclaimer').append('<span> <sup>**</sup> Not including mandatory business filing fees.</span>');
					}

					// handle new business starter modal content
					$('.nbs_point').hide();
					if (json.nbs_modal_content.length > 0) {
						// blank out any existing state-specific content
						// get new state-specific points
						for (n in json.nbs_modal_content) {
							$('#insert-nbs_list').append("<li class='nbs_point'><span>" + json.nbs_modal_content[n] + "</span></li>");
						}

					}

					// handle headline
					$('#state_headline').html(json.headline);		
					Overview.headerWidowRemoval();
			   }
			});
		},
	
		getStarted: function(pkg, myThis) {
			// make sure a state is selected
			var select_class = 'llc_state_' + pkg;

			if ( $('#' + select_class).val() == '--') {
				// TODO: replace this with a tooltip
				Overview.showNoStateTooltip(myThis);
				//alert('Please select a state before getting started.');
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
		},
		
		showNoStateTooltip: function(myThis) {
			
			var position = $(myThis).offset();
			var thisWidth = $(myThis).width();
			var thisID = $(myThis).attr("id");
			
			if ($(s.tooltipID).hasClass('active')) {
				$(s.tooltipID).removeClass('active');
			}
			else {
				$('.state-not-selected').removeClass('active');
				$(s.tooltipID).addClass('active');
			}

			// check for viewport size and change positioning 
			if (viewportType === 'full-screen') {
				$(s.tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 170,
					'left' : position.left + thisWidth + -110
				});
			} else if(viewportType === 'ipad-portrait') {
				$(s.tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 194,
					'left' : position.left + thisWidth + -110
				});
			} else if (viewportType === 'iphone-landscape') {
				$(s.tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 120,
					'left' : position.left + thisWidth + -180
				});
			} else if (viewportType === 'iphone-portrait') {
				$(s.tooltipID).css({
					'position' : 'absolute',
					'top' : position.top - 154,
					'left' : position.left + thisWidth + -104
				});
			}

			
		},
		
		closeNoStateTooltip: function() {
		
			$('.modal-overlay').hide();
			$(s.tooltipID).removeClass('active');
			$(s.tooltipID).off('click', '.close');
		
		},
		
		showFAQLinks: function(myThis) {
			var faqLink = $(myThis);
			var faqLinkParent = $(myThis).parent();
			var faqClicked = $(myThis).parent().find('ul');
			if ($(faqLinkParent).hasClass('active')) {
				$(faqClicked).animate({
					opacity: '0'
				}, 200, function(){
					$(faqClicked).slideUp(200);
				});
				$(faqLinkParent).removeClass('active');
			} else {
				$(faqClicked).slideDown(400, function(){
					$(faqClicked).animate({
						opacity: '1'
					}, 400);
				});
				$(faqLinkParent).addClass('active');
			}
			
		},
		
		showMoreFAQs: function(myThis) {

			$(myThis).hide();
			$('.faqs.more').slideDown(600, function(){
				$('.faqs.more').animate({
					opacity: '1'
				}, 600);
			});					
		},

		localScrollInit: function() {
			$.localScroll(
				{ offset: { top: -60 }}
			);
		}
		
	}
	
	Overview.init();

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


