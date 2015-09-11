// Require.js config
require.config({
  paths: {
   // Librerias principales
	jquery: 		'libs/jquery.min',
	underscore: 'libs/underscore.min',
	backbone: 	'libs/backbone.min',
	bootstrap: 	'libs/bootstrap.min', 

   // Require.js plugins
	text: 'libs/require/text',
	// order: 'libs/require/order',
  },
});

// Inicializar la aplicación

require([
  'views/VillainView'
], function(App){
	new App();
});

// // Model
// var Villain = Backbone.Model.extend({
// 	urlRoot: '/villain'
// });

// // Collection
// var Villains = Backbone.Collection.extend({
//   model: Villain
// });

// // View
// var AnimalView = Backbone.View.extend({

// 		events: {
// 			'click':         'alertTest',
// 			'click .edit':   'editAnimal',
// 			'click .delete': 'deleteAnimal'
// 		},
// 	initialize: function() {
// 		this.render(); 
// 	},
// 	render: function() {
// 		this.$el.html(this.model.get('name') + ' is ' + this.model.get('color') + ' and says ' + this.model.get('sound'));
// 	}
// });