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
    // Classes del contenedor para el villano
    className: 'a-villain row',
    // Eventos
    events: {
        "click .edit-villain-btn": "editVillain",
        "click .remove-villain-btn": "removeVillain",
    },
    // Inicializando
    initialize: function(params) {
      this.model = params.model;
      this.parent = params.parent;
      this.model.on('change', this.render, this);
    },
    // Renderizando
    render: function(){
      $(this.el).html(this.template({villain: this.model.toJSON()}));
    },
    // Mostrar vista del formulario (modal)
    editVillain: function(e) {
      this.parent.VillainForm.model = this.model;
      this.parent.VillainForm.formSet('edit'); 
    },
    // Eliminar villano
    removeVillain: function(e) {
      var villain = prompt("Si quieres eliminar a este awesome villain, al menos debes recordar su alias", "");
      var that = this;
      if(villain == this.model.toJSON().alias) {
        this.model.destroy({
          success: function(model, response) {
            if(response.result == 'success') {
              that.$el.remove();
              if(that.parent.VillainCollection.length == 0) {
                that.parent.$vContainer.html('<h1 class="text-center">No existen villanos awesome en la lista :o</h1>');
              }
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