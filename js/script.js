jQuery(function ($) {
	var active;
	var boxes = $('.accordion-slider .box').length;
	var singleBoxWidth = (100 / boxes);
	var collapsedWidth = singleBoxWidth - (singleBoxWidth / (boxes - 1));
	var openWidth = 100 - (collapsedWidth * (boxes - 1));

	function accordionSlider() {
		$('.accordion-slider .box').css('width', 100 / boxes + '%')
		$('.accordion-slider .box').on('mouseenter', function () {
			if (!$(this).hasClass('active') && $(window).width() >= 550) {
				//hide active elements
				if (active) {
					TweenLite.to(active.find('.accordion-slider-title'), 0.3, { opacity: 0, x: 0, overwrite: 'all' });
					TweenLite.to(active.find('.accordion-slider-content'), 0.3, { opacity: 0, x: 0, overwrite: 'all' });
					TweenLite.to(active.find('.button'), 0.3, { opacity: 0, x: -200, overwrite: 'all' });
				}

				//introduce new active elements
				var others = $('.accordion-slider .box').not(this);
				active = $(this);
				$(this).addClass('active');
				others.removeClass('active');
				var tl = new TimelineLite();
				tl.to(others, 0.8, { ease: Back.easeOut.config(1.1), width: collapsedWidth + '%' }, 0)
					.to(active, 0.8, { ease: Back.easeOut.config(1.1), width: openWidth + '%' }, 0)
					.to(active.find('.accordion-slider-title'), 0.6, { ease: Back.easeOut.config(1.2), opacity: 1, x: 50 }, 0.3)
					.to(active.find('.accordion-slider-content'), 0.6, { ease: Back.easeOut.config(1.2), x: 50, opacity: 1 }, 0.4)
					.to(active.find('.button'), 0.6, { ease: Back.easeOut.config(1.2), x: 0, opacity: 1 }, 0.5);
			}

		});
		$('.accordion-slider .box').on('mouseleave', function () {
			if ($(window).width() >= 550) {
				var all = $('.accordion-slider .box');
				var tl = new TimelineLite();
				tl.to(all, 0.8, { ease: Back.easeOut.config(1.1), width: 100 / boxes + '%' }, 0)
					.to(active.find('.accordion-slider-title'), 0.3, { opacity: 0, x: 0, overwrite: 'all' }, 0)
					.to(active.find('.accordion-slider-content'), 0.3, { opacity: 0, x: 0, overwrite: 'all' }, 0)
					.to(active.find('.button'), 0.3, { opacity: 0, x: 0, overwrite: 'all' }, 0)
				$(this).removeClass('active');
			}
		});
		if ($(window).width() < 550) {
			$('.accordion-slider-title, .accordion-slider-content, .button').removeAttr('style');
			$('.accordion-slider .box').removeClass('active').css('width', '100%');
		}

	}

	accordionSlider()

	$(window).resize(function () { accordionSlider() });

	$('.apartment__image-slider-for').slick({
		arrows: false,
		adaptiveHeight: true,
		fade: true,
		asNavFor: '.apartment__image-slider-nav',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: true,
					fade: false
				}
			}
		]
	});
	$('.apartment__image-slider-nav').slick({
		arrows: true,
		slidesToShow: 5,
		asNavFor: '.apartment__image-slider-for',
		focusOnSelect: true
	});
	$('.apartment__image-slider-mobile').slick({
		arrows: false,
		dots: true,
		adaptiveHeight: true
	});
});


// $(document).ready(function () {
// 	$('.apartment__image-slider-for').slick({
// 		arrows: false,
// 		slidesToShow: 1,
// 		adaptiveHeight: true,
// 		asNavFor: '.apartment__image-slider-nav'
// 	});
// 	$('.apartment__image-slider-nav').slick({
// 		arrows: false,
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		asNavFor: '.apartment__image-slider-for',
// 		focusOnSelect: true,
// 		centerMode: true
// 	});
// });