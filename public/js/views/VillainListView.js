define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'collections/VillainCollection',
  'views/VillainView',
  'views/VillainFormView',
], function($, _, Backbone, Bootstrap, Villains, VillainView, VillainFormView) {

  var villainListView = Backbone.View.extend({
    // Contenedor
    el: $('#app-content'),

    // init view
    initialize: function(){
      _.bindAll(this, "renderVillain");
      // Container
      this.$vContainer = this.$('#villains-container');
      // Form para añadir villano
      $('#add-villain').click(function(event) {
  	    	event.preventDefault();
  	    	new VillainFormView();
      });
    },

    renderVillain: function(villain){
        var villainView = new VillainView({model: villain});
        villainView.render();
        this.$vContainer.append(villainView.el);
    },

    // render view
    render: function() {
      var that = this;
      Villains.fetch({
        success: function (data) {
          that.$vContainer.html('');
          data.each(that.renderVillain)
        }
      });
    }
  });
  // Regresando la awesome lista de villanos
  return villainListView;
});




