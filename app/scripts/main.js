/* jshint devel:true */

// Dinamic Height
function calcutaleHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight - $('header').height();
	$(element).height(finalHeight);
}

$(window).load(function() {
	calcutaleHeight('section');
});

$(document).ready(function() {
	'use strict';
	// resize
	$(window).resize(function() {
		calcutaleHeight('section');
	});
	// videos 
	$('#content_video').fitVids();
});
