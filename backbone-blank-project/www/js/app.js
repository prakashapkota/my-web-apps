// Launcher
define([
    'router/router'
    
], function( Router ) {
    
    $( function() {
        
        // Cr�ation du router
        window.router = new Router();
        
        // Lancement du router
        Backbone.history.start();
        
    });
});
