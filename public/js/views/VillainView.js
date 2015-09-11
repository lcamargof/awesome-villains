define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/villainList.html',
  'text!templates/villainForm.html',
  'text!templates/villainResult.html'
], function($, _, Backbone, Bootstrap, VillainListTemplate, VillainFormTemplate, VillainResultTemplate) {

  var villainView = Backbone.View.extend({
    // Template del villano
    template: _.template(VillainListTemplate),
    // Template del formulario
    formTemplate: _.template(VillainFormTemplate),

    events: {
        "click .edit-villain-btn": "editVillain",
        "click .remove-villain-btn": "removeVillain",
        "click .form-submit": "submitVillain"
    },

    initialize: function(){
      // Action modal
      this.$modal = $('#modal');
    },

    render: function(){
      $(this.el).html(this.template({villain: this.model.toJSON()}));
    },

    editVillain: function(e) {
      var data = {
        title : "Editar villano"
      };

      this.$modal.html(this.formTemplate({ form: data })).modal();      
    },

    submitVillain: function(e) {
      alert('submit');
    }
  });
  return villainView;
});