define([

		'backbone',
		'views/nav', 
		'views/intro', 
		'views/direct',
		'views/about'

	], function( Backbone, NavView, IntroView, DirectView, AboutView ) {

	var Router = Backbone.Router.extend({
        
		routes : {
        
			'intro' 	: 'goIntro',
			'direct'	: 'goDirect',
			'apropos'	: 'goAbout',
            '*path'     : 'goIntro'
		},
        
        currentView : '',
        
        initialize : function() {
            
            // console.log( 'Router initialized !' );
            
            var nav = new NavView();
            nav.render();
        },
        
		goIntro : function() {
			
            //console.log( 'Go Intro !' );
            
            var intro = new IntroView();
            this.display( intro );
		},

		goDirect: function() {
            
			var direct = new DirectView();
            this.display( direct );
		},

		goAbout: function() {
            
			var about = new AboutView();
            this.display( about );
		},
        
        display : function( newView ) {
            
            var that = this;
            
            var $currentPage = $( $( '#page' ).html() );

            $currentPage.fadeIn('fast', function() {
                
                if( that.currentView !== '' ) {
                    that.currentView.undelegateEvents();
                }
                
                newView.render();
                that.currentView = newView;
                
            });
        }

	});
	
	return Router;
});