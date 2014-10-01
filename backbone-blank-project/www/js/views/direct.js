define([ 'backbone', 'text!templates/direct.html' ], function( Backbone, tmp ) {

	var DirectView = Backbone.View.extend({
		
		el : '#page',
		
		events : {
		},

		initialize : function() {
			this.render();
        },
		
		render : function() {
            var $tmp = $( tmp );
            this.$el.html( tmp );
        }
        
	});
	
	return DirectView;
});