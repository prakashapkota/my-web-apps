$(document).ready(function () {

	var interval;
	var bg_img_x=0;
	var bird;
	var bird_x=100;
	var bird_y=50;
	var bird_state=1;
	var isDragging = false;
	var canvasWidth = 1200;
	var canvasHeight = 800;

	var game_area = document.getElementById('game_area');
	game_area.width = canvasWidth; 
    game_area.height = canvasHeight; 
	
 	// IMAGE BIRD
    var image_bird = new Image();  
	image_bird.src = "img/bird.png";  

	$(image_bird).load(function() {  
		
		/*var cntx_bird =game_area.getContext('2d');*/
		bird = sprite({
		    context: game_area.getContext("2d"),
		    width: 180,
		    height: 115,
		    image: image_bird,
		    draggable: true
		});
	
		bird.render();

	});  

 	// IMAGE MoUNTAIN
    var image_mont = new Image();  
	image_mont.src = "img/mountain.png";  
	
	
	// Images Load CALLBACK
	$(image_mont).load(function() {  
		var cntx_BGimg =game_area.getContext('2d');
		cntx_BGimg.drawImage(image_mont, 0, 0, 2220, 312); 
		interval = setInterval(function() { on_enter_frame(cntx_BGimg, image_mont)}, 30); 

	});  

	 
	function on_enter_frame(cntx_BGimg,image_mont){
		cntx_BGimg.clearRect(0, 0, cntx_BGimg.canvas.width, cntx_BGimg.canvas.height);
		cntx_BGimg.drawImage(image_mont, bg_img_x, 0);
		bg_img_x -= 2;
		if (bg_img_x < -1000) {
			bg_img_x = 0;
		}

		interval = interval +1;
		if(interval%4 == 1){
			bird_state++;
			if(bird_state>2){
				bird_state =1;
			}
			var frame_Left = bird.width * bird_state;
		}
		bird.render(frame_Left);
	}	

	function sprite (options) {			
	    var that = {};
						
	    that.context = options.context;
	    that.width = options.width;
	    that.height = options.height;
	    that.image = options.image;
	    that.render = function (frame_Left) {
	    var frame_Left = frame_Left || 0;	
        // Draw the animation
        that.context.drawImage(
           that.image,
           frame_Left,
           0,
           that.width,
           that.height,
           bird_x,
           bird_y,
           that.width,
           that.height
           );
    	};
	    return that;
	}

    

});


