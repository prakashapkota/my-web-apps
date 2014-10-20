(function () {
	var app = angular.module('store', []);
	app.controller('StoreController', function(){
		this.products = gems;
	});

	var gems = [
		{
			name : "1azeazeazeaze",
			price : 29.5,
			description: 'lorem	eaz epajze pazeaze* iaze azeja* zeja zoeija zknd apzoije',
			canPurchase: false,
			soldOut : false,
			images : [
				"http://prakashapkota.fr/images/logo.png",
				"https://fbstatic-a.akamaihd.net/rsrc.php/v2/yB/r/wxTbWFWdsoi.png"
			]
		},
		{
			name : "2azeazeaze",
			price : 22.95,
			description: 'lorem	eaz epajze pazeaze* iaze azeja* zeja zoeija zknd apzoije',
			canPurchase: false,
			soldOut : false,
			images : [
				"http://prakashapkota.fr/images/logo.png",
				"https://fbstatic-a.akamaihd.net/rsrc.php/v2/yB/r/wxTbWFWdsoi.png"
			]
		}
	]
})();



