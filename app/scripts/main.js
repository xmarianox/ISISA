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
	$('#preloader').delay(900).fadeOut('slow');
	$('body').delay(900).css({overflow:'visible'});
}

// Google maps api.
function initialize() {
	'use strict';

	var myLatlng = new google.maps.LatLng(-34.554056, -58.527123);
	var mapOptions = {
	zoom: 4,
	center: myLatlng
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var contentString = '<div id="content">'+
	  '<div id="siteNotice">'+
	  '</div>'+
	  '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	  '</div>'+
	  '</div>';

	var infowindow = new google.maps.InfoWindow({
	  content: contentString
	});

	var marker = new google.maps.Marker({
	  position: myLatlng,
	  map: map,
	  title: 'ISISA Insumos y Servicios Industriales'
	});
	google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map,marker);
	});
}

$(window).load(function() {
	'use strict';
	loader();
	aload();
	calcutaleHeight('section', '.bx-viewport');
});

$(document).ready(function() {
	'use strict';

	// Google Maps Api.
	initialize();

	// resize
	$(window).resize(function() {
		calcutaleHeight('section', '.bx-viewport');
	});
	// videos 
	$('#content_video').fitVids();

	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
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

	$('#nav-icon').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('open');
		$('.menu').toggleClass('open animated fadeIn');
	});

	// mas info.
	$('.btn_plus').click(function(event) {
		event.preventDefault();
		var _target = $(this).attr('href');
		console.log(_target);
		$(_target).toggleClass('visible animated slideInUp');
	});

	$('.bxslider').bxSlider({
		mode  : 'horizontal',
		pager : true
	});

	// map overlay
	$('.map_overlay').click(function() {
		$(this).addClass('hide');
	});

});
