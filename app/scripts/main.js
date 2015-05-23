/* jshint devel:true */

// Dinamic Height
function calcutaleHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight - $('header').height();
	$(element).height(finalHeight);
}

// Loader
function loader() {
	'use strict';
	$("#preloader").delay(900).fadeOut("slow");
	$("body").delay(900).css({overflow:"visible"})
}

$(window).load(function() {
	loader();
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
