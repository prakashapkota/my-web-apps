


(function($){

	$('.ytbPlayer').marcelYtbPlayer();



	var playButton = $(".navPlayer .pauseplay");

	playButton.on("click", function(e) {
		e.preventDefault();
		var $this = $(this);
		var btnCtrl = $(this).parents('.videoBlock').find('.controlsVideo');
		btnCtrl.trigger('click');

		if( btnCtrl.hasClass('play') ){
			$this.removeClass('play').text('Play');
		}
		else{
			$this.addClass('play').text('Pause');
		}
	});
	

	$('body').on('YTBISREADY', function(){
		
		$('.ytbPlayer').each(function(id, item){
			var videoID = $(item).attr('id');
			var player = $('#'+videoID);
			var data = $(player).parent().data('player');
			var parentDiv = $(item).parents('.videoBlock');
			

		});	
	})

})(jQuery);