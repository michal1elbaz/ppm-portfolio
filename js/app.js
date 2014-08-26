// main javascript file for the app
$(function(){

	var MyApp = (function(){
		
		var pageReady = null;
		var screenSize = null;

		var checkWindowSize = function() {
			var windowWidth = $(window).width();
			if (windowWidth <= 459) {
				this.screenSize = 'iphone-portrait';
			}
			else if (windowWidth > 459 && windowWidth <= 760) {
				this.screenSize = 'iphone-landscape';
			}
			else if (windowWidth > 760 && windowWidth <= 955) {
				this.screenSize = 'ipad-portrait';
			}
			else {
				this.screenSize = 'full-size';
			}
		},

		activateTooltip = function(thisTooltip,thisTooltipID) {
			if ($(thisTooltipID).hasClass('active')) {
				// clears the tooltip if it's already active and the help link gets clicked again
				clearTooltip();
			} else {
				// activates tooltip
				$('.tooltip.active').removeClass('active');
				$(thisTooltipID).addClass('active');

				// if it's a mobile device screen, the tooltip appears as a modal instead
				// otherwise it will call the position tooltip function
				if (this.screenSize ==='iphone-landscape' || this.screenSize === 'iphone-portrait') {
					$('.modal-overlay').addClass('active');
				} else {
					positionTooltip(thisTooltip,thisTooltipID);
				}
				
				// adds watcher for closing the tooltip
				$(thisTooltipID + ' .close, .modal-overlay').on('click', function(){
					clearTooltip(thisTooltipID);
				});

			}
		},

		clearTooltip = function(thisTooltipID) {
			$('.tooltip.active').removeAttr('style');
			$('.tooltip.active .arrow').removeClass('fa-caret-left fa-caret-up fa-caret-down fa-caret-right');
			$('.tooltip.active').removeClass('active');
			$('.modal-overlay').removeClass('active');
			$(thisTooltipID + ' .close, .modal-overlay').off('click');
		},

		positionTooltip = function(thisTooltip,thisTooltipID) {
			var position = $(thisTooltip).offset();
			var width = $(thisTooltip).width();
			var height = $(thisTooltip).height();
			var tooltipHeight = $(thisTooltipID).outerHeight();
			var tooltipWidth = $(thisTooltipID).outerWidth();
			if ($(window).width() <= position.left+(width/2)+(tooltipWidth/2)) {
				// if tooltip on bottom is still too far off the right, place on left
				$(thisTooltipID).css({
					'position' : 'absolute',
					'top' : position.top - tooltipHeight/2 + 8,
					'left' : position.left - (tooltipWidth + 10)
				});
				$(thisTooltipID + ' .arrow').addClass('fa-caret-right');
			} else if ($(window).width() <= position.left + width + tooltipWidth + 10) {
				// if tooltip is too far to the right of the screen, place on bottom
				$(thisTooltipID).css({
					'position' : 'absolute',
					'top' : position.top + height + 8,
					'left' : position.left + (width/2) - (tooltipWidth/2)
				});
				$(thisTooltipID + ' .arrow').addClass('fa-caret-up');
			} else {
				// otherwise place tooltip to the right of the help link
				$(thisTooltipID).css({
					'position' : 'absolute',
					'top' : position.top - tooltipHeight/2 + 8,
					'left' : position.left + width + 10
				});
				$(thisTooltipID + ' .arrow').addClass('fa-caret-left');
			}

		},

		modalFullScreen = function(thisID) {
			$('body').addClass('noscroll');
			$('.modal-fullscreen').addClass('active');
			
			// check to see if there is an ID for the link
			if (thisID !== undefined) {
				// split ID and use it as an URL
				var res = thisID.split("_");
				var loadURL = res[0] + "/" + res[1] + "/" + res[2] + "_" + res[3] + ".html";
				
				// load URL into the modal content
				$('.modal-fullscreen .content').load(loadURL);
			}

			// close modal event
			$('.modal-fullscreen').on('click','.close', function(){
				modalFullScreenClear();
				$('.modal-fullscreen').off('click','.close');
			});

		},

		modalFullScreenClear = function() {
			$('body').removeClass('noscroll');
			$('.modal-fullscreen').removeClass('active');
			$('.modal-fullscreen .content').empty();
		},

		resize = function() {
			this.checkWindowSize();
			this.clearTooltip();
		},

		init = function() {
			this.checkWindowSize();
		},
		
		scroll = function() {
			// attach correct class to the header to hide & display based on scroll position
			var scrolltop = $(window).scrollTop();

			if(scrolltop >= 500) {
				$('.site-header').addClass('active');
			} else {
				$('.site-header').removeClass('active');
			}
		};

		return {
			pageReady: pageReady,
			screenSize: screenSize,
			checkWindowSize: checkWindowSize,
			activateTooltip: activateTooltip,
			clearTooltip: clearTooltip,
			modalFullScreen: modalFullScreen,
			modalFullScreenClear: modalFullScreenClear,
			resize: resize,
			scroll: scroll,
			init: init
		};

	})();

	// functions to run when the document finishes loading
	MyApp.init();

	// functions to run on window resize
	$(window).on('resize',function(){
		MyApp.resize();
	});

	// window on scroll
	$(window).on('scroll', function(){
		MyApp.scroll();
	});

	// on.click listeners
	$(document).on('click', '.help', function(){
		var thisTooltip = $(this);
		var thisTooltipID = '#' + $(this).attr('id') + '_tooltip';
		MyApp.activateTooltip(thisTooltip,thisTooltipID);
	});

	$(document).on('click', '.open-modal-fullscreen', function(){
		var thisID = $(this).attr('id');
		MyApp.modalFullScreen(thisID);
	});

	$('.site-header').on('click','.scroll-to-top', function(){
		$("html, body").animate({ scrollTop: "0" });
	});

	// bind esc key to close modal 
	$(document).keyup(function(e){
		if(e.keyCode === 27) {
			MyApp.modalFullScreenClear();
		}
	});

});

