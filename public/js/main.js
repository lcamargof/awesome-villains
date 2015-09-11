// Require.js config
require.config({
	shim : {
		underscore : {
		   exports : '_'
		},
		bootstrap : {
		   dep : [ 'jquery'],
		   exports: 'Bootstrap'
		},
		backbone : {
		   deps : [ 'jquery', 'underscore' ],
		   exports : 'Backbone'
		},
		text: {
		   deps : [ 'jquery', 'underscore', 'backbone' ],
		   exports: 'Text'
		}
   },
  paths: {
   // Librerias principales
	jquery: 		'libs/jquery.min',
	underscore: 'libs/underscore.min',
	backbone: 	'libs/backbone.min',
	bootstrap: 	'libs/bootstrap.min', 

   // Require.js plugins
	text: 'libs/require/text',
  },
});

// Inicializar la aplicación
// No poseo rutas para la aplicación, por lo tanto no lo uso

require([
  'views/VillainView'
], function(App){
	new App();
});