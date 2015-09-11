define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'views/VillainFormView',
  'text!templates/villainTemplate.html',
], function($, _, Backbone, Bootstrap, VillainForm, VillainTemplate) {

  var villainView = Backbone.View.extend({
    // Template del villano
    template: _.template(VillainTemplate),

    events: {
        "click .edit-villain-btn": "editVillain",
        "click .remove-villain-btn": "removeVillain",
    },

    render: function(){
      $(this.el).html(this.template({villain: this.model.toJSON()}));
    },

    editVillain: function(e) {
      new VillainForm({model: this.model});  
    },
  });
  return villainView;
});