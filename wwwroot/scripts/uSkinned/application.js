// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

$(document).ready(function() {

	// Notification
	var cookiePanel = $('.usn-notification'), cookieName = "USN_Notification";

	var notificationValue = getCookie(cookieName);
	if (notificationValue != null && notificationValue != "") {
		cookiePanel.addClass("closed");
		cookiePanel.removeClass("open");
	} else {
		cookiePanel.addClass("open");
		cookiePanel.removeClass("closed");
	}

	$('.accept-cookies').on('click', function (e) {
		e.preventDefault();
		setCookie(cookieName, 1, notificationExDays);
		cookiePanel.addClass("closed");
		cookiePanel.removeClass("open");
	});

	// LAZYSIZES PRELOAD
	$('img.lazyload').addClass('lazypreload');

	// Main Navigation
	// $(".navigation nav.main ul li.active").addClass("mobile-open-child");
	$("nav.main ul li span").click(function() {
		if ($(".navigation nav.main ul li span").length) {
			$(this).parent().toggleClass("open-child");
			$(this).parent().siblings().removeClass("open-child");
			$(this).parent().toggleClass("open-child_mobile");
			$(this).parent().siblings().removeClass("open-child_mobile");
		} else {
			$(this).parent().toggleClass("open-child");
			$(this).parent().siblings().removeClass("open-child");
			$(this).parent().toggleClass("open-child_mobile");
		}
	});
	$("nav.main ul li.has-child.active").addClass("open-child_mobile");
	// $("html").click(function() {
	// 	$("nav.main ul li.open-child").removeClass("open-child");
	// });
	$("nav.main ul li span a:not([data-toggle='modal']), header#site-header .expand-header").click(function(e) {
		e.stopPropagation();
	});
	$(".modal").click(function() {
		$("nav.main ul li.open-child").removeClass("open-child");
	});

	// Expand Burger Navigation  
	$("header#site-header .expand-header").click(function() {
		if ($(".navigation .reveal").length) {
			$("header#site-header .expand-header").toggleClass('active');
			$("html").toggleClass('reveal-out');
		} else {
			$("header#site-header .expand-header").toggleClass('active');
			$("html").toggleClass('reveal-out');
		}
	});
	$("#site-content, footer#site-footer").click(function() {
		$("html").removeClass("reveal-out");
		$("header#site-header .expand-header").removeClass("active");
	});

	// Expand Anchor Mobile Navigation  
	$(".component.usn_cmp_anchornavigation .expand").click(function() {
		if ($(".component.usn_cmp_anchornavigation nav").length) {
			$(".component.usn_cmp_anchornavigation .expand").toggleClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").toggleClass('open-mobile');
		} else {
			$(".component.usn_cmp_anchornavigation .expand").toggleClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").toggleClass('open-mobile');
		}
	});

	// EXPAND HEADER SEARCH 
	$("header#site-header .site-search .expand-search").click(function() {
		if ($("header#site-header .site-search").length) {
			$("header#site-header .site-search").toggleClass('open-search');
			$("header#site-header .site-search .form-control").focus();
		} else {
			$("header#site-header .site-search").toggleClass('open-search');
		}
	});
	$("html").click(function() {
		$("header#site-header .site-search").removeClass("open-search");
	});
	$("header#site-header .site-search").click(function(e) {
		e.stopPropagation();
	});

	// EXPAND In this section
	$(".in-this-section .expand-sub").click(function() {
		if ($(".in-this-section nav.sub").length) {
			$(".in-this-section .expand-sub").toggleClass('active');
			$(".in-this-section nav.sub").toggleClass('open');
		} else {
			$(".in-this-section .expand-sub").toggleClass('active');
			$(".in-this-section nav.sub").toggleClass('open');
		}
	});

	//RTL for Slick
	function rtl_slick(){
		if(jQuery("html").is('[dir="rtl"]')) {
			return true;
		} else {
			return false;
	}}

	// BANNER
	// PLAYS VIDEO IN BANNER
	$('.usn_cmp_banner .slides').on('init', function(slick){
		$('.usn_cmp_banner video').each(function () {
			this.play();
		});
	});
	// ALL CAROUSELS
	$(".component:not(.usn_cmp_banner) .slides, footer#site-footer .slides").slick({
		rtl: rtl_slick(),
		infinite: true,
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<div class="slick-prev"><i class="icon"></i>',
		nextArrow: '<div class="slick-next"><i class="icon"></i>'
	});
	$(".component.usn_cmp_banner .slides, .swp .slides").slick({
		rtl: rtl_slick(),
		infinite: true,
		speed: 600,
		fade: true,
		adaptiveHeight: true,
		prevArrow: '<div class="slick-prev"><i class="icon"></i>',
		nextArrow: '<div class="slick-next"><i class="icon"></i>'
	});

	// Alert boxes
	// Remove component entirely when alert is closed
	$('.component .alert .close').on('click', function(c){
		$(this).closest('.component:not(.usn_cmp_splitcomponent)').addClass('d-none', function(c){});
	});	
	// Remove pod entirely when alert is closed
	$('.left-col .usn_pod_alertbox.swp-item .alert .close, .right-col .usn_pod_alertbox.swp-item .alert .close').on('click', function(c){
		$(this).closest('.usn_pod_alertbox').addClass('d-none', function(c){});
	});	

	// Anchor Navigation
	// Offset with Header on display
	var sections = $('section'), 
	nav = $('.component.usn_cmp_anchornavigation'), 
	anchor_nav_height = $('.component.usn_cmp_anchornavigation').outerHeight()
	nav_height = $('header#site-header').outerHeight();
	nav_height_half = $('header#site-header').outerHeight() / 2;
	$(window).on('scroll', function () {
		var cur_pos = $(this).scrollTop();
		sections.each(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
		var top = $(this).offset().top - anchor_nav_height,
			bottom = top + $(this).outerHeight();
		} else {
			var top = $(this).offset().top - anchor_nav_height - nav_height,
				bottom = top + $(this).outerHeight();
		}
		if (cur_pos >= top && cur_pos <= bottom) {
			nav.find('a').removeClass('active');
			sections.removeClass('active');
			
			$(this).addClass('active');
				nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
			}
		});
	});
	nav.find('a').on('click', function () {
		if ( $('body').hasClass('no-header') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('hide_header-on-scroll-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) {
			//alert('No header or hide header on scroll LG - STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') ) {
			//alert('No header or hide header on scroll LG - STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-04-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-05-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-09-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-10-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-13-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-14-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-18-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header and it is Header 04, 05, 09, 10, 13, 14 LG - STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height - nav_height_half + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			//alert('Has header and it is Header 04, 05, 09, 10, 13, 14 LG — STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - nav_height_half + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-11-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-12-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-15-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') || $('body').hasClass('header-16-lg') && $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header, header 11, 12, 15 or 16 — STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) { 
			//alert('Has header, header 11, 12, 15 or 16 — STICKY NAV OFF');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height + 10
			}, 600);
			return false;
		} else if ( $('.component.usn_cmp_anchornavigation').hasClass('sticky') ) { 
			//alert('Has header — STICKY NAV ON');
			var $el = $(this), 
			href = $(this).attr('href');
			$(".component.usn_cmp_anchornavigation .expand").removeClass('anchor-active');
			$(".component.usn_cmp_anchornavigation nav").removeClass('open-mobile');
			$('html, body').animate({
				scrollTop: $(href).offset().top - anchor_nav_height - nav_height + 10
			}, 600);
			return false;
		}
	});

	// Scroll Prompt
	$('.scroll-prompt').click(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top - nav_height_half);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		} else { 
			var target;
			$("section").next().each(function(i, element) {
				target = ($(element).offset().top - nav_height);
				if (target - 10 > $(document).scrollTop()) {
					return false; // break
				}
			});
			$("html, body").animate({
				scrollTop: target
			}, 600);
		}
	});

	// Create smoothscroll links when a # is used.
	$('a:not([data-toggle="tab"]):not([data-toggle="dropdown"]):not(.nav-anchor-link):not(.nav-button-link):not([data-toggle="modal"])').click(function() {
		if ( $('body').hasClass('no-header') || $('body').hasClass('hide_header-on-scroll-lg') || $('body').hasClass('header-11-lg') || $('body').hasClass('header-12-lg') || $('body').hasClass('header-15-lg') || $('body').hasClass('header-16-lg') ) {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		} else if ( $('body').hasClass('header-04-lg') || $('body').hasClass('header-05-lg') || $('body').hasClass('header-09-lg') || $('body').hasClass('header-10-lg') || $('body').hasClass('header-13-lg') || $('body').hasClass('header-14-lg') || $('body').hasClass('header-18-lg') ) { 
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top - nav_height_half
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		} else { 
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : (this.hash.length) ? $('[name=' + this.hash.slice(1) + ']') : "";
				if (target.length) {
					$('html').removeClass('reveal-out');
					$("header#site-header .expand-header").removeClass('active');
					$('html,body').animate({
						scrollTop: target.offset().top - nav_height
					}, 600); // The number here represents the speed of the scroll in milliseconds
					return false;
				}
			}
		}
	});

	// Tooltips
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})

	// Modal windows
	// Trigger slick carousel and lazyframe when used inside modal
	$('.modal').on('shown.bs.modal', function (e) {
		$('.slides').slick('setPosition');
		lazyframe('.lazyframe-video');
		$('html').addClass('modal-open');
	})
	$('.modal').modal('handleUpdate')

	$('.modal').on('hidden.bs.modal', function () { 
		$('html').removeClass('modal-open');
	})

});

