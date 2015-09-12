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

    // Villains form
    VillainForm: new VillainFormView(),

    // Villains collection
    VillainCollection: new Villains(),

    // init view
    initialize: function(){
      _.bindAll(this, "renderVillain");
      // Container
      this.$vContainer = this.$('#villains-container');

      // Listen to new villain add
      this.VillainCollection.on("add", this.renderVillain);

      var that = this;
      // Form para añadir villano
      $('#add-villain').click(function(event) {
  	    	event.preventDefault();
  	    	that.VillainForm.collection = that.VillainCollection;
  	    	that.VillainForm.formSet('new');
      });
    },

    renderVillain: function(villain){
        var villainView = new VillainView({model: villain, parent: this });
        villainView.render();
        this.$vContainer.append(villainView.el);
    },

    // render view
    render: function() {
      var that = this;
      this.VillainCollection.fetch({
        success: function (data) {
        	if(data.length > 0) {
				that.$vContainer.html('');
				data.each(that.renderVillain)        		
        	} else {
        		that.$vContainer.html('<h1 class="text-center">No existen villanos awesome en la lista :o</h1>')
        	}
        }
      });
    }
  });
  // Regresando la awesome lista de villanos
  return villainListView;
});




