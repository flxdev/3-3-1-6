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
			carousel.slick("slickNext")
		});

		prev.on("click", function(event){
			event.preventDefault();
			carousel.slick("slickPrev")
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



});