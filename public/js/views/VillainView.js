define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/villainTemplate.html',
], function($, _, Backbone, Bootstrap, VillainTemplate) {

  var villainView = Backbone.View.extend({
    // Template del villano
    template: _.template(VillainTemplate),
    
    className: 'a-villain row',

    events: {
        "click .edit-villain-btn": "editVillain",
        "click .remove-villain-btn": "removeVillain",
    },

    initialize: function(params) {
      this.model = params.model;
      this.parent = params.parent;
      this.model.on('change', this.render, this);
    },

    render: function(){
      $(this.el).html(this.template({villain: this.model.toJSON()}));
    },

    editVillain: function(e) {
      this.parent.VillainForm.model = this.model;
      this.parent.VillainForm.formSet(); 
    },

    removeVillain: function(e) {
      var villain = prompt("Si quieres eliminar a este awesome villain, al menos debes recordar su alias", "");
      var that = this;
      if(villain == this.model.toJSON().alias) {
        this.model.destroy({
          success: function(model, response) {
            if(response.result == 'success') {
              that.$el.remove();
            }
            alert(response.msg);
          },
          fail: function(model, response) {
            alert('No se pudo eliminar el villano.');
          }
        });
      } else {
        alert('Al menos aprendete el alias no?');
      }
    },
  });
  return villainView;
});