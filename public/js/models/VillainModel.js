define([
  'underscore',
  'backbone'
], function(_, Backbone) {
	var Villain = Backbone.Model.extend({
		urlRoot: '/villain',
		fileAttribute: 'avatar'
	});
	return Villain;
});