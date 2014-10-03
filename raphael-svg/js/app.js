
$(function(){

	var paper = Raphael(10, 50, 1200, 400);

	/*paper.circle(100, 200, 50)
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
		});*/
		
	/*var text = paper.text(280, 80, "HELLO RAPHAEL").
		attr({
			'font-family': 'georgia',
			'font-size': 18
		}).animate({
			y: 200
		}, 2000, 'elastic');
	text.node.id = "text-line";*/


	var btn = paper.circle(580, 200, 30)
		.attr({
			'fill': 'red',
			"stroke" : "#000000",
			cursor: 'pointer'
		}).animate({fill: "#223fa3", stroke: "#000", "stroke-width": 30, "stroke-opacity": 0.5}, 2000);

	btn.node.id = "start-btn";


	var spin = Raphael.animation( {transform: "r" + (-360)+", 200, 200"}, 3000, function() {  } ).repeat(Infinity)

	var circles = {};

	circles.circle2 = paper.circle(200, 200, 55).
		attr({
			'fill': '90-#fff:5-#00f:50',
			opacity:0,
			'stroke-opacity': 0,
		});
	circles.circle2.animate( spin );

	circles.circle3 = paper.circle(200, 200, 55).
		attr({
			'fill': '40-#f00:5-#00f:20',
			opacity:0,
			'stroke-opacity': 0,
		});
	circles.circle3.animate( spin );

	circles.circle4 = paper.circle(200, 200, 60).
		attr({
			'fill': '200-#DF0174:8-#000:50',
			opacity:0,
			'stroke-opacity': 0,
		});
	circles.circle4.animate( spin );


	circles.circle1 = paper.circle(200, 200, 50).
		attr({
			'fill': '#223fa3',
			"stroke" : "#000000"
		}).click(function(){
			$.each(circles, function(index, circle){
				circle.animate({
					transform: 's2'
				}, 1000, function(){
					//circle.animate( spin );
				});
				
			})
			
		})

	


	/*

	var eclipse1 = paper.path("m230.39285,61.98368l82.43378,0l0,0c45.52771,0 82.43365,33.71722 82.43365,75.30811c0,41.59087 -36.90594,75.30815 -82.43365,75.30815l-82.43378,0l0,-150.61626z").
		attr({
			'fill': 'green',
			"stroke" : "#000000"
		});
	eclipse1.animate( spin );*/

	


	/*var eclipse2 = paper.path("m293.39285,148.98367l82.43381,0l0,0c45.52771,0 82.43359,33.71722 82.43359,75.30812c0,41.59087 -36.90588,75.30815 -82.43359,75.30815l-82.43381,0l0,-150.61627z").
		attr({
			'fill': 'blue',
			"stroke" : "#000000"
		})

	var eclipse3 = paper.path("m152.39285,208.98367l82.43381,0l0,0c45.52771,0 82.43359,33.71722 82.43359,75.30814c0,41.59085 -36.90588,75.30814 -82.43359,75.30814l-82.43381,0l0,-150.61627z").
		attr({
			'fill': 'gray',
			"stroke" : "#000000"
		})*/

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