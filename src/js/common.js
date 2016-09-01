window.onload = function(){
	var body = document.querySelector(".out");

	// body.classList.add("load-page")

}
//main gallery image
function galleryImage(gallery){
	var carousel_container = $(gallery),
		carousel = carousel_container.find(".rotator"),
		next = carousel_container.find(".pagination-item__right"),
		prev = carousel_container.find(".pagination-item__left"),
		current = carousel_container.find(".pagination-current"),
		all = carousel_container.find(".pagination-all");

	var mainGallery = {
		rows: 2,
		slidesPerRow: 1,
		arrows: false,
		fade: true
	};

	var newsFacebook = {
		arrows: false,
		rows: 2,
		slidesPerRow: 4,
		fade: true,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesPerRow: 3
				}
			}
		]
	};

	carousel.on("init", function(slick){

		slideCounter($(this));

		var $firstAnimatingElements = $('div.slick-slide:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});

	carousel.on("beforeChange", function(e, slick, currentSlide, nextSlide){

		var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});

	if(carousel_container.find(".gallery-carousel").length){
		carousel.slick(mainGallery);
	};

	if(carousel_container.find(".gallery-news").length){
		carousel.slick(newsFacebook);
	};

	carousel.on("afterChange", function(slick, currentSlide){
		var l = $(this).slick("slickCurrentSlide") + 1;

		if(l < 10) {
			l = "0" + l;
		} else {
			l = l;
		}

		current.text(l)
	});

	carousel.on("breakpoint", function(event, slick, breakpoint){
		console.log(event, slick, breakpoint);
		slideCounter($(this))
	});

	next.on("click", function(event){
		event.preventDefault();
		carousel.slick("slickNext");
		return false;
	});

	prev.on("click", function(event){
		event.preventDefault();
		carousel.slick("slickPrev");
		return false;
	});

	var time;
	function slideCounter(slider){
		console.log(true)
		time = setTimeout(function(){
			var l = $(slider).find(".slick-slide").length;
			console.log(l)
			if(l === 1) {
				$(slider).parents(".projects-gallery").find(".pagination-inner").hide();
			} else {
				$(slider).parents(".projects-gallery").find(".pagination-inner").show();
			}

			if(l < 10) {
				l = "0" + l;
			} else {
				l = l;
			}
			all.text(l)
		}, 10);
	};
	// $(window).on("resize", function(){
	// 	clearTimeout(time)
	// 	//slideCounter($(".slick-slider"));
	// });

		

	function doAnimations(elements) {
	var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function() {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function() {
				$this.removeClass($animationType);
			});
		});
	}	
};

var timeout,
	flag = false;
function projectTrigger() {
	var conteiner = $(".content"),
		cTriggers = conteiner.find(".projects-triggers");

	cTriggers.on("click", ".projects-triggers__item", function(event){
		event.preventDefault();
		
		if(flag || $(this).hasClass("active")) return false;

		flag = true;

		clearTimeout(timeout);

		var $this = $(this),
			dataTrigger = $this.data("trigger");

		$this.addClass("active").siblings().removeClass("active");
		projectsFader(dataTrigger);
	});
};

function projectsFader(item) {
	var conteiner = $(".content"),
		cTriggers = conteiner.find(".projects-fader");
	cTriggers.find(".active").addClass("fadeOut");
	cTriggers.find("[data-faders='" + item + "']").addClass("is-visible active fadeIn").siblings().removeClass("active");
	timeout = setTimeout(function(){
		cTriggers.find(".fadeOut").removeClass("is-visible fadeOut active");
		cTriggers.find(".fadeIn").removeClass("fadeIn");
		conteiner.find(".action").removeClass("action");
		flag = false;
	},600);
};

function scroll3316() {
	var curCount = 0,
		lastTime = 0,
		minCount = 5,
		minTime = 500,
		lastDir = false;

	$(window).on('DOMMouseScroll mousewheel', scrollEvent);

	function scrollEvent(e) {

		if($(e.target).parents('.content-right').size()) return false;

		var curTime = e.timeStamp,
			curDirection = e.originalEvent.deltaY;

		if(((curTime - lastTime) < minTime) || !lastTime) {

			if(!lastDir || curDirection*lastDir > 0  ) {
				lastDir = curDirection;
				lastTime = curTime;
				curCount++;
			}	
			else {
				curCount = 1;
				lastTime = curTime;
				lastDir = curDirection;
			}

		}
		else {
			curCount = 0;
			lastTime = 0;
		}

		if(curCount >= minCount) {

			if(curDirection > 0) {
				pressNext();
			} else {
				pressPrev();
			}

			resetScroll();
		}
	};

	function pressNext() {
		$("#next").trigger("click");
	};

	function pressPrev() {
		$("#prev").trigger("click");
	}

	function resetScroll() {
		curCount = 0;
		lastTime = 0;
		lastDir = false
	};
}


// custom scrollbar

function scrollbar(){
	var container = document.getElementById("scroll-container");

	setTimeout(function(){
		Ps.initialize(container, {
			wheelSpeed: 1,
			wheelPropagation: true,
			animateScroll: true
		});
		Ps.update(container);
	},100);
};

function heightScrollContainer() {
	$("#scroll-container").height($(window).height() - 80);
};

function iso() {
	var container = document.getElementById("scroll-container");
	var grid = $(".grid").isotope({
		itemSelector: 'li'
	});

	$('.sort').on('click', function(){
		var filterValue = $(this).attr('data-filter');
		grid.isotope({ filter: filterValue });
		$(this).addClass('active').siblings().removeClass('active');
		container.scrollTop = 0;
		setTimeout(function () {
			Ps.update(container);
		},600);		
	});
}

function lightG(){
	var item = document.getElementById("l-gallery");

	lightGallery(item, {
		download: false,
		counter: false,
		mode: 'lg-scale-up',
		prevHtml: '<i><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path d="m76.40741,28.62963l-62.344,0l21.456,-21.456c1.562,-1.562 1.562,-4.095 0.001,-5.657c-1.562,-1.562 -4.096,-1.562 -5.658,0l-28.283,28.284l0,0c-0.186,0.186 -0.352,0.391 -0.498,0.61c-0.067,0.101 -0.114,0.21 -0.171,0.315c-0.067,0.124 -0.142,0.242 -0.196,0.373c-0.056,0.135 -0.088,0.276 -0.129,0.416c-0.032,0.111 -0.075,0.217 -0.098,0.331c-0.052,0.259 -0.08,0.521 -0.08,0.784l0,0c0,0.003 0.001,0.005 0.001,0.008c0,0.259 0.027,0.519 0.078,0.774c0.024,0.121 0.069,0.232 0.104,0.349c0.039,0.133 0.07,0.268 0.123,0.397c0.058,0.139 0.136,0.265 0.208,0.396c0.054,0.098 0.096,0.198 0.159,0.292c0.147,0.221 0.314,0.427 0.501,0.614l28.282,28.281c1.562,1.562 4.095,1.562 5.657,0.001c1.562,-1.562 1.562,-4.096 0,-5.658l-21.456,-21.454l62.343,0c2.209,0 4,-1.791 4,-4s-1.791,-4 -4,-4z"/></svg></i>',
		nextHtml: '<i><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" d="m4.38095,36.40194l62.344,0l-21.456,21.456c-1.562,1.562 -1.562,4.095 -0.001,5.656c1.562,1.562 4.096,1.562 5.658,0l28.283,-28.284l0,0c0.186,-0.186 0.352,-0.391 0.498,-0.609c0.067,-0.101 0.114,-0.21 0.172,-0.315c0.066,-0.124 0.142,-0.242 0.195,-0.373c0.057,-0.135 0.089,-0.275 0.129,-0.415c0.033,-0.111 0.076,-0.217 0.099,-0.331c0.052,-0.26 0.079,-0.522 0.079,-0.785l0,0c0,-0.003 -0.001,-0.006 -0.001,-0.009c-0.001,-0.259 -0.027,-0.519 -0.078,-0.774c-0.024,-0.12 -0.069,-0.231 -0.104,-0.349c-0.039,-0.133 -0.069,-0.268 -0.123,-0.397c-0.058,-0.139 -0.136,-0.265 -0.208,-0.396c-0.054,-0.098 -0.097,-0.198 -0.159,-0.292c-0.146,-0.221 -0.314,-0.427 -0.501,-0.614l-28.282,-28.281c-1.562,-1.562 -4.095,-1.562 -5.657,-0.001c-1.562,1.562 -1.562,4.095 0,5.658l21.456,21.455l-62.343,0c-2.209,0 -4,1.791 -4,4c0,2.209 1.791,4 4,4z"/></svg></i>'
	})
}

function grayscale(){

	function setGrayscale(src){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var imgObj = new Image();
		imgObj.src = src;
		canvas.width = imgObj.width;
		canvas.height = imgObj.height; 
		ctx.drawImage(imgObj, 0, 0);
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	};

	var g = $(".greyscale"),
		gFirst = g.parent().find('img:first'),
		gImg = $('.img_grayscale');
		
	g.fadeIn(500);
		
	g.each(function(){
		var el = $(this);
		el.css({"position":"absolute", "top": "50%", "bottom":"0"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute", "z-index":"2","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.dequeue();
		});
		this.src = setGrayscale(this.src);
	});
	
	if($(".services-container").length) {
		gHovers($(".service-container__inner"));
	} else {
		gHovers($(".greyscale"));
	}		

	function gHovers(item) {
		item.mouseover(function(){
			$(this).parent().find('img:first').stop().animate({opacity:1}, 300);
		})
		item.on("mouseout", function(){
			$(this).parent().find(".img_grayscale").stop().animate({opacity:0}, 300);
		});
	}

};

function sideLeaving(){
	var container = $(".services-container"),
		sl = container.find(".services-sides"),
		l = container.find(".side-left"),
		lImg = l.find(".image__cover"),
		r = container.find(".side-right"),
		rImg = r.find(".image__cover");

	sl.on("mouseenter", function(e){

		if($(e.target).parents('.side-left').size()){

				TweenLite.to(l, 1, { width: "55%", ease: Power3.easeOut});
				TweenLite.to(r, 1, { width: "45%", ease: Power3.easeOut});
				TweenLite.to(rImg, 1, { opacity: "0.2", ease: Power3.easeOut});
				TweenLite.to(lImg, 1, { opacity: "0.4", ease: Power3.easeOut});
		} else {

				TweenLite.to(l, 1, { width: "45%", ease: Power3.easeOut});
				TweenLite.to(r, 1, { width: "55%", ease: Power3.easeOut});
				TweenLite.to(rImg, 1, { opacity: "0.4", ease: Power3.easeOut});
				TweenLite.to(lImg, 1, { opacity: "0.2", ease: Power3.easeOut});
		}
	});

	container.on("mouseleave", function(){

			TweenLite.to(l, 1, { width: "50%", ease: Power3.easeOut});
			TweenLite.to(r, 1, { width: "50%", ease: Power3.easeOut});
			TweenLite.to(rImg, 1, { opacity: "0.4", ease: Power3.easeOut});
			TweenLite.to(lImg, 1, { opacity: "0.4", ease: Power3.easeOut});
	});
};

$(document).ready(function() {
	// menu
	function menuTrigger() {
		var trigger = $(".navbar__wrap"),
			menuContent = trigger.parent().find(".navbar__content"),
			burger = trigger.find(".hamburger-inner"),
			navbarText = trigger.find(".navbar_text-inner"),
			textClose = navbarText.data("close"),
			textOpen = navbarText.data("open");

		trigger.on("click", function(){
			if(!$(this).hasClass("open")) {
				$(this).addClass("open");
				menuContent.fadeIn({
					duration: 150,
					complete: function(){
						$(this).addClass("open");
						burger.addClass("open");
						navbarText.find("span").text(textClose);
					}
				});
			} else {
				$(this).removeClass("open");
				menuContent.removeClass("open").delay(300).fadeOut(150);
				burger.removeClass("open");
				navbarText.find("span").text(textOpen);
			}
		});

		menuContent.on("click", function(){
			trigger.removeClass("open");
			menuContent.removeClass("open").delay(300).fadeOut(150);
			burger.removeClass("open");
			navbarText.find("span").text(textOpen);
		});

		menuContent.find(".navbar__content-slice").on("click", function(e){
			e.stopPropagation();
		});
	} menuTrigger();

	$("[data-modal]").on("click", function(){
		var data = $(this).data("modal");
		modalWindow(data);
		return false;

	});

	function modalWindow(data) {
		var popupSelector = $("[data-modal-popup='" + data + "']"),
			innerSelectop = popupSelector.find(".popup"),
			duration = 350,
			close = popupSelector.find(".close"),
			html = $("html");

		html.addClass("modal-open");
		popupSelector
					.fadeIn({
						duration: duration,
						complete: function (){
							$(this).addClass("open");
						}
					});

		close.add(popupSelector).on("click", function(){
			if(!popupSelector.hasClass("open")) return;

			popupSelector
				.fadeOut({
					duration: duration,
					complete: function () {
						$(this).removeClass("open");
						html.removeClass("modal-open");
					}
				})
		});

		innerSelectop.on("click", function(event){
			event.stopPropagation();
		});
	};

	// scroll3316();
});


