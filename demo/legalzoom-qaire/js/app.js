/*exported openModalID, function for opening modals */
/*exported openModalExternal, function for opening modal with loading external content */

// Open a modal and loading external content
// There are two types available, "text" and "video" which will give the modal different styles
function openModalExternal(type,content){
	$('.modal.external').addClass(type);
	$('.modal.external').addClass('active');
	$('.modal.external .content').load(content);
	$('.modal.external').fadeIn();
	$('.modal-overlay').fadeIn();
}

// Loads modal with inline content
function openModalID(id){
	$('#'+id).fadeIn();
	$('#'+id).addClass('active');
	$('.modal-overlay').fadeIn();
}

jQuery(document).ready(function($) {

	// activating tooltips
	$(document).on('click', '.help', function(e){
		var position = $(this).offset();
		var thisWidth = $(this).width();
		var thisID = $(this).attr("id");
		var tooltipID = $("#" + thisID + "_tooltip");

		$(tooltipID).css({
			'position' : 'absolute',
			'top' : position.top - 24,
			'left' : position.left + thisWidth + 14
		});

		if ($(tooltipID).hasClass('active')) {
			$(tooltipID).removeClass('active');
		}
		else {
			$('.tooltip').removeClass('active');
			$(tooltipID).addClass('active');
		}
		e.preventDefault();
	});

	// closing tooltips
	$(document).on('click', '.icon-tooltip-close', function(e){
		$(this).parent().parent().removeClass('active');
		e.preventDefault();
	});

	// closing tooltips on window resize
	$(window).resize(function(){
		$('.tooltip').removeClass('active');
	});

	// close modal box
	$(document).on('click','.modal .close, .modal-overlay', function(e){
		$('.modal').hide();
		$('.modal-overlay').hide();
		var currentModal = $('.modal.active');
		// Clears the modal content if it has external content
		if ($(currentModal).hasClass('external')) {
				$(currentModal).removeClass('text');
				$(currentModal).removeClass('video');
				$(currentModal).find('.content').html('');
			}
		e.preventDefault();
	});

	// close modal box with ESC key
	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			$('.modal').hide();
			$('.modal-overlay').hide();
			var currentModal = $('.modal.active');
			// Clears the modal content if it has external content
			if ($(currentModal).hasClass('external')) {
				$(currentModal).removeClass('text');
				$(currentModal).removeClass('video');
				$(currentModal).find('.content').html('');
			}
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

