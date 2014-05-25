(function(){

	var App = App || {};

	App.init = function(){
		
		this.events();
		this.getCallList();
	};
	App.events = function(){
		$('form#additem').submit(function(e){
			e.preventDefault();
			var data = {};
			var comment = "";
			var $fields = $('form#additem .input');

			var $emptyFields = $fields.filter(function() {
				if($.trim(this.value) === ""){
					$(this).prev('label').addClass('red');
				}
				else{
					$(this).prev('label').removeClass('red');
				}
	            return $.trim(this.value) === "";
    	    });
    	    if ($emptyFields.length) {
	            alert("uh-oh, you forgot to fill something out");
	        }
	        else{
	        	$fields.each(function(index,item){
					data[$(item).attr('id')] = $.trim($(item).val());
				});
	        	App.insertBasicInfo(data);
	        }
		});
		
		$(document).on('click touchstart', '#callList .more', function(){
			$(this).toggleClass('on');
			$(this).parents('article').find('.description').slideToggle();
		});

		$(document).on('click touchstart', '#callList .details', function(){
			var calldataId = $(this).parents('article').data('id');
			$('.popin.details').fadeIn('slow').data('id', calldataId);
			$('.popin-bg-layer').show();
			App.getSignleCall( calldataId );
			App.getComments( calldataId );
		});
		$(document).on('click touchstart', '#callList .delete', function(){
			var calldataId = $(this).parents('article').data('id');
			var state = App.deleteCallData( calldataId );
			if(state == "ok"){
				$(this).parents('article').slideUp('slow');
			}
		});

		$(document).on('click touchstart', '.popin .close', function(){
			$('.popin').fadeOut('slow');
			$('.popin-bg-layer').hide();
		});
		$('#commentForm').submit(function(e){
			e.preventDefault();
			var calldataId = $(this).closest('.popin').data('id');
			var comment = $.trim($(this).find('#commentbox').val());
			App.insertComment(calldataId, comment);
		});
	};

	App.insertBasicInfo = function(data){
		var newdata = JSON.stringify(data);
		var request = $.ajax({
		  url: "ajax/insertBasicInfo.php",
		  type: "POST",
		  data: {newdata:newdata}
		});
		 
		request.done(function( msg ) {
		  $( "#log" ).html( msg );
		  $('form#additem').find('.input').val('');
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( "#log" ).html( "Request failed: " + textStatus );
		});

	};

	App.insertComment = function(calldataId, comment){
		var request = $.ajax({
		  url: "ajax/insertComment.php",
		  type: "POST",
		  data: {calldataId:calldataId, comment:comment}
		});
		 
		request.done(function( msg ) {
		  $( "#logPopin" ).html( msg );
		  $('#commentForm textarea').val('');
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( "#logPopin" ).html( "Request failed: " + textStatus );
		});

	};

	App.getCallList = function(){

		var request = $.ajax({
		  url: "ajax/getCallList.php",
		  type: "POST"
		});
		 
		request.done(function( msg ) {
			var message = eval(msg);
			for(key in message){
				console.log( message[key][1] );
				data = jQuery.parseJSON( message[key][1] );
				$('#callList').append('<article data-id="'+message[key].id+'"><h1>Titre : '+data.title+'</h1><p class="phone"><label>Phone : </label>'+data.number+'</p><p class="price"><label>Price : </label>'+data.price+'</p><p class="city"><label>City : </label>'+data.city+'</p><div class="options"><span class="details glyphicon glyphicon-sound-stereo"></span><span class="more glyphicon glyphicon-chevron-down"></span><span class="delete glyphicon glyphicon-remove-sign"></span></div><p class="description"><label>Description : </label>'+data.description+'</p></article>');
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( "#callList" ).html( "Request failed: " + textStatus );
		});

	};
	App.getComments = function(calldataId){
		var request = $.ajax({
		  url: "ajax/getComments.php",
		  type: "POST",
		  data: {calldataId:calldataId}
		});
		 
		request.done(function( msg ) {
			var message = eval(msg);
			$('#commentList').html('');
			for(key in message){
				$('#commentList').prepend('<p>'+message[key].comment+'</p>');
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( "#commentList" ).html( "Request failed: " + textStatus );
		});
	};

	App.getSignleCall = function(calldataId){
		
		var request = $.ajax({
		  url: "ajax/getSingleCall.php",
		  type: "POST",
		  data: {calldataId:calldataId}
		});
		 
		request.done(function( msg ) {
			var message = eval(msg);
			var data;
			for(key in message){
				data = jQuery.parseJSON( message[key][1] );
				$('.popin .calldata-popin').html('<article><h1>'+data.title+'</h1><p class="phone"><label>Telephone :</label>'+data.number+'</p><p class="price"><label>Prix :</label>'+data.price+'</p><p class="city"><label>Ville :</label>'+data.city+'</p><p class="description"><label>Description : </label>'+data.description+'</p></article>');
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( ".calldata-popin" ).html( "Request failed: " + textStatus );
		});

	};
	App.deleteCallData = function(calldataId){
		var request = $.ajax({
		  url: "ajax/deleteCallData.php",
		  type: "POST",
		  data: {calldataId:calldataId}
		});
		 
		request.done(function( msg ) {
		  $( "#logCallList" ).html( msg );
		  $('#callList').find('article[data-id="'+calldataId+'"]').slideUp('slow');
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  $( "#logCallList" ).html( "Request failed: " + textStatus );
		});
	}

if(document.all) {
	App.init();
	
} else {
    $(function() {
      App.init();
    });
}


})(jQuery)