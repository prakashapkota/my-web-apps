define([ 'backbone', 'text!templates/nav.html' ], function( Backbone, tmp ) {

	var NavView = Backbone.View.extend({
		
		el : '#nav',
		
		events : {

		},

		initialize : function() {
            // Backbone.on( 'userLogged', this.userLogged, this );
        },
		
		render : function() {
            
            this.$el.html( tmp );
        }

	});
	
	return NavView;
});