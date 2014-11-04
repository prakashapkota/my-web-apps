(function($){

	var main_video_current_time = 0, // timer for the video of step3
		main_video_switch_time = 0, //timestamp when camera change
		window_width = $( window ).width(),
		window_height = $( window ).height(),
		allTrainingVideoLoaded = false;

	window.preload_videos = window.preload_videos || {
		$el : $('#preloadContainer'), 
		videoArray: [ 'video8m', 'video-8m-2', 'video-9m', 'video-10m', 'video-7m', 'video-10m-2' ],
		videoStep: 0,

		init: function(){
			this.load1();
		},
		
		load1: function(){
			var teaser_video = document.createElement('video');
			var videoUrl = 'dock';
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

			this.$el.append(teaser_video);
			$(teaser_video).on('canplaythrough',  function() {
			    console.log("load1 : Preload started");
			    teaser_video.pause();
			    preload_videos.load2();
			    load_states.init();
			});
			//console.log(teaser_video.readyState);

			/*$(teaser_video).on('timeupdate', function() {
				console.log(teaser_video.readyState);
		    });

			teaser_video.onreadystatechange = function(){
				console.log('new ready state' + teaser_video.readyState);
				if ( teaser_video.readyState === 4 ) {
				    console.log('ready state changed to 4');
				}
			}*/
			
		},

		load2: function(){
			var teaser_video = document.createElement('video');
			var videoUrl = 'river';
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

			this.$el.append(teaser_video);
			$(teaser_video).on('canplaythrough',  function() {
			    console.log("load2 : Preload started");
			    teaser_video.pause();
			    preload_videos.load3();
			});
		},
		

		load3: function(){
			
			var teaser_video = document.createElement('video');
			teaser_video.setAttribute("class", "game-video");
			var videoUrl = this.videoArray[this.videoStep];
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="videos/'+ videoUrl +'.mp4" type="video/mp4" /><source src="videos/'+ videoUrl +'.webm" type="video/webm" /><source src="videos/'+ videoUrl +'.ogv" type="video/ogg" />Not Supported text');

			this.$el.append(teaser_video);
			$(teaser_video).on('canplaythrough',  function() {
			    console.log("load3 : Preload started for "+ videoUrl);
			    preload_videos.videoStep++;
			    teaser_video.pause();
			    if(preload_videos.videoStep > (preload_videos.videoArray.length-1)){
			    	allTrainingVideoLoaded = true;
			    	return;
			    }
			    else{
			    	preload_videos.load3();
			    }
			    
			});
		},

		reloadTimer: [],

		preload_more:  function(timestamp){
			
			console.log('preload_more videos called, timestamp' + timestamp);

			console.log( $.inArray(timestamp, this.reloadTimer) );

			if ( $.inArray(timestamp, this.reloadTimer) < 0){
				console.log('preload_more valided, timestamp' + timestamp);

				$('video.game-video').each(function(index, item){
					console.log(item);
					item.currentTime = timestamp;
					item.play();

					item.pause();
				});

			}
			this.reloadTimer.push(timestamp);
		}
	}
	preload_videos.init();
	

	window.load_states = window.load_states || {

		init: function(){
			console.log('init');

			this.$el = $('#page .videoContainer');
			this.$videoContainer =  this.$el.find( '.videoWrapper' );
			this.initVideoUrl = "dock";
			this.teaser1();

		},

		teaser1: function(){


			this.BV = new $.BigVideo({
				useFlashForFirefox: false,
				forceAutoplay: false,
				controls: true,
				doLoop: false,
				container: this.$videoContainer,
				shrinkable: false,
				autoplay: false
			});

		    this.BV.init();

		    if (Modernizr.touch) {
		    	this.BV.show('img/video-poster.jpg');
		    }
		    else{
		    	this.BV.show([
		    		{ type: "video/mp4",  src: "videos/"+this.initVideoUrl+".mp4" },
		    		{ type: "video/webm",  src: "videos/"+this.initVideoUrl+".webm" },
			        { type: "video/ogg",  src: "videos/"+this.initVideoUrl+".ogv" }
			    ]);
		    }

		    this.player = this.BV.getPlayer();

		    this.player.poster('img/video-poster.jpg');

		    var self = this;
		    var video = this.player.ready(function(){

		    	var lengthOfVideo = self.player.duration();

		    	self.player.on('canplaythrough', function() {
				    console.log("Can play through video without stopping");
				    self.player.play();
				});

				self.player.on('loadstart', function(){
				    console.log("Starting to load video");
				});

				self.player.on('canplay', function(){
					console.log('canplay');
				});

				self.player.on('play', function(){
			    	console.log('play');
			    });

			    self.player.on('ended', function() {
			    	console.log('teaser1 ended');
			    	load_states.teaser2();
				});

				self.player.on('loadedmetadata', function() {
					console.log("Meta data for video loaded");
				});

		    });

		},

		teaser2: function(){
			console.log('teaser2 started');
			var videoUrl = "river";

			load_states.BV.show([
	    		{ type: "video/mp4",  src: "videos/"+videoUrl+".mp4" },
    			{ type: "video/webm",  src: "videos/"+videoUrl+".webm" },
	        	{ type: "video/ogg",  src: "videos/"+videoUrl+".ogv" }
	    	]);
			this.player.poster('img/video-poster2.jpg');

			this.player.off('ended');

			this.player.on('ended', function() {
		    	console.log('teaser2 ended');
		    	if(allTrainingVideoLoaded){
		    		load_states.gameStart();
		    	}
		    	else{
		    		load_states.teaser2();
		    	}
			});

		},

		gameStart: function(){

			var main_video_switch_time = 0;

			console.log('gameStart');
			this.$videoContainer.addClass('reduceHeight');

			$('#bottomNav').show();
			$('#big-video-control-container').css('opacity', 1);
			var videoUrl = "video8m";

			load_states.BV.show([
	    		{ type: "video/mp4",  src: "videos/"+videoUrl+".mp4" },
    			{ type: "video/webm",  src: "videos/"+videoUrl+".webm" },
	        	{ type: "video/ogg",  src: "videos/"+videoUrl+".ogv" }
	    	]);
			this.player.poster('img/video-poster3.jpg');

	    	this.player.off('ended');

			this.player.on('ended', function() {
		    	console.log('gameStart ended');
		    	load_states.gameEnded();
			});

			var self = this;
			$('#changeCamera a').on('click', function(e){
				e.preventDefault();

				self.player.pause();
				main_video_switch_time = self.player.currentTime();

				console.log('click event time : ', main_video_switch_time);
				var videoUrl = $(this).attr('href');
				self.BV.show([
		    		{ type: "video/mp4",  src: videoUrl },
	    			{ type: "video/webm",  src: videoUrl },
		        	{ type: "video/ogg",  src: videoUrl }
		    	]);

				self.player.play();

				$('#changeCamera li').removeClass('active');
				$(this).closest('li').addClass('active');

			});

			this.player.on('loadedmetadata', function(){

		    	console.log('loadedmetadata : jump-timer', main_video_switch_time );

		    	self.player.currentTime(main_video_switch_time);
		    });


		    this.player.on('timeupdate', function(){
		    	main_video_current_time = self.player.currentTime();
		    	//console.log( main_video_current_time );
		    	if( (main_video_current_time > 1) && (( Math.floor(main_video_current_time) % 50) == 0) ) {
		    		console.log('reload all videos');
		    		preload_videos.preload_more( Math.floor(main_video_current_time) );
		    	}
		    });


		},

		gameEnded: function(){
			console.log('gameEnded started');	
		}	

	};


	/*window.BV = new $.BigVideo({
			useFlashForFirefox:false,
			forceAutoplay:false,
			controls: true,
			doLoop: false,
			container: $('.videoWrapper'),
			shrinkable: false,
			autoplay: true
	});

    BV.init();
    if (Modernizr.touch) {
    	BV.show('img/video-poster.jpg');
    }
    else{
    	BV.show([
    		{ type: "video/mp4",  src: "videos/dock.mp4" },
    		{ type: "video/webm",  src: "videos/dock.webm" },
	        { type: "video/ogg",  src: "videos/dock.ogv" }
	        

	    ]);
    }

    var player = BV.getPlayer();

	


	var video = player.ready(function(){
		var myPlayer = this;
		var lengthOfVideo = myPlayer.duration();

		console.log(lengthOfVideo);

		myPlayer.on('canplay', function(){
			console.log('canplay');
		})

		myPlayer.on('progress', function(){
			//console.log($('video').get(0).buffered.end(0) / $('video').get(0).duration);
			var howMuchIsDownloaded = this.bufferedPercent();
			//console.log(howMuchIsDownloaded * 100);
		});

		myPlayer.on('timeupdate', function() {
			//console.log($('video').get(0).currentTime );
			mainTimer = player.currentTime();

			//console.log(player.currentTime());
	    });
	    myPlayer.on('loadedmetadata', function(){

	    	console.log('loadedmetadata : jump-timer', main_video_switch_time );

	    	player.currentTime(main_video_switch_time);
	    });

	    myPlayer.on('play', function(){
	    	console.log('play');
	    });

	    myPlayer.on('pause', function(){
	    	console.log('pause');
	    });

	    myPlayer.on('ended', function() {
			console.log('ended');
		});

	    myPlayer.on('resize', function(){
	    	console.log('resize');
	    });

	    myPlayer.on('playing', function(){
	    	console.log('playing');
	    });



	});
*/

    

})(jQuery)