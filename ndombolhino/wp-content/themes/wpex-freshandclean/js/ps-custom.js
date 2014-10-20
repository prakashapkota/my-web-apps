jQuery(function($){
	$(document).ready(function(){
		$('#live-stream-widget .tv-list a').on('click', function(e){
			e.preventDefault();
			var target = $(this).attr('href');
			target = target.split("#")[1];
			$('#live-stream-widget .tv-list a').removeClass('on');
			$(this).addClass('on');
			$('#live-stream-widget .player').removeClass('active');
			$('#live-stream-widget .'+target).addClass('active');

		})

	});
});