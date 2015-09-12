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
        "click #previewImage" : "triggerUploadImage",
        "click .remove-villain-btn" : "removeVillain",
        "change #avatarInput" : "updatePreviewImage",
        "submit form" : "submitVillain"
   	},

		render: function() {
			$(this.el)
				.html(this.template({villain: this.villain, form: this.form}))
				.modal();
			this.$uploadBtn = $(this.el).find('#avatarInput');
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

		// Trigger subir imagen haciendo click en la img
		triggerUploadImage: function() {
			this.$uploadBtn.trigger('click');
		},

		// Cambiar la imagen previsualizada
		updatePreviewImage: function(e) {
			// Podría usar un modelo para esto... pero bueno, vamos a los más tradicional
			var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
			if (regex.test(this.$uploadBtn.val().toLowerCase())) {
		      if (typeof (FileReader) != "undefined") {
					var reader = new FileReader();
					var that = this;
					reader.onload = function (e) {
					   $('#previewImage').attr("src", e.target.result);
					}
					reader.readAsDataURL(this.$uploadBtn[0].files[0]);
		      } else {
		         alert("No se puede previsualizar la imagen, por favor, use otro navegador si desea esta función.");
		      }
			} else {
			   alert("Utilice un archivo de imagen valido.");
			}
		},
		// Submit form del villano
		submitVillain: function(event) {
			event.preventDefault();
			var that = this;
			var $form = $(this.el).find('form');
			var formArray = $form.serializeArray();
			var $submitBtn = $form.find('button').html('<i class="fa fa-cog fa-spin"></i> Guardando...').prop('disabled', true);
			$form.find('input').prop('disabled', true);

			var data = _(formArray).reduce(function(v, field) {
				v[field.name] = field.value;
				return v;
			}, {});

			// var fileObject = $(':input[type="file"]')[0].files[0];

			// data.avatar = this.$uploadBtn[0].files[0];
			this.model.save(data, {
				wait: true,

				success: function(model, response) {
					var icon = (response.result = 'success') ? 'check-circle' : 'exclamation-circle'; 
					$(that.el).html(that.resultTemplate({msg: response.msg, icon: icon}));
				},

				error: function(model, response) {

				}
			}).always(function() {
				$form.find('input').prop('disabled', false);
				$submitBtn.html('Guardar cambios').prop('disabled', false);
			});
		}
	});
	// Return instance
	return villainForm;
});