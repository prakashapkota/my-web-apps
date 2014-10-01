define([ 
    'backbone', 
    'text!templates/intro.html'
], function( Backbone, tmp ) {

	var IntroView = Backbone.View.extend({
		
		el : '#page',
		
		events : {
			
        },

		initialize : function() {
            this.render();
            // Backbone.on( 'registerOK', function(userInfo){
            //     this.registerOK(userInfo);
            // }, this );
            
        },
		
		render : function() {

            this.$el.html( tmp );
        }
        
        
        
	});
	
	return IntroView;
});