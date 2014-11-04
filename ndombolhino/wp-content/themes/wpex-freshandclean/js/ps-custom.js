jQuery(function($){
	$(document).ready(function(){
		$('#live-stream-widget .tv-list a').on('click', function(e){
			e.preventDefault();
			var target = $(this).attr('href');
			target = target.split("#")[1];

			var url = $(this).data('url');
			console.log(url);

			$('#live-stream-widget .tv-list a').removeClass('on');
			$(this).addClass('on');
			$('#live-stream-widget .player').removeClass('active').html('');
			$('#live-stream-widget .'+target).addClass('active').html('<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="NO" width="355" height="270" src="'+ url +'"></iframe>');


		})

	});
});