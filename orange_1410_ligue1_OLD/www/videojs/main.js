$(document).ready(function() {

	var main_video_current_time = 0, // timer for the video of step3
		main_video_switch_time = 0, //timestamp when camera change
		window_width = $( window ).width(),
		window_height = $( window ).height(),
		allTrainingVideoLoaded = false;

	window.preload_videos = window.preload_videos || {
		$el : $('#preloadContainer'), 
		videoArray: [ 'video8m', 'video-8m-2', 'video-9m', 'video-10m' ],
		videoStep: 0,

		init: function(){
			this.load1();
		},
		
		load1: function(){
			var teaser_video = document.createElement('video');
			$(teaser_video).width(1); $(teaser_video).height(1);
			var videoUrl = 'dock';
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="../videos/'+videoUrl+'.webm" type="video/webm" /><source src="../videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

			this.$el.append(teaser_video);
			$(teaser_video).on('canplaythrough',  function() {
			    console.log("load1 : Preload started");
			    teaser_video.pause();
			    preload_videos.load2();
			    window.App.init();
			});

			
		},

		load2: function(){

			var teaser_video = document.createElement('video');
			$(teaser_video).width(1); $(teaser_video).height(1);
			var videoUrl = 'river';
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="../videos/'+videoUrl+'.webm" type="video/webm" /><source src="../videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

			this.$el.append(teaser_video);
			$(teaser_video).on('canplaythrough',  function() {
			    console.log("load2 : Preload started");
			    teaser_video.pause();
			    preload_videos.load3();
			});
		},
		

		load3: function(){
			
			var teaser_video = document.createElement('video');
			$(teaser_video).width(1); $(teaser_video).height(1);

			teaser_video.setAttribute("class", "game-video");
			var videoUrl = this.videoArray[this.videoStep];
			$(teaser_video).attr('preload', 'auto');
			$(teaser_video).attr('autoplay', 'autoplay');

			$(teaser_video).html('<source src="../videos/'+ videoUrl +'.mp4" type="video/mp4" /><source src="../videos/'+ videoUrl +'.webm" type="video/webm" /><source src="../videos/'+ videoUrl +'.ogv" type="video/ogg" />Not Supported text');

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
		}
	}

	//preload_videos.init();
	
	window.App = window.App || {

		main_video_timer: 0,

		init: function(){
			this.teaser1();
			

		},
		teaser1: function(){
			var $el = $('#teaser1');
			this.renderVideo($el, 'river', "1");

			
			$el.show();

			var teaser1_Player = videojs('video_teaser_1', { }, function() {


				var lengthOfVideo = this.duration(); //only video playing condition

				this.on('loadstart', function(){
					console.log('loadStart');
				});

				this.on('load', function(){
					console.log('data loaded');
				});
				
				this.on('play', function(){
					console.log('play');
				});

				this.on('progress', function(){
					console.log('progress');

					var howMuchIsDownloaded = this.bufferedPercent();
					console.log(howMuchIsDownloaded);
				});

				this.on('seeked', function(){
					console.log('seeked');
				});

				this.on('seeking', function(){
					console.log('seeking');
				});

				this.on('waiting', function(){
					console.log('waiting');
				});

				this.on('firstplay', function(){
					console.log('firstPlay');

					main_video_timer = this.currentTime();
					console.log(main_video_timer);
				});

				this.on('loadedalldata', function(){
					console.log('loadedalldata');
				});

				this.on('canplaythrough', $.proxy(function(){
					console.log('canplaythrough');
					this.play();
				},this));				

				this.on('timeupdate',$.proxy(function(){
					//this.pause();
					
				}, this));

				this.on('ended', function(){
					console.log('teaser1 ended');
					$el.hide();
					App.teaser2();
					//this.loop();
				});



			});


		},

		teaser2: function(){
			var $el = $('#teaser2');
			this.renderVideo($el, 'dock', "2");

			$el.show();

			var teaser2_Player = videojs('video_teaser_2', { }, function() {

				this.on('play', function(){
					console.log('play');
				});

				this.on('canplaythrough', $.proxy(function(){
					console.log('canplaythrough');
					this.play();
				},this));		

				this.on('ended', function(){
					console.log('teaser2 ended');
					App.teaser3();
					$el.hide();
				});

			});

		},

		teaser3: function(){

			console.log('teaser3 started');
			videoArray =  [ 'video8m', 'video-8m-2', 'video-9m', 'video-10m' ];


			var $el = $('#teaser3');
			var playerList = [];

			for(var i=0; i<videoArray.length; i++){
				this.renderVideo( $el, videoArray[i], "game"+i );

				playerList.push(
					videojs('video_teaser_game'+i, { }, function() {

						this.on('play', function(){
							console.log('play');
						});

						this.on('canplaythrough', $.proxy(function(){
							console.log('canplaythrough');
							this.play();
						},this));		

						this.on('ended', function(){
							console.log('teaser3 video ended');
						});

					})
				);

			}
			$el.show();

			
		},

		renderVideo: function($el, videoUrl, videoId){

			$el.append('<video class="example_video_'+videoId+'" id="video_teaser_'+videoId+'" class="video-js vjs-default-skin" preload="auto" poster="http://video-js.zencoder.com/oceans-clip.png" data-setup="{ }"> <source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="../videos/'+videoUrl+'.webm" type="video/webm" /> <source src="../videos/'+videoUrl+'.ogv" type="video/ogg" /> </video>');
		} 

	};


	window.App.init();


	
	


	$('#bottomNav a').on('click', function(e){
		e.preventDefault();

		var target = $(this).attr('href');
		console.log(target);
		$('.tab').removeClass('active');
		$(''+target).addClass('active');
		$('#bottomNav a').closest('li').removeClass('active');
		$(this).closest('li').addClass('active');

		var thenum = parseInt(target.match(/\d+/)[0], 10);

		console.log(thenum);

		switch (thenum) {

			    case 1:
			        player1.currentTime = main_video_timer;
			        player1.play();

			        break;
			    case 2:
			       player2.currentTime = main_video_timer;
			       player2.play();
			        break;
			    case 3:
			        player3.currentTime(main_video_timer);
			        player3.play();
			        break;
			    case 4:
			        player4.currentTime(main_video_timer);
			        player4.play();
			        break;
			    case 5:
			        player5.currentTime(main_video_timer);
			        player5.play();
			        break;
			    case 6:
			        player6.currentTime(main_video_timer);
			        player6.play();
			        break;
			}

	});


});