// Launcher
define([
    'router/router'
    
], function( Router ) {
    
    $( function() {
        
        // Création du router
        window.router = new Router();
        
        // Lancement du router
        Backbone.history.start();
        
    });
});
