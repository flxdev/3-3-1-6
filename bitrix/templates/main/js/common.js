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

//function form

var transitionsEvents = {
	'WebkitTransition': 'webkitTransitionEnd',
	'MozTransition': 'transitionend',
	'OTransition': 'oTransitionEnd',
	'msTransition': 'MSTransitionEnd',
	'transition': 'transitionend'
},
transitionsEvent = transitionsEvents[Modernizr.prefixed("transition")],
support = { transitions : Modernizr.csstransitons };

function extend( a, b ) {
	for( var key in b ) { 
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}

function stepForm(el, options) {
	this.el = el
	this.options = extend( {}, this.options );
  	extend( this.options, options );
	this._init();
};

stepForm.prototype.options = {
	onSubmit : function() {
		return false;
	}
}

stepForm.prototype._init = function () {
	this.current = 0

	this.quest = [].slice.call($(this.el).find("ol.form-area > li"));
	this.questCount = this.quest.length

	$(this.quest[0]).addClass("current");

	this.btnNext = $(this.el).find(".next");

	this.progress = $(this.el).find(".progress");

	this.questStatus = $(this.el).find(".pagin");
	this.currentNum = $(this.el).find(".pagin-current");
	$(this.currentNum).text("0" + (this.current + 1));

	this.totalNum = $(this.el).find(".pagin-total");
	$(this.totalNum).text("0" + this.questCount);

	this.error = $(this.el).find(".error-message");

	this.crossClose = $(this.el).parents(".modal__wrapper").find(".close-modal");
	this.close = $(this.el).find(".message-close");
 
	this._initEvents();

};

stepForm.prototype._initEvents = function(){
	var self = this;

	firstEL = $(this.quest[this.current]).find("input");

	focusStartFn = function(){
		// firstEL.unbind("focus", focusStartFn);
		$(self.btnNext).addClass("show");
	};

	firstEL.on("focus", focusStartFn);

	this.btnNext.on("click", function(ev){
		ev.preventDefault();
		self._nextStep();
	});

	this.crossClose.add(this.close).on("click", function(ev){
		ev.preventDefault()
		setTimeout(function(){
			self._close();
		}, 300);
	});

	firstEL.on("keydown", function(ev){
		var codeKey = ev.keyCode;

		if(codeKey === 13) {
			ev.preventDefault();
			self._nextStep();
		}
	});

	$(this.el).on("keydown", function(ev){
		var codeKey = ev.keyCode;

		if(codeKey === 9) {
			ev.preventDefault();
		}
	});
};

stepForm.prototype._nextStep = function(){

	if(!this._validate()) {
		return false;
	}

	if(this.current === this.questCount - 1) {
		this.isFilled = true;
	}

	this._clearError();

	var currentQuest = this.quest[this.current];

	++this.current;

	this._progress();

	if(!this.isFilled){

		this._updateNumbers();

		$(this.el).find(".form-container__inner").addClass("show-next");

		var nextQuest = this.quest[this.current];

		$(currentQuest).removeClass("current");
		$(nextQuest).addClass("current");
	};


	var self = this,
		onTransitionsEventFn = function(ev){
			if( support.transitions ) {
				$(this).unbind(transitionsEvent, onTransitionsEventFn);
			}
		
			if(self.isFilled) {
				self._submit()
			} else {
				$(self.el).find(".form-container__inner").removeClass("show-next");

				$(self.currentNum).text($(self.nextQuestNum).text());

				$(self.questStatus).find(self.nextQuestNum).remove();
				$(nextQuest).find("input").focus();
			}
		};
	if(support.transition) {
		$(this.progress).on(transitionsEvent, onTransitionsEventFn);
	} else {
		onTransitionsEventFn();
	}
};

stepForm.prototype._progress = function(){
	$(this.progress).css("width", this.current * (100 / this.questCount) + "%")
};

stepForm.prototype._updateNumbers = function(){
	this.nextQuestNum = document.createElement("span");
	$(this.nextQuestNum).addClass("pagin-next");
	$(this.nextQuestNum).text("0" + (this.current + 1));

	$(this.questStatus).append(this.nextQuestNum);
};

stepForm.prototype._submit = function(){
	this.options.onSubmit(this.el);
};

stepForm.prototype._validate = function(){
	console.log(this.current)
	var input = $(this.quest[ this.current ]).find("input").val();
	if(input === "") {
		this._showError("EMPTYSTR");
		return false;
	}

	return true;
};

stepForm.prototype._showError = function(err){
	var message = "";
	switch(err) {
		case "EMPTYSTR" :
			message = "Please fill the field before continuing";
			break;
	};
	$(this.error).text(message);
	$(this.error).addClass("show");
};

stepForm.prototype._clearError = function(){
	$(this.error).removeClass("show");
}

stepForm.prototype._close = function(){
	this.current = 0
	$(this.el).trigger("reset");
	$(".form-container__inner").removeClass("hide");
	$(".final-message").removeClass("show");
	$(this.quest[0]).addClass("current").siblings().removeClass("current");
	$(this.progress).css("width", "0");
	$(this.currentNum).text("0" + (this.current + 1));
	this.isFilled = false;
	$(this.btnNext).removeClass("show");
}

window.stepForm = stepForm;

$(document).ready(function() {
	// menu
	function menuTrigger() {
		var trigger = $(".navbar__wrap"),
			menuContent = trigger.parent().find(".navbar__content"),
			burger = trigger.find(".hamburger-inner"),
			navbarText = trigger.find(".navbar_text-inner"),
			textClose = navbarText.data("close"),
			textOpen = navbarText.data("open"),
			overlay = $(".overlay"),
			t = new TimelineLite();

		trigger.on("click", function(){
			if(!$(this).hasClass("open")) {
				$(this).addClass("open");
				showOverlay();
				t
					.to(menuContent, 0.5, {x: "0%", className: '+=open'})

				burger.addClass("open");
				navbarText.find("span").text(textClose);
			} else {
				$(this).removeClass("open");
				burger.removeClass("open");
				navbarText.find("span").text(textOpen);
				hideOverlay();
				t
					.to(menuContent, 0.5, {x: "+=100%", className: '-=open'})
			}
		});

		overlay.on("click", function(){
			trigger.removeClass("open");
			burger.removeClass("open");
			navbarText.find("span").text(textOpen);
			t
				.to(menuContent, 0.5, {x: "+=100%", className: '-=open'})
			hideOverlay();
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

	//order form
	
	$("[data-order]").on("click", function(event){
		var data = $(this).data("order");
		orderForm(data);
		event.preventDefault();
	});


	function orderForm(modal){
		var overlay = $(".overlay"),
			mCont = $("[data-modal-order=" + modal + "]"),
			close = mCont.find(".close-modal"),
			msgClose = mCont.find(".message-close");

			t = new TimelineLite();

			showOverlay();
			t
				.to(mCont, 0.5, {x: "0%"})
		
		overlay.add(close).add(msgClose).on("click", function(){
			hideOverlay();
			var t = new TimelineLite();
			t
				.to(mCont, 0.5, {x: "+=100%"})
		});

	};


	function showOverlay(){
		var o = $(".overlay"),
		t = new TimelineLite();

		t
			.to(o, 0.5, {autoAlpha: 1});
	};

	function hideOverlay(){
		var o = $(".overlay"),
		t = new TimelineLite();
		
		t
			.to(o, 0.5, {autoAlpha: 0});
	}	

	// scroll3316();


});


