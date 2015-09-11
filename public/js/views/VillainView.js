define([
  'jquery',
  'underscore',
  'backbone',
  'collections/VillainCollection',
  'bootstrap',
  'text!templates/villainList.html',
  'text!templates/villainForm.html',
  'text!templates/villainResult.html'
], function($, _, Backbone, Villains, Bootstrap, villainListTemplate, villainFormTemplate, villainResultTemplate){
  var villainListView = Backbone.View.extend({
    // Contenedor
    el: $('#app-content'),

    // Template parala lista de villanos
    template: _.template(villainListTemplate),

    // Template para formulario
    formTemplate: _.template(villainFormTemplate),

    // Template para el resultado
    resultTemplate: _.template(villainResultTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click .edit-villain-btn': 'showEditModal',
      'click .remove-villain-btn': 'showRemoveModal',
    },

    // init view
    initialize: function(){
      // scope a funciones anonimas
      var that = this;

      // Global app variables
      this.$vContainer = this.$('#villains-container');
      this.$modal = this.$('#modal');
      this.$addVillainBtn = $('#add-villain');

      // Este boton no estaba dentro del scope del el, no estoy seguro que tan buena practica sea usar el "el" en todo el body o declarar este metodo normal via jQuery
      this.$addVillainBtn.click(function(event) {
        event.preventDefault();
        var data = {
          title : "Agregar villano"
        };

        that.$modal.html(that.formTemplate({ form: data })).modal();
      });

      Villains.fetch({
        success: function (data) {
          that.render();
        }
      });
    },

    // render view
    render: function() {
        this.$vContainer.html(this.template({ villains: Villains.toJSON()}));
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