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
	aload();
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

	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });

	// mas info.
	$('.btn_plus').click(function(event) {
		event.preventDefault();
		var _target = $(this).attr('href');
		console.log(_target);
		$(_target).toggleClass('visible animated slideInUp');
	});

});
