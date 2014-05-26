
$(function(){
	var App = App || {};

	App.init = function(){
		this.results={};
		this.getMatchList();

		$(".listeMatchs tbody").on({
			mousedown: function(){
				$(this).css("background", "red");
			},
			mouseup: function(){
		   		$(this).css("background", "white");
		    }
		});
		$('form#addMatch').submit(function(){
			var valid = App.validAddMatch($(this));
			if(valid){
				var lteam = $(this).find('#newTeam1').val(),
					vsteam = $(this).find('#newTeam2').val(),
					matchDate =  $(this).find('#matchDate').val();

				App.addMatch(lteam,vsteam,matchDate);
			}
			
			return false;
		});
	};
	

	App.getMatchList = function(){
		$("#loading").show();

		$.ajax({
		  type: "POST",
		  url: "ajax/getScore.php",
		  data: { }
		}).done(function(msg){
		  var msg = JSON.parse(msg);

		  for(index in msg){
		  	App.results[index]={
		  		"matchId" : msg[index].id,
				"localteam" : msg[index].localteam,
				"vsteam" : msg[index].vsteam,
				"localscore" : msg[index].localscore,
				"vsscore" : msg[index].vsscore,
				"matchDate" : msg[index].matchDate
			};
			App.createMatchList(App.results[index]);
		  }
			 $("#loading").hide();	
		});
	};

	App.createMatchList = function(fixedMatch) {
		console.log(fixedMatch);
		var dataHtml="";

			dataHtml +='<tbody rel="'+fixedMatch.matchId+'"><tr>';
			dataHtml +='<td width="40%"><span class="localteam">' + fixedMatch.localteam + '</span></td>';
			dataHtml +='<td width="10%"><span class="localscore"> '+fixedMatch.localscore+'</span> - <span class="vsscore">'+fixedMatch.vsscore+' </span></td>';
			dataHtml +='<td width="40%"><span class="vsteam">'+fixedMatch.vsteam+'</span></td>';
			dataHtml +='<td width="10%" rowspan="2" class="iconR"> </td>';
			dataHtml +='</tr><tr><td colspan="3"><span class="date">'+fixedMatch.matchDate+'<span></td></tr></tbody>';

		$("table.listeMatchs").append(dataHtml);
		this.modifyView();
	};

	App.modifyView = function(){		
		$(".listeMatchs tbody").click( function(){

			var rel=$(this).attr("rel");
			$("#modifyMatch").attr('rel',rel);

			$("#modifyMatch .team1").html($(this).find('.localteam').text());
			$("#modifyMatch .team2").html($(this).find('.vsteam').text());
			$("#score1").val(parseInt($(this).find('.localscore').text()));
			$("#score2").val(parseInt($(this).find('.vsscore').text()));
			$("#modifyMatch .date").html($(this).find('.date').text());
			
			$( "#modifyMatch" ).show(); 
		 	$( "#listeMatchs" ).animate({
		  		left:"-100%"
			}, 400 );
			$( "#modifyMatch" ).animate({
		  		left:"0%"
			}, 400, function(){ $( "#modifyMatch" ).show(); } );
		});	

		$("#prvwResult").click( function(){
	 		App.returnFromScore();
		});	

		$("form#editscore").submit(function(){
			var valid = App.validEditScore($(this));
			if(valid){
				var matchId=$("#modifyMatch").attr('rel'),
				    lscore=$( "#score1" ).val(),
				    vscore=$( "#score2" ).val();

				App.saveScores(matchId,lscore,vscore);
			}
	 		return false;
		});
    };
    App.validEditScore = function($form){
    	var valid = true ;
    	$form.find('input[type="number"]').each(function(index,item){
    		if(!(parseInt($(item).val())> -1)){
    			valid =  false;
    		}
    	});
    	if(valid)
    		return true;
    	else
    		return false;
    }
    App.validAddMatch = function($form){
    	var valid = true ;
    	$form.find('input[type="text"]').each(function(index,item){
    		if(!($(item).val())) {
    			valid =  false;
    		}
    	});
    	if(valid)
    		return true;
    	else
    		return false;
    }
    App.addMatch = function(lteam,vsteam,matchDate){
    	$.ajax({
			type: "POST",
			url: "ajax/addMatch.php",
			data: {lteam:lteam,vsteam:vsteam,matchDate:matchDate},
			success: function(data) {
				var data = JSON.parse(data);
				App.createMatchList(data);
				console.log(data.matchDate);
				$("#listeMatchs").find('tbody[rel="'+data.matchId+'"]').trigger('click');
			}
		 });
    }
	
	App.saveScores = function(matchId, lscore, vscore){
		console.log(matchId, lscore, vscore);
		
		$.ajax({
			type: "POST",
			url: "ajax/setScore.php",
			data: {matchId:matchId,lscore:lscore,vscore:vscore},
			success: function(data) {
				console.log(data);
				var data = JSON.parse(data);
				console.log(data);
				$("#listeMatchs").find('tbody[rel="'+matchId+'"]').find('.localscore').text(data.locals);
				$("#listeMatchs").find('tbody[rel="'+matchId+'"]').find('.vsscore').text(data.vsscore);
				$('#modifyMatch').find('h3').text('Modified')
			}

		 });
	};	

	App.returnFromScore = function(){
		$( "#listeMatchs" ).animate({
	  		left:"0%"
		}, 400 ,function(){ $( "#modifyMatch" ).hide(); } );
		$( "#modifyMatch" ).animate({
	  		left:"100%"
		}, 400 );
	};

	$.fn.getDateString = function(d){
        var y = d.getUTCFullYear() ;
		var m = twodigs( 1 + d.getUTCMonth() ) ;
		var j = twodigs( d.getUTCDate() ) ;
		var h = twodigs( d.getUTCHours() ) ;
		var mi = twodigs( d.getUTCMinutes() ) ;
		var s = twodigs( d.getUTCSeconds() ) ;
		return y + "-" + m + "-" + j ;
    }

	
	function twodigs( i ) {
		return ( '' + (100 + i ) ).slice( -2 ) ;
	}

	/********/
    /* LOAD */
    /********/
    if(document.all) {
        App.init();
    } else {
        $(function() {
          App.init();
        });

    }

			
}(jQuery) );