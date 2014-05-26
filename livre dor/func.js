$(document).ready(function(){

	$('form').submit(function(){


		var username=$('#username').val();
		var message=$('#message').val();

		if(username!=""&&message!=""){

			$("#loader").show();

			$.post('post.php',{username:username,message:message},function(data){

				$('#feedback').prepend("<hr>Poster par : "+username+"<br/> Message : "+message+"<br/>").hide().fadeIn('slow');
				$("#loader").hide();
				document.getElementById("commentForm").reset();
				$('#FormMsg').html('Commentaire ajouté').fadeIn('slow');
				setTimeout(function(){$('#FormMsg').hide();},3000 );
			});
		}
		return false;
	});
});