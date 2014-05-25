function svgLoaded(msg){

	$('.popin').show('slow').find('.content').html(msg)
	$('.layer').show();
}

$(function(){

	$('.popin .close').on('click', function(e){
		e.preventDefault();
		$(this).parent('.popin').hide('fast', function(){
			$('.layer').hide();
		})
	})
})