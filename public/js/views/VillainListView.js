define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'collections/VillainCollection',
  'views/VillainView',
  'text!templates/villainList.html',
  'text!templates/villainForm.html',
  'text!templates/villainResult.html'
], function($, _, Backbone, Bootstrap, Villains, VillainView, villainListTemplate, villainFormTemplate, villainResultTemplate) {

  var villainListView = Backbone.View.extend({
    // Contenedor
    el: $('#app-content'),

    // init view
    initialize: function(){
      _.bindAll(this, "renderVillain");
      // Container
      this.$vContainer = this.$('#villains-container');
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
    },

    // show edit modal
    showEditModal: function (e) {
      var data = {
        title : "Editar villano"
      };

      this.$modal.html(this.formTemplate({ form: data })).modal();
    },

    // show delete modal
    showDeleteModal: function (e) {
      $('.modal').modal();
    },

  });
  // Regresando la awesome lista de villanos
  return villainListView;
});




