(function(){

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight
	var BG_effect = BG_effect || {
		width : "", 
		height : "", 
		$bg_container : "", 
		bg_canvas : "", 
		ctx : "", 
		circles : "", 
		target : "", 
		animateHeader : true,

		init: function(){
			width = windowWidth;
		  	height = windowHeight;
		  	target = {x: 0, y: height};
		  	this.$bg_container = $('#background-1').height(height);
		  	this.bg_canvas = document.getElementById('demo-canvas');

		  	this.bg_canvas.width = width;
			this.bg_canvas.height = height;
			
			this.ctx = this.bg_canvas.getContext('2d');

			this.circles = [];
			for(var x = 0; x < 10; x++) {
				var c = new this.Circle();
				this.circles.push(c);
			}
			this.animate();
		},

		animate: function() {
			if(this.animateHeader) {
				this.ctx.clearRect(0,0,width,height);
				for(var i in this.circles) {
				  this.circles[i].draw();
				}
			}
			requestAnimationFrame(this.animate.bind(this));
		},

		// Canvas manipulation
		Circle : function() {
		  var _this = this;
		  
		  // constructor
		  (function() {
		    _this.pos = {};
		    init();
		  })();
		  
		  function init() {
		    _this.pos.x = Math.random()*width;
		    _this.pos.y = Math.random()*height;
		    _this.alpha = 0.1+Math.random()*0.3;
		    _this.scale = 2 + Math.random()* 1;
		    _this.velocity = Math.random() + 0.5;
		    _this.horizontal = Math.random() < 0.5 ? -1 : 1;
		    _this.vertical = Math.random() < 0.5 ? -1 : 1;
		  }
		  this.draw = function() {
		    
		    if( (_this.pos.y - _this.scale*10) < 0) {
		      _this.vertical = 1;
		    }
		    if((_this.pos.y + _this.scale*10) > height) {
		      _this.vertical = -1;
		    }
		    
		    if((_this.pos.x- _this.scale*10) < 0) {
		      _this.horizontal = 1;
		    }
		    if((_this.pos.x + _this.scale*10) > width) {
		      _this.horizontal = -1;
		    }
		    
		    
		    if(_this.vertical < 0){
		      _this.pos.y -= _this.velocity;
		    }
		    else{
		      _this.pos.y += _this.velocity;
		    }
		    
		    if(_this.horizontal < 0){
		      _this.pos.x -= _this.velocity;
		    }
		    else{
		      _this.pos.x += _this.velocity;
		    }
		    
		    BG_effect.ctx.beginPath();
		    BG_effect.ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
		    BG_effect.ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
		    BG_effect.ctx.fill();
		    
		  };
		  
		}
	}
	

	var siteInteract = siteInteract || {
		position : 0,
		nbSlides : 3,
		init: function(){

			this.events();
		},

		events: function(){
			$('#ip-container').find('section').each(function(index, item){
				$(item).width(windowWidth);
				$(item).height(windowHeight);
			});

			this.checkPosition();

			var self = this;
			$('.nav-demo').on('click', function(){

				var goTop = ($(this).is('.nav-prev'))? true : false;

				if(goTop){
					siteInteract.position++; 
					$('html, body').animate({
					    scrollTop: $(window).scrollTop() - windowHeight
					}, 500, siteInteract.checkPosition);

				}
				else{
					siteInteract.position--; 
					$('html, body').animate({
					    scrollTop: $(window).scrollTop() + windowHeight
					}, 500, siteInteract.checkPosition);
				}
			});
		},

		checkPosition: function(){
			console.log(siteInteract.nbSlides);

			(siteInteract.position === 0)? $('.nav-demo.nav-prev').hide() : $('.nav-demo.nav-prev').show()
			(siteInteract.position === siteInteract.nbSlides)? $('.nav-demo.nav-next').hide() : $('.nav-demo.nav-next').show()
		}
	}
	

	

	/********/
	/* LOAD */
	/********/
	if(document.all) {
		BG_effect.init();
		siteInteract.init();
	} else {
		$(function() {
			BG_effect.init();
			siteInteract.init();
		});
	}

})();