define([
  'jquery',
  'underscore',
  'backbone',
  'collections/VillainCollection',
  'bootstrap',
  'text!templates/villainList.html'
], function($, _, Backbone, Villains, Bootstrap, villainListTemplate){
  var villainListView = Backbone.View.extend({
    el: $('#villains-container'),

    initialize: function(){
      var that = this;
      Villains.fetch({
        success: function (data) {
          that.render();
        }
      });
    },

    template: _.template(villainListTemplate),

    render: function() {
        $(this.el).html(this.template({ villains: Villains.toJSON()}));
    }
  });
  // Our module now returns our view
  return villainListView;
});