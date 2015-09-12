define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/villainForm.html',
  'text!templates/villainResult.html'
], function($, _, Backbone, Bootstrap, VillainFormTemplate, VillainResultTemplate) {
	var villainForm = Backbone.View.extend({
		// Modal element
		el: $('#modal'),
		// Template contenido del modal
		template: _.template(VillainFormTemplate),
		// Template resultado del modal
		resultTemplate: _.template(VillainResultTemplate),

		events: {
        "click #previewImage": "triggerUploadImage",
        "click .remove-villain-btn": "removeVillain",
        "change #avatarInput": "updatePreviewImage",
        "hidden.bs.modal #modal": "removeEvents"
   	},

		render: function() {
			$(this.el)
				.html(this.template({villain: this.villain, form: this.form}))
				.modal()
				.on('hidden.bs.modal', this.closeModal)
		},

		formSet: function() {
			if(this.model) {
				this.villain = this.model.toJSON();
				this.form = {
					method: 'PUT',
					action: 'villain/'+this.villain.id,
					title: '<i class="fa fa-bolt"></i> Editar villano'	
				}
			} else {
				this.villain = {};
				this.form = {
					action: 'villain',
					title: '<i class="fa fa-bolt"></i> Añadir villano'
				}
			}
			// Render form
			this.render();			
		},

		triggerUploadImage: function() {
			$(this.el).find('#avatarInput').trigger('click');
		},

		closeModal: function(e) {
			$(this.el).unbind();
		},

		updatePreviewImage: function(e) {
			// Update imagepreview
		}
	});
	return villainForm;
});