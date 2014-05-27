
$(function(){

	var paper = Raphael(10, 50, 1200, 400);

	paper.circle(100, 200, 50)
		.attr({
			"fill": "#fff000",
			"stroke": "#fff",
			cursor: "pointer"
		}).hover(function(){
			this.attr({fill: 'black'});
		},function(){
			this.attr({fill: 'red'});
		}).click(function(){
			this.animate({
				cx: 300,
				transform: 's2'
			}, 1000, "ease-in")
			
		});

	paper.rect( 400, 130, 50, 50)
		.attr({
			"fill" : "#8ABCDE",
			"stroke" : "#ff0000"
		}).animate({
			transform : "r180"
		}, 1000).click(function(){
			text.animate({
				y: 80
			}, 1000, 'ease-in');
		});
		
	var text = paper.text(280, 80, "HELLO RAPHAEL").
		attr({
			'font-family': 'georgia',
			'font-size': 18
		}).animate({
			y: 200
		}, 2000, 'elastic');
	text.node.id = "text-line";


	var btn = paper.circle(580, 200, 30)
		.attr({
			'fill': 'red',
			"stroke" : "#000000",
			cursor: 'pointer'
		});
	btn.node.id = "start-btn";

	//WITH JQUERY 

	var animStart = false, interval;

	$('#start-btn').on('click', function(){
		var up = false,
			start = true;
		if(!animStart){

			interval = setInterval(function(){
				up = !up;
				var value = (up)? 80:180,
				animType = (up)? 'ease-in' : 'elastic';

				text.animate({
					y: value
				}, 1500, animType)

			}, 2000);
		}
		else{
			clearInterval(interval);
			console.log('clear it now');
		}
		animStart = !animStart;
	})
});