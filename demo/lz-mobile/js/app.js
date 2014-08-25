// Declare global variable for viewport size
var viewportWidth;
var viewportType;

// Declare global page state
var pageState = 'ready';

document.addEventListener("touchstart", function() {},false);

// Open a modal and loading external content
// There are two types available, "text" and "video" which will give the modal different styles
function openModalExternal(type,content){
	$('.modal.external').addClass(type);
	$('.modal.external').addClass('active');
	$('.modal.external .content').load(content);
	$('.modal.external').fadeIn();
	$('.modal-overlay').fadeIn();
}

// This function will open a Youtube iframe video
function openModalYoutube(iframeUrl) {
	$('.modal.external').addClass('video');
	$('.modal.external').addClass('active');
	$('.modal.external .content').html(iframeUrl);
	$('.modal.external').fadeIn();
	$('.modal-overlay').fadeIn();
}

// Loads modal with inline content
function openModalID(id){
	$('#'+id).fadeIn();
	$('#'+id).addClass('active');
	$('.modal-overlay').addClass('active');
}

// function for loading the help content into a tooltip
var helpContentToTooltip = function(){
	$('.help-content').each(function(){
		var helpContentDiv = $(this);
		var helpContentID = helpContentDiv.attr('id');
		var helpContent = helpContentDiv.html();
		$('.tooltip-container').first().append(
			"<div class='tooltip' id='" + helpContentID + "_tooltip'><div class='arrow left'></div><a class='close'></a><div class='container'>" + helpContent + "</div></div>"
			);
		helpContentDiv.parent().parent().find('.heading').append(
			"<a class='help' id='" + helpContentID + "'><i class='icon lz-icon-help'></i></a>"
			);
	});
};

// function to identify viewport size
var viewportIdentify = function(){
	viewportWidth = $(window).width();
	if (viewportWidth > 956) {
		viewportType = 'full-screen';
	} else if (viewportWidth > 761 && viewportWidth < 955) {
		viewportType = 'ipad-portrait';
	} else if (viewportWidth > 460 && viewportWidth < 760) {
		viewportType = 'iphone-landscape';
	} else if (viewportWidth < 459) {
		viewportType = 'iphone-portrait';
	}
};

// automatically set the width of the steps nav
var stepsNavWidth = function() {
	// setting variables for the steps nav
	var stepsNav = $('.steps-nav .steps li');
	var stepsNavCount = stepsNav.size();	

	// setting the width of each step nav
	if (viewportType === 'full-screen') {
		var stepSize = (960/stepsNavCount) - 44;
		stepsNav.find('.link').each(function(){
			$(this).css({
				'width' : stepSize + 'px'
			});
		});				
	}
	else if (viewportType === 'ipad-portrait') {
		var stepSize = (768/stepsNavCount) - 44;
		stepsNav.find('.link').each(function(){
			$(this).css({
				'width' : stepSize + 'px'
			});
		});
	};
};

// function for checking status of the nav bar
var stepsNavStatus = function() {
	var stepsNav = $('.steps-nav .steps li');
	var stepsNavStatus = stepsNav.first().attr('class');
	var stepsNavStatusLast = stepsNav.last().attr('class');

	// adds the proper classes depend on the state of the first and last items
	if (stepsNavStatus === 'active') {
		$('.steps-nav').addClass('first');
	}
	if (stepsNavStatusLast === 'active'){
		$('.steps-nav').addClass('last');
	}

	// adds the 'last' class for the last item
	stepsNav.last().addClass('last');

	// find the link text for the currently active class
	// and put it into the current step for mobile nav bar
	var currentStep = $('.steps-nav .steps').find('.active .link').html();
	$('.steps-nav .current-step').html(currentStep);
}


jQuery(document).ready(function($) {

	// functions that needs to run on load
	viewportIdentify();
	helpContentToTooltip();
	stepsNavWidth();
	stepsNavStatus();

	// function to run on window resize
	$(window).resize(function(){
		viewportIdentify();
		stepsNavWidth();
		// closing any open tooltips
		$('.tooltip').removeClass('active');
	});

	// activating tooltips
	$(document).on('click', '.help', function(e){
		var position = $(this).offset();
		var thisWidth = $(this).width();
		var thisID = $(this).attr("id");
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
					'top' : position.top - tooltipHeight/2 - 10,
					'left' : position.left + thisWidth + 14
				});
			}
			
		}

		$(tooltipID).on('click', '.close', function(){
			$('.modal-overlay').hide();
			$(tooltipID).removeClass('active');
			$(tooltipID).removeAttr('style');
			$(tooltipID).off('click', '.close');
		});

		e.preventDefault();
	});

	// closing tooltips
	//$(document).on('click', '.icon-tooltip-close', function(e){
	//	$(this).parent().parent().removeClass('active');
	//	e.preventDefault();
	//});

	// closing tooltips on window resize
	$(window).resize(function(){
		$('.modal-overlay').hide();
		$('.tooltip').removeClass('active');
		$('.tooltip').removeAttr('style');
	});

	// close modal box
	$(document).on('click','.modal .close, .modal-overlay', function(e){
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
		e.preventDefault();
	});

	// close modal box with ESC key
	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			// removes all tooltips
			$('.tooltip').removeClass('active');
			$('.tooltip').removeAttr('style');

			// hides modal
			$('.modal').hide();
			$('.modal-overlay').removeClass('active');
			
			var currentModal = $('.modal.active');

			// Clears the modal content if it has external content
			if ($(currentModal).hasClass('external')) {
				$(currentModal).removeClass('text');
				$(currentModal).removeClass('video');
				$(currentModal).find('.content').html('');
			}
			$(currentModal).removeClass('active');
		}
	});

	// Expandable UL for listing features in the qaire
	$(document).on('click','ul.expandable li', function(){
		if ($(this).hasClass('active')) {
			$(this).find('ul').slideUp();
			$(this).find('.icon').removeClass('icon-caret-down').addClass('icon-caret-right');
			$(this).removeClass('active');
		} else {
			$(this).find('ul').slideDown();
			$(this).find('.icon').removeClass('icon-caret-right').addClass('icon-caret-down');
			$(this).addClass('active');
		}
	});

	// open up the "forgot password" field in the sign in modal
	$(document).on('click','.sign-in-modal .forgot-password-link', function(){
		$('.sign-in-modal .forgot-password').slideDown(600);
	});

	// removes widowed child on specific elements
	$('p').each(function() {
		var textAll = $(this).html(),
		text1 = textAll.slice(0, textAll.lastIndexOf(' ')),
		text2 = textAll.slice(textAll.lastIndexOf(' ')+1);
		if (textAll.indexOf(' ') !== -1) {
			$(this).html(text1 + '&nbsp;' + text2);
		}
	});

	

});

