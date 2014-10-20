
$(function(){
	
	jQuery.ajax({
	    type: "GET",
	    url: "nepal-map.svg",
	    dataType: "xml",
	    success: function(svgXML) {
		    var importedSVGRootElement = document.importNode(svgXML.documentElement,true);
		    $('#nepal-map').html(importedSVGRootElement);
		    svgLoaded();  			
	    }

  	});

	function svgLoaded(){

		$('.popin .close').on('click', function(e){
			e.preventDefault();
			$(this).parent('.popin').hide('fast', function(){
				$('.layer').hide();
			})
		});

		$('.region').on('click', function(){
			var target = $(this).data('target');
			$('.'+target).show('slow');
			$('.layer').show();
		});
		
	}


	


})