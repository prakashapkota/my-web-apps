define([ 
    
    'backbone', 
    'text!templates/about.html'

    ], function( Backbone, tmp ) {

	var AboutView = Backbone.View.extend({
		
		el : '#page',
		
		events : {
			'click .popin' : 'openPopin'
		},

		initialize : function() {
			this.render();
        },
		
		render : function() {
            
            var $tmp = $( tmp );
            this.$el.html( tmp );
            
        },
        openPopin: function(e){
        	e.preventDefault();
        	console.log('hello');
        }
	});
	
	return AboutView;
});