window.onload = function(){
	var body = document.querySelector('.out');

	body.classList.add('load-page')

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
						$(this).addClass('open');
						burger.addClass("open");
						navbarText.find("span").text(textClose);
					}
				});
			} else {
				$(this).removeClass("open");
				menuContent.removeClass('open').delay(300).fadeOut(150);
				burger.removeClass("open");
				navbarText.find("span").text(textOpen);
			}
		});

		menuContent.on("click", function(){
			trigger.removeClass("open");
			menuContent.removeClass('open').delay(300).fadeOut(150);
			burger.removeClass("open");
			navbarText.find("span").text(textOpen);
		});

		menuContent.find(".navbar__content-slice").on("click", function(e){
			e.stopPropagation();
		});
	} menuTrigger();

});