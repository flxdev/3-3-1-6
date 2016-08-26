window.onload = function(){
	var body = document.querySelector(".out");

	body.classList.add("load-page")

}
//main gallery image
function galleryImage(){
	var carousel_container = $(".projects-gallery"),
		carousel = carousel_container.find(".gallery-carousel"),
		next = carousel_container.find(".pagination-item__right"),
		prev = carousel_container.find(".pagination-item__left"),
		current = carousel_container.find(".pagination-current"),
		all = carousel_container.find(".pagination-all");

		carousel.on("init", function(slick){
			var l = $(this).find(".slick-slide").length;

			if(l < 10) {
				l = "0" + l;
			} else {
				l = l;
			}

			all.text(l)

			var $firstAnimatingElements = $('div.slick-slide:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});

		carousel.on("beforeChange", function(e, slick, currentSlide, nextSlide){

			var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});

		carousel.slick({
			rows: 2,
			slidesPerRow: 1,
			arrows: false,
			fade: true
		});

		carousel.on("afterChange", function(slick, currentSlide){
			var l = $(this).slick("slickCurrentSlide") + 1;

			if(l < 10) {
				l = "0" + l;
			} else {
				l = l;
			}

			current.text(l)
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

	scroll3316();

});


