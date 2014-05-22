/*!
 * jQuery YtbPlayer Plugin
 *
 * Requires SWFObject - http://code.google.com/p/swfobject/
 *
 * Created by: Fabien LAILLIAU
 * Modified and fixed by: Viven RIPOCHE and Nicolas CHESNE
 *
 * HTML Item example : <div class="player" data-ytbsrc="kfVsfOSbJY0" data-srt="./srt/video.srt" data-thumb="./img/thumb.jpg"></div>
 * Plugin attachment : $('.player').marcelYtbPlayer();
 * Data attributes   : data-ytbsrc: youtube id
 *                   : data-thumb: thumb image on the video
 *                   : data-srt: srt file for subtitles
 *                   : data-html5: if it is true, the html5 is forced
 * Events triggered  : YTBLIBISLOADED on the body
 *                   : YTBISFULLSCREEN on the body
 *                   : YTBISNOTFULLSCREEN on the body
 *                   : YTBISREADY  on the body
 *                   : YTBISPLAYED  on the body
 *                   : YTBISPAUSED  on the body
 * Events listened   : YTBLIBISLOADED on the body
 *                   : YTBPAUSE on the player wrapper
 *                   : YTBSEEK on the player wrapper
 *                   : YTBUNINIT on the player wrapper
 *                   : YTBACTIVE on the player wrapper
 *                   : YTBUNACTIVE on the body
 * Options           : onEnd : custom callback fired at the end of the video
 *                   : volumeSize : defines the sections for volume settings
 *                   : noZeroFormat : removes the 0 before hours and minutes in counter display
 *
 */ (function ($) {
    $.marcelYtbPlayer = function (elt, options) {
        var main = this;
        main.$elt = $(elt);
        main.$items = options.items;
        main.$overlay = false;
        main.index = options.index;
        main.play = false;
        main.isReady = false;
        main.html5 = false;
        main.isControlOpened = true;
        main.thumbSize = {};
        main.volumeSize = options.volumeSize || 4;
        main.noZeroFormat = options.noZeroFormat || false;
        main.hd = false;
        main.sizesRatio = 1280 / 720;

        main.init = function () {
            log('YOUTUBE PLAYER');

            main.idPlayer = "ytb-" + (new Date()).getTime();

            main.$body = $('body');
            main.ytbsrc = main.$elt.data('ytbsrc');
            main.srturl = main.$elt.data('srt');

            main.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
            main.htmlControls = '<div class="control-player ' + main.idPlayer + '"><div class="controlsVideo play"><span>play/pause</span></div><div class="counter"><span class="currentTime"></span><span class="duration"></span></div><div class="ctrl-inner"><div class="controlsMute on">mute/unmute</div><div class="setvolume"></div><div class="controlsFullscreen fullscreen">fullscreen</div></div> <div class="controlsSeekTo progress-inner"><div class="progress"><div class="total"></div><div class="played"></div></div></div></div>';

            $(main.$elt).wrap('<div class="wrapper-player" style="position:relative;overflow:hidden;width:100%;height:100%"></div>');

            if(main.$elt.data('extendcontrol')) {
                $('body').append(main.htmlControls);
            } else {
                $(main.$elt).after(main.htmlControls);
            }

            for(i=0;i<main.volumeSize;i++) {
                $(".setvolume").append("<span class='controlsVolume on item"+i+"'></span>");
            }

            main.$elt.attr('id', main.idPlayer);

            main.$wrapper = main.$elt.parent();

            main.addOverlay();
            main.addLoader();
            main.addThumb();

            main.autoplay = !! main.$elt.data('autoplay');

            main.$wrapper.data('player', main);
            main.$controls = $('.control-player.' + main.idPlayer);
            main.$controls.data('idPlayer', main.idPlayer);

            main.$played = main.$controls.find('div.played');
            main.initControls();
            main.parent = null;
            main.bodyHeight = main.$body.height();

            main.hd = !! main.$elt.data('hd');

            if(main.srturl){
                main.$controls.after('<div class="subtitles"></div>');
                main.$subtitles = main.$controls.next('.subtitles');
                main.loadSubtitles();
            }

            if (main.isMobile || !! main.$elt.data('html5')) {
                main.html5Player();
            } else {
                main.flashPlayer();
            }

            main.$wrapper.on('YTBPAUSE', function() { if(main.play) main.controlsVideo(); });
            main.$wrapper.on('YTBSEEK', main.seekTo);
            main.$wrapper.on('YTBUNINIT', main.unInit);
            main.$wrapper.on('YTBACTIVE', main.activeControl);
            $('body').on('YTBUNACTIVE', main.unactiveControl);

            main.resizeThumb();
            $(window).resize($.proxy(main.resizeThumb, main));
        }
        main.loadSubtitles = function(){
            $.ajax({url: main.srturl, complete: function(response){main.parseSubtitles(response.responseText)}});
        }
        main.parseSubtitles = function(srtTimeLine){
            srtTimeLine = srtTimeLine.replace(/\r\n|\r|\n/g, '\n');
            srtTimeLine = srtTimeLine.replace(/^\s+|\s+$/g,"");
            srtTimeLine = srtTimeLine.split('\n\n');
            main.subtitles = [];
            for(var srt in srtTimeLine){
                st = srtTimeLine[srt].split('\n');
                start = st[1] ? st[1].split(' --> ')[0] : '';
                end = st[1] ? st[1].split(' --> ')[1] : '';
                txt = st[2] ? st[2] : false;
                var ended = tosecond(end);
                var started = tosecond(start);
                if(txt) main.subtitles.push({start: started, end: ended, txt: txt});
            }
            function tosecond(time){
                var s = 0.0;
                var t = time.split(':');
                if(t) {
                    for(i=0;i<t.length;i++)
                        s = s * 60 + parseFloat(t[i].replace(',', '.'))
                }
                return s;
            }
        }

        window.ytbVideos = {};

        main.html5Player = function () {
            main.html5 = true;
            main.player = new YT.Player(main.idPlayer, {
                height: '100%',
                width: '100%',
                videoId: main.ytbsrc,
                playerVars: {
                    'autoplay': (main.autoplay ? 1 : 0),
                    'modestbranding': 0,
                    'showinfo': 0,
                    'controls': 0,
                    'rel': 0,
                    'wmode': 'transparent',
                    'html5': 1,
                    'allowFullScreen': true
                },
                events: {
                    'onReady': main.onPlayerReady,
                    'onStateChange': (function(id){
                        return function(object) {
                            var player = document.getElementById(id);
                            var data = $(player).parent().data('player');

                            switch(object.data){
                                case 0:
                                    data.onEndVideo();
                                    break;
                                case 1:
                                    data.onPlayVideo();
                                    break;
                                default:
                                    data.onPauseVideo();
                                    break;
                            }

                        }
                    })(main.idPlayer)
                }
            });

        }
        main.flashPlayer = function () {

            if(main.ytbsrc.indexOf('http://www.youtube.com/watch?v=')!=-1){
                main.ytbsrc = main.ytbsrc.split('watch?v=')[1];
            }

            var url = ["http://www.youtube.com/v/"];
            url.push(main.ytbsrc);
            url.push("&enablejsapi=1&version=3");
            url.push("&playerapiid=" + main.idPlayer);
            url.push("&rel=0");
            if(main.autoplay) url.push("&autoplay=1");
            url.push("&autohide=0");
            url.push("&controls=0");
            url.push("&showinfo=0");
            url.push("&modestbranding=1");
            url.push("&fmt=6");

            var flashTag = '<object style="visibility:visible" id="' + main.idPlayer + '" width="100%" height="100%" type="application/x-shockwave-flash" data="' + url.join("") + '"><param name="allowScriptAccess" value="always"><param name="movie" value="' + url.join("") + '" /><param name="wmode" value="transparent"></object>';
            main.$wrapper.find('#' + main.idPlayer).remove();
            main.$wrapper.prepend(flashTag);

            onYouTubePlayerReady = function(idPlayer) {
                var player = document.getElementById(idPlayer);

                var randomString = main.randomString();
                window.ytbVideos[randomString] = {};
                window.ytbVideos[randomString].id = idPlayer;
                window.ytbVideos[randomString].onPlayerStateChange = function(state) {
                    var player = document.getElementById(this.id);
                    var data = $(player).parent().data('player');

                    data.player = player;
                    $(player).parent().data('player', data);

                    if(data.hd && state == -1) {
                        data.player.setPlaybackQuality('highres');
                    }
                    switch(state){
                        case -1:
                            $(player).parent().data('player').onPlayerReady();
                            break;
                        case 0:
                            data.onEndVideo()
                            break;
                        case 1:
                            data.onPlayVideo()
                            break;
                        case 2:
                            data.onPauseVideo();
                            break;
                    }
                };
                player.addEventListener("onStateChange", "ytbVideos." + randomString + ".onPlayerStateChange");
            };
        }
        main.randomString = function() {
            var chars = "abcdefghiklmnopqrstuvwxyz";
            var stringLength = 8;
            var randomString = '';
            for (var i=0; i < stringLength; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomString += chars.substring(rnum,rnum+1);
            }
            return randomString;
        }
        main.addThumb = function() {
            var thumb, thumbSize = null;
            var thumbSizeString = '';

            if(thumb = main.$elt.data('thumb')) {
                if(thumbSize = main.$elt.data('thumbsize')) {
                    main.thumbSize = eval("(" + thumbSize + ')');
                    thumbSize = main.getFitSizes();
                    for(var key in  thumbSize) {
                        thumbSizeString += key + ':' + thumbSize[key] + 'px;';
                    }
                    thumbSizeString = ' style="' + thumbSizeString + '"';
                }
                var display = (main.autoplay) ? 'display:none' : 'display:block';
                main.$elt.before('<div class="thumb" style="'+display+';position:absolute;left:0;top:0"><div class="layer" style="width:' + main.$wrapper.width() + 'px;height:' + main.$wrapper.height() + 'px;position:absolute;cursor:pointer;left:0;top:0;z-index:1"></div><img styles="display:block" src="' + thumb + '" alt="" ' + thumbSizeString + '/></div>');
                main.$elt.parent().find('.thumb').on('click', function(event){
                     if(!main.isMobile) main.$controls.find('.play').trigger('click');
                });
            }
        }
        main.addOverlay = function() {
            if(!! main.$elt.data('overlay')) {
                main.$elt.before('<div class="overlay" style="width:' + main.$wrapper.width() + 'px;height:' + main.$wrapper.height() + 'px"> <img src="'+main.$elt.data('overlay')+'"/></div>');
            }

            main.$overlay = main.$wrapper.find('.overlay');
            var firstTime, firstX, firstY = 0;

            main.$overlay.on('click', function(event) { event.preventDefault(); });
            main.$overlay.on('mouseup', function(event) {
                var lastTime = new Date();
                var timeDiff = lastTime.getTime() - firstTime.getTime();
                var xDiff = Math.abs(event.pageX - firstX);
                var yDiff = Math.abs(event.pageY - firstY);

                if(timeDiff < 300 && xDiff < 80 && yDiff < 80) {
                    main.controlsVideo();
                }
            });
            main.$overlay.on('mousedown', function(event) {
                firstX = event.pageX;
                firstY = event.pageY;
                firstTime = new Date();
            });
        }
        main.addLoader = function() {
            main.$elt.before('<div class="loader" style="width:' + main.$wrapper.width() + 'px;height:' + main.$wrapper.height() + 'px"></div>');
        }
        main.removeLoader = function() {
            main.$wrapper.find('.loader').fadeOut(function() {
                $(this).remove();
            });
        }
        main.getFitSizes = function() {
            var outSize = {};
            var itemSize = this.thumbSize;
            var parentSize = {width:this.$wrapper.width(), height:this.$wrapper.height()}
            itemSize.ratio = itemSize.height ? itemSize.width / itemSize.height : 0;
            parentSize.ratio = parentSize.height ? parentSize.width / parentSize.height : 0;
            if(itemSize.ratio < parentSize.ratio) {
                outSize.width = parentSize.width;
                outSize.height = parseInt(itemSize.ratio ? outSize.width / itemSize.ratio : 0, 10);
                outSize['margin-top'] = parseInt((parentSize.height - outSize.height) / 2, 10);
                outSize['margin-left'] = 0;
            } else {
                outSize.height = parentSize.height;
                outSize.width = parseInt(parentSize.height * itemSize.ratio, 10);
                outSize['margin-top'] = 0;
                outSize['margin-left'] = parseInt((parentSize.width - outSize.width) / 2, 10);
            }
            return outSize;
        }
        main.resizeThumb = function() {
            var thumbSize = null;
            var thumbSizeString = '';

            this.$wrapper.height(parseInt(this.$wrapper.width() / this.sizesRatio, 10) + 4);

            $(this.$wrapper).find('.layer').width(this.$wrapper.width());
            $(this.$wrapper).find('.layer').height(this.$wrapper.height());

            thumbSize = this.getFitSizes();
            for(var key in  thumbSize) {
                thumbSizeString += key + ':' + thumbSize[key] + 'px;';
            }
            thumbSize['margin-left'] = 0;
            thumbSize['margin-top'] = 0;
            $(this.$wrapper).find('.thumb').css(thumbSize);
            $(this.$wrapper).find('.thumb img').attr('style', thumbSizeString);
        }
        main.initControls = function () {

            $(document).keyup(function(e) {
                if (e.keyCode == 27) { $('.gofullscreen .controlsFullscreen.fullscreen').click(); }
            });

            main.$controls.on('click', '*[class^="controls"]', function (event) {
                var $me = $(event.currentTarget),
                    className = $me.attr('class').split(' ')[0];
                if (typeof main[className] === 'function') {
                    main[className](event);
                }
            });

            main.$wrapper.on('mousemove mouseenter', function () {
                if(!main.isControlOpened) {
                    main.$wrapper.find('div.control-player').show();
                    setTimeout(function () {
                        if (main.play) main.$wrapper.find('div.control-player').hide();
                        main.isControlOpened = false;
                    }, 2000);
                    main.isControlOpened = true;
                }
            });

            main.$wrapper.on('mouseleave', function () {
                main.$wrapper.find('div.control-player').hide();
                main.isControlOpened = false;
                setTimeout(function () {
                    if (!main.play) main.$wrapper.mouseenter();
                }, 2000);
            });
        }
        main.activeControl = function (event) {
            var tag = main.html5 ? 'iframe' : 'object';
            var id = main.$wrapper.find(tag).attr('id');
            $('.control-player.' + id).show();
            $('.control-player:not(.' + id + ')').hide();
        }
        main.unactiveControl = function (event) {
            $('.control-player').hide();
        }
        main.controlsVideo = function () {
            if (!main.play) {
                main.player.playVideo();
                main.onPlayVideo();
            } else {
                main.player.pauseVideo();
                main.onPauseVideo();
            }
        }
        main.onPlayVideo = function () {
            log('PLAY VIDEO');
            main.$body.trigger('YTBISPLAYED', main.player);
            setTimeout(function() {
                main.$wrapper.find('.thumb').hide();
            }, 300);

            var id = null;

            if (!main.player || main.$wrapper.data('int')) return;

            main.$items.each(function() {
                var $item = $('#' + $(this).attr('id')).parent();
                if(!$item.data("player")) return;
                var itemPlayer = $item.data('player').player;
                if(typeof($item.data('player').player) == 'undefined') {
                    itemPlayer = document.getElementById($item.data('player').idPlayer);
                }

                id = main.player.a ? main.player.a.id : main.player.id;

                if(id != $item.data('player').idPlayer) {
                    if(itemPlayer.pauseVideo) itemPlayer.pauseVideo();
                }
            });

            main.play = true;
            main.duration = main.player.getDuration();
            if(main.duration){
                main.$wrapper.find(".counter .duration").html(main.displayTimer(main.duration));
            }
            main.$controls.find('.controlsVideo').removeClass('play');

            main.indexSub = -1;
            var inter = window.setInterval(function () {

                try {
                    var t = main.player.getCurrentTime();
                    main.$wrapper.find(".counter .currentTime").html(main.displayTimer(t));
                } catch (err) {
                    var t = 0;
                }
                if(main.srturl){
                    main.displaySubtitles(t);
                }

                main.$played.css('width', (t / main.duration) * 100 + '%');

            }, 400);

            main.$wrapper.data('int', inter);
        }

        main.displayTimer = function(d){
            d = Number(d);
            var h = Math.floor(d / 3600),
                m = Math.floor(d % 3600 / 60),
                s = Math.floor(d % 3600 % 60),
                totalH = main.duration < 3600 ? false : true,
                totalM = main.duration < 60 ? false : true;

            var hConv = h > 0 ? (h < 10 ? (main.noZeroFormat ? " " : "0")+h + ":" : ""+h + ":") : (totalH ?  (main.noZeroFormat ? "0:" : "00:") : " "),
                mConv = m > 0 ? (m < 10 ? (main.noZeroFormat ? " " : "0")+m + ":" : ""+m + ":") : (totalM ?  (main.noZeroFormat ? (totalH ? "00:" : "0:") : "00:") : " "),
                sConv = (s < 10 ? "0" : "") + s;
            return hConv + mConv + sConv;
        }
        main.displaySubtitles = function(playerTime){
            var index = -1;

            if(!main.subtitles.length) main.$subtitles.hide();

            for(var i=0; i<main.subtitles.length; i++) {
                if(playerTime<main.subtitles[i].start){
                    break;
                }
                index = i;
            }

            if(index != main.indexSub) {
                main.$subtitles.html('<p>'+main.subtitles[index].txt+'</p>');
                main.indexSub=index;
            } else if(main.subtitles[index] && main.subtitles[index].end < playerTime) {
                main.$subtitles.html('');
            }
        }
        main.onPauseVideo = function () {
            log('PAUSE VIDEO');
            main.$body.trigger('YTBISPAUSED', main.player);
            main.play = false;
            main.$controls.find('.controlsVideo').addClass('play');
            main.$wrapper.data('int')
            window.clearInterval(main.$wrapper.data('int'));
            main.$wrapper.removeData('int');
        }
        main.onEndVideo = function () {
            main.play = false;
            log('END VIDEO');
            if(typeof options.onEnd === 'function'){
                options.onEnd();
                return;
            }else if(main.$elt.data('thumb')){
                main.$wrapper.find('.thumb').show();
            }
        }
        main.controlsMute = function(event) {
            log('MUTE / UNMUTE');
            var $item = $(event.currentTarget);
            if($item.hasClass('on')) {
                main.player.setVolume(0);
                $item.parents('.control-player').find('div.setvolume span').removeClass('on');
                $item.removeClass('on')
            } else {
                $item.parents('.control-player').find('div.setvolume span:last').click();
                $item.addClass('on')
            }
        }
        main.controlsVolume = function (event) {
            log('SET VOLUME');
            var $item = $(event.currentTarget);
            var v = Math.floor((parseInt($item.index())) / ((main.volumeSize-1)/100));
            if (main.player) {
                var i = $item.index();
                $item.parents('div.setvolume').find('span').removeClass('on').filter(':lt(' + i + '), :eq(' + i + ')').addClass('on');
                main.player.setVolume(v);

                $('.controlsMute').addClass("on");
                if (i == 0){
                    $item.parents('div.setvolume').find('span:eq(' + i + ')').removeClass('on');
                    $('.controlsMute').trigger("click");
                }
            }
        }
        main.controlsSeekTo = function (event) {
            var $progress = main.$controls.find('div.progress'),
                ratio = (event.pageX - $progress.offset().left) / $progress.width();
            main.$played.css('width', (ratio < 1 ? ratio : 1) * 100 + '%');
            main.player.seekTo(Math.round(main.duration * ratio), true);
            main.onPlayVideo();
        }
        main.seekTo = function(event, time) {
            main.player.seekTo(time, true);
        }
        main.controlsFullscreen = function () {
            if (main.$wrapper.hasClass('gofullscreen')) {
                //leave fullscreen
                main.$wrapper.removeClass('gofullscreen').parents('section').siblings().removeClass('vhidden');
                main.$body.removeClass('ohidden');
                main.$wrapper.parents('section').removeClass('ohidden');
                main.$body.trigger('YTBISNOTFULLSCREEN');
            } else {
                //enter fullscreen
                main.$wrapper.addClass('gofullscreen').parents('section').siblings().addClass('vhidden');
                main.$body.addClass('ohidden');
                main.$wrapper.parents('section').addClass('ohidden');
                main.$wrapper.find('.thumb').hide();
                main.$body.trigger('YTBISFULLSCREEN');
            }
            main.$wrapper.find('iframe').width(main.$wrapper.width());
            main.$wrapper.find('iframe').height(main.$wrapper.height());
        }
        main.onPlayerStateChange = function (e) {
        }
        main.onPlayerReady = function (e) {
            main.$wrapper.addClass('ytbready');
            main.$body.trigger('YTBISREADY', main.player);
            main.isReady = true;
            main.removeLoader();
            if(main.hd && main.html5) {
                main.player.setPlaybackQuality('highres');
            }
        }
        main.loadVideoById = function (ytbsrc) {
            main.player.loadVideoById(ytbsrc);
        }
        main.loadSubtitlesByUrl = function (url) {
            main.srturl = url;
            if(!main.$controls.parent().find('.subtitles').size()) {
                main.$controls.after('<div class="subtitles"><p></p></div>');
                main.$subtitles = main.$controls.next('.subtitles');
            }
            main.loadSubtitles();
        }
        main.unInit = function(){
            $('body').off('YTBLIBISLOADED');
            window.clearInterval(main.$wrapper.data('int'));
            main.$wrapper.removeData('player');
            main.$controls.removeData('idPlayer');
            main.$controls.remove();
            main.$elt.remove();
        }
        main.init();
    }
    $.fn.marcelYtbPlayer = function (options) {
        options = options || {};

        $('body').on('YTBLIBISLOADED', (function(items) {
            return function() {
                $('script[src$=player_api]').data('ytblibisloaded', true);
                $(items).each(function (item, index) {
                    if (typeof options == 'object') {
                        options.items = items;
                        options.index = index;
                        if(!$(this).attr('id')) {
                            new $.marcelYtbPlayer(this, options);
                        }
                    }
                });
            }
        })(this));

        if(!$('script[src$=player_api]').size()) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else if ($('script[src$=player_api]').data('ytblibisloaded')) {
            $('body').trigger('YTBLIBISLOADED');
        }
    };
})(jQuery);

function onYouTubePlayerAPIReady (obj){
    jQuery('body').trigger('YTBLIBISLOADED');
}

var log = log || function(){};
