// Config RequireJs
require.config({
	paths : {
		'jquery' : 'lib/jquery/jquery-min',
		'underscore' : 'lib/backbone/underscore-min',
		'backbone' : 'lib/backbone/backbone-min',
        'text' : 'lib/require/text',
        'templates': '../templates'
	},
    urlArgs: 'bust=' + new Date().getTime(),
    shim : {
        'jquery' : {
            exports : '$'
        },
        'backbone': {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }
});

require(['app']);