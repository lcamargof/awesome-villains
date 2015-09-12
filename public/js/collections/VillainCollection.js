define([
  'underscore',
  'backbone',
  'models/VillainModel'
], function(_, Backbone, Villain) {
	var VillainCollection = Backbone.Collection.extend({
		model: Villain,
		url: 'villain',
		parse: function(response) {
         return response.villains;
      }
	});
	return VillainCollection;
});
