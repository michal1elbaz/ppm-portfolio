// Globally available functions go here

AppGlobal = {		
	showError: function(msg, field) {

	 	$('.form-group').removeClass('error');
		$('.error-message').hide().html(msg).fadeIn('slow');
		$(field).closest('.form-group').addClass('error');
		$(field).focus();
		pageState = 'ready';

	},

	checkErrorMessage: function() {
		var errorMessage = $('.error-message').html();
		var errorMessageTrimmed = $.trim(errorMessage);
		if (errorMessageTrimmed.length > 0) {
			$('.error-message').show();
		}
	},

	disableButton: function(buttonSelector) {
		if(typeof(buttonSelector) === 'undefined') buttonSelector = $('.next');
		iconSelector = buttonSelector.find('.icon');

		buttonSelector.addClass('gray');
		buttonSelector.find('.button-center').html('Processing...');
		iconSelector.removeClass('button-icon');
		iconSelector.addClass('icon-refresh icon-spin fa-icon');
	},
	
	checkErrorMessage: function() {
		var errorMessage = $('.error-message').html();
		var errorMessageTrimmed = $.trim(errorMessage);
		if (errorMessageTrimmed.length > 0) {
			$('.error-message').show();
		}
	},
	
	// TODO: remove all inline onclick calls, move into bindUIActions 
	openModalExternal: function(type,content){
		$('.modal.external').addClass(type);
		$('.modal.external').addClass('active');
		$('.modal.external .content').load(content);
		$('.modal.external').fadeIn();
		$('.modal-overlay').fadeIn();
	},
	
	// Loads modal with inline content
	openModalID: function(id){
		$('#'+id).fadeIn();
		$('#'+id).addClass('active');
		$('.modal-overlay').fadeIn();
	},
	
	popUps: function(href,popupWidth,popupHeight) {
		var positionLeft = (screen.width - popupWidth)/2
		var positionTop = (screen.height - popupHeight)/2
		window.open(href, 'pop_up', 'width='+popupWidth+',height='+popupHeight+',left='+positionLeft+',top='+positionTop+',menubar=no,location=no,status=no,scrollbars=yes');
	},

	// function to identify viewport size
	viewportIdentify: function(){
		viewportWidth = $(window).width();
		if (viewportWidth > 956) {
			viewportType = 'full-screen';
			$('.device_type').val('large_screen');
		} else if (viewportWidth > 761 && viewportWidth < 955) {
			viewportType = 'ipad-portrait';
			$('.device_type').val('large_screen');
		} else if (viewportWidth > 460 && viewportWidth < 760) {
			viewportType = 'iphone-landscape';
			$('.device_type').val('small_screen');
		} else if (viewportWidth < 459) {
			viewportType = 'iphone-portrait';
			$('.device_type').val('small_screen');
		}
	}

}

$(function() {
	var s, AppOnload = {
		
		settings: {
			closeHandle: $('.modal .close, .modal-overlay')
		},
		
		init: function() {
		  s = this.settings;
			this.bindUIActions();
			AppGlobal.viewportIdentify();
			AppOnload.helpContentToTooltip();
			AppOnload.removeWidow('p');				
		},
		
		bindUIActions: function() {
			s.closeHandle.on("click", function(e) {
				e.preventDefault();
				AppOnload.closeModalBox();				
			});
			
			$(document).keyup(function(e) {
				if (e.keyCode === 27) {
					AppOnload.closeModalEsc();
				}
			});
			
			$(window).resize(function() {
				AppOnload.doWindowResize();
			});
			
			$(document).on('click', '.help', function(){
				AppOnload.activateTooltip(this);
			});
		},
		
		closeModalBox: function() {

			// removes all tooltips
			$('.tooltip').removeClass('active');
			$('.tooltip').removeAttr('style');

			// hides modal
			$('.modal').hide();
			$('.modal-overlay').hide();

			var currentModal = $('.modal.active');

			// Clears the modal content if it has external content
			if ($(currentModal).hasClass('external')) {
					$(currentModal).removeClass('text');
					$(currentModal).removeClass('video');
					$(currentModal).find('.content').html('');
				}
			$(currentModal).removeClass('active');
						
		},
		
		closeModalEsc: function() {

			// removes all tooltips
			$('.tooltip').removeClass('active');
			$('.tooltip').removeAttr('style');

			// hides modal
			$('.modal').hide();
			$('.modal-overlay').hide();

			var currentModal = $('.modal.active');

			// Clears the modal content if it has external content
			if ($(currentModal).hasClass('external')) {
				$(currentModal).removeClass('text');
				$(currentModal).removeClass('video');
				$(currentModal).find('.content').html('');
			}
			$(currentModal).removeClass('active');

		},
	
		// function for loading the help content into a tooltip
		helpContentToTooltip: function() {
			// this writes each of the help tooltip into the tooltip container
			$('.help-content').each(function(){
				var helpContentDiv = $(this);
				var helpContentID = helpContentDiv.attr('id');
				var helpContent = helpContentDiv.html();
				$('.tooltip-container').first().append(
					"<div class='tooltip' id='" + helpContentID + "_tooltip'><div class='arrow left'></div><a class='close'></a><div class='container'>" + helpContent + "</div></div>"
					);
				helpContentDiv.closest('.heading').append(
					"<a class='help' id='" + helpContentID + "'><i class='icon lz-icon-help'></i></a>"
					);
			});
		},
	
		doWindowResize: function() {
			AppGlobal.viewportIdentify();
			// close any open tooltips
			$('.tooltip').removeClass('active');
		},
	
		// activating tooltips
		activateTooltip: function(myThis) {
			var position = $(myThis).closest('.form-group').offset();
			var thisWidth = $(myThis).width();
			var thisID = $(myThis).attr("id");
			var tooltipID = $("#" + thisID + "_tooltip");
			if ($(tooltipID).hasClass('active')) {
				$(tooltipID).removeClass('active');
				$(tooltipID).off('.click', '.close');
			}
			else {
				$('.tooltip').removeClass('active');
				$(tooltipID).addClass('active');
				if (viewportType === 'iphone-landscape'){
					$('.modal-overlay').fadeIn();
				} 
				else if (viewportType === 'iphone-portrait'){
					$('.modal-overlay').fadeIn();
				}
				else {				
					var tooltipHeight = $(tooltipID).height();
					$(tooltipID).css({
						'position' : 'absolute',
						'top' : position.top - tooltipHeight/2 - 25,
						'left' : position.left
					});
				}	
			}

			// TODO: move this out into its own function with UI binding
			$(tooltipID).on('click', '.close', function(){
				$('.modal-overlay').hide();
				$(tooltipID).removeClass('active');
				$(tooltipID).removeAttr('style');
				$(tooltipID).off('click', '.close');
			});
		
		},

		// remove widows from specific elements
		removeWidow: function(elementType) {
			$(elementType).each(function() {
				$(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/,'&nbsp;$1'));
			});
		}
	}		
	
	AppOnload.init();
});
