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
    
    className: 'a-villain row',

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

    removeVillain: function(e) {
      var villain = prompt("Si quieres eliminar a este awesome villain, al menos debes recordar su alias", "");
      if(villain == this.model.toJSON().alias) {
        this.model.destroy({success: function(model, response) {
          alert(response);
        }});
      }
    }
  });
  return villainView;
});