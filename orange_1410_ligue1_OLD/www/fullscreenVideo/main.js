(function($){

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
            var videoUrl = 'dock';
            $(teaser_video).attr('preload', 'auto');
            $(teaser_video).attr('autoplay', 'autoplay');

            $(teaser_video).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

            this.$el.append(teaser_video);
            $(teaser_video).on('canplaythrough',  function() {
                console.log("load1 : Preload started");
                teaser_video.pause();
                preload_videos.load2();
                load_states.init();
            });
        },

        load2: function(){
            var teaser_video = document.createElement('video');
            var videoUrl = 'river';
            $(teaser_video).attr('preload', 'auto');
            $(teaser_video).attr('autoplay', 'autoplay');

            $(teaser_video).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

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

            $(teaser_video).html('<source src="../videos/'+ videoUrl +'.mp4" type="video/mp4" /><source src="videos/'+ videoUrl +'.webm" type="video/webm" /><source src="videos/'+ videoUrl +'.ogv" type="video/ogg" />Not Supported text');

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

            this.teaser_video1 = document.createElement('video');
            var videoUrl = 'dock';
            $(this.teaser_video1).attr('preload', 'auto');
            $(this.teaser_video1).attr('autoplay', 'autoplay');

            $(this.teaser_video1).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

            this.$el.append(this.teaser_video1);

            $(this.teaser_video1).on('canplaythrough',  function() {
                console.log("this.teaser_video1 started play");
                console.log(this);
            });

            $(this.teaser_video1).on('ended', function(){
                console.log('teaser1 ended');
                load_states.teaser2();
            });

        },

        teaser2: function(){

            this.teaser_video2 = document.createElement('video');
            var videoUrl = 'river';
            $(this.teaser_video2).attr('preload', 'auto');
            $(this.teaser_video2).attr('autoplay', 'autoplay');

            $(this.teaser_video2).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

            this.$el.append(this.teaser_video2);

            $(this.teaser_video2).on('canplaythrough',  function() {
                console.log("this.teaser_video2 started play");
                console.log(this);
            });

            $(this.teaser_video2).on('ended', function() {
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

            videoArray= [ 'video8m', 'video-8m-2', 'video-9m', 'video-10m' ];
            
            this.gameVideo = [];

            for( var i = 0; i< videoArray.length; i++){
                this.gameVideo[i] = document.createElement('video');
                var videoUrl = videoArray[i];
                $(this.gameVideo[i]).attr('preload', 'auto');
                $(this.gameVideo[i]).attr('autoplay', 'autoplay');

                $(this.gameVideo[i]).html('<source src="../videos/'+videoUrl+'.mp4" type="video/mp4" /><source src="videos/'+videoUrl+'.webm" type="video/webm" /><source src="videos/'+videoUrl+'.ogv" type="video/ogg" />Not Supported text');

                this.$el.append(this.gameVideo[i]);

                $(this.gameVideo[i]).on('canplaythrough',  function() {
                    this.pause();
                    if(i == 6){
                        his.gameVideo[0].play();
                    }
                });


            }

            // var videoUrl = "video8m";

            // load_states.BV.show([
            //     { type: "video/mp4",  src: "videos/"+videoUrl+".mp4" },
            //     { type: "video/webm",  src: "videos/"+videoUrl+".webm" },
            //     { type: "video/ogg",  src: "videos/"+videoUrl+".ogv" }
            // ]);
            // this.player.poster('img/video-poster3.jpg');

            // this.player.off('ended');

            // this.player.on('ended', function() {
            //     console.log('gameStart ended');
            //     load_states.gameEnded();
            // });

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

            // this.player.on('loadedmetadata', function(){

            //     console.log('loadedmetadata : jump-timer', main_video_switch_time );

            //     self.player.currentTime(main_video_switch_time);
            // });


            // this.player.on('timeupdate', function(){
            //     main_video_current_time = self.player.currentTime();
            //     //console.log( main_video_current_time );
            //     if( (main_video_current_time > 1) && (( Math.floor(main_video_current_time) % 50) == 0) ) {
            //         console.log('reload all videos');
            //         preload_videos.preload_more( Math.floor(main_video_current_time) );
            //     }
            // });


        },

        gameEnded: function(){
            console.log('gameEnded started');   
        }   

    };

    

})(jQuery)