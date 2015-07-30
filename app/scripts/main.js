/* jshint smarttabs:true */
/* global $, aload, google */

// Dinamic Height
function calculateHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight - $('header').height();
	$(element).height(finalHeight);
}
// Loader
function loader() {
	'use strict';
	$('#preloader').delay(900).fadeOut('slow');
	$('body').delay(900).css({ overflow: 'visible' });
}
// Mas info
function openMasInfo(target){
	'use strict';
	$(target).addClass('visible animated slideInUp');
	$('a[href=' + target + '].btn_plus').text('-');
	if($(window).width()>768){
		console.log('scrollNormal');
		$('html,body').stop().animate({ 'scrollTop': $(target).prev().offset().top + $(target).outerHeight() }, 400);	
	}
	else{
		console.log('scrollMobile');
		$('html,body').stop().animate({ 'scrollTop': $(target).offset().top - $('header').outerHeight()}, 400);
	}	
}
// Google maps api.
function initialize() {
	'use strict';
	// set options.
	var mapOptions = { zoom: 17, center: new google.maps.LatLng(-34.5539039, -58.5273) };
	// set map.
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	// set marker.
	var marker = new google.maps.Marker({ position: map.getCenter(), map: map, title: 'ISISA Insumos y Servicios Industriales' });
	// set content data.
	var contentString = '<div id="contentInfoWindow"><h1><em>ISI</em>SA Insumos y Servicios Industriales S.A.</h1><div id="bodyContent"><p>La Nueva (Calle 70) 1348/54</p><p>Villa Zagala, San Martín.</p><p>Provincia de Buenos Aires, Argentina.</p><p>011 4753-5757</p></div></div>';
	// set infowindow
	var infowindow = new google.maps.InfoWindow({ content: contentString });
	// add event listener
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}
// Process del envio.
function enviado() {
	'use strict';
	$('#contact_form').hide();
	$('#success_message').show();
}
// Contacto.
function contacto() {
	'use strict';
	// Data.
	var urlDestination = 'backend/sendmail.php',
	name = $('#name').val().trim().replace('Nombre', ''),
	email = $('#email').val().trim().replace('Email', ''),
	message = $('#message').val().trim();
	// ragexs
	var regexpChars = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\- ]+$/;
	var regexpMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	// validate inputs
	if ((email === '') || (!regexpMail.test(email))) {
		$('#email').addClass('error');
		$('#email').val('Email inválido');
		return false;
	} else if ((name === '') || (!regexpChars.test(name))) {
		$('#name').addClass('error');
		$('#name').val('Nombre inválido');
		return false;
	} else if (message === '') {
		$('#message').addClass('error');
		return false;
	} else {
		// Envio del AJAX
		$.ajax({
			type: 'POST',
			url: urlDestination,
			data: {
				'form': 'contacto',
				'nombre': name,
				'mail': email,
				'consulta': message
			},
			success: function(data) {
				enviado();
				console.log('Envio de datos OK!' + data);
			}
		});
		return false;
	}
}
// Initialize google Maps
google.maps.event.addDomListener(window, 'load', initialize);
// Load event
$(window).load(function() {
	'use strict';
	loader();
	aload();
	calculateHeight('.full-height');
});
// Document ready
$(document).ready(function() {
	'use strict';
	// resize
	$(window).resize(function() { calculateHeight('.full-height'); });
	// videos
	$('#content_video').fitVids();
	// anchor navigation
	$('a[href*=#]:not([href=#], .btn_plus)').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			console.log('Target: ' + target);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				if(this.hash === '#nosotros'){
					openMasInfo(target.find('.btn_plus').attr('href'));
				} else {
					$('html, body').animate({ scrollTop: target.offset().top }, 1000);
				}
				return false;
			}
		}
	});
	// menu
	$('#nav-icon').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('open');
		$('.menu').toggleClass('open animated fadeIn');
	});
	// menu item click
	$('.menu li a').click(function() {
		$('#nav-icon').removeClass('open');
		$('.menu').toggleClass('open animated fadeIn');
	});
	// mas info
	$('.btn_plus').click(function(event){
		event.preventDefault();
		var target = $(this).attr('href');
		if($(target).hasClass('visible')){
			$(target).removeClass('visible animated slideInUp');
			$(this).text('+');
		} else{
			openMasInfo(target);
		}
	});
	// mercados
	$('.label_span').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('data-ref');
		openMasInfo(target);
	});
	// hover de las columnas
	$('.col_25').hover(function(event) {
		event.preventDefault();
		$('.col_25').removeClass('active');
		$(this).addClass('active');
	});
	// bxslider config
	$('.bxslider').bxSlider({ mode: 'horizontal', pager: true, auto: true });
	// map overlay
	$('.map_overlay').click(function() {
		$(this).addClass('hide');
	});
	// contacto.
	$('#email').on('focus', function(event) {
		event.preventDefault();
		if ($(this).hasClass('error')) {
			$(this).removeClass('error');
			$(this).val('');
		}
	});
	$('#name').on('focus', function(event) {
		event.preventDefault();
		if ($(this).hasClass('error')) {
			$(this).removeClass('error');
			$(this).val('');
		}
	});
	$('#message').on('focus', function(event) {
		event.preventDefault();
		if ($(this).hasClass('error')) {
			$(this).removeClass('error');
			$(this).val('');
		}
	});
	$('#submitContact').click(function(event) {
		event.preventDefault();
		contacto();
	});
});
