define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'libs/SimpleAjaxUploader.min',
  'models/VillainModel',
  'text!templates/villainForm.html',
  'text!templates/villainResult.html'
], function($, _, Backbone, Bootstrap, SimpleAjaxUploader, VillainModel, VillainFormTemplate, VillainResultTemplate) {
	var villainForm = Backbone.View.extend({
		// Modal element
		el: $('#modal'),
		// Template contenido del modal
		template: _.template(VillainFormTemplate),
		// Template resultado del modal
		resultTemplate: _.template(VillainResultTemplate),

		events: {
        "click .remove-villain-btn" : "removeVillain",
        "submit form" : "submitVillain"
   	},

		render: function() {
			// Render y muestra el modal del formulario
			$(this.el).html(this.template({villain: this.villain, form: this.form})).modal();

			// Declarando el uploader para la imagen
			if(!this.uploader) {
	   		this.uploader = new ss.SimpleUpload({
					button: 'previewImage', // file upload button
					url: 'villain/avatar', // server side handler
					name: 'uploadfile', // upload parameter name
					multipart: true,
					responseType: 'json',    
					customHeaders: {'x-csrf-token': $('meta[name="csrf-token"]').attr('content')},
					allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
					maxSize: 1024, // kilobytes
					onSubmit: function(filename, extension) {
						$('#upload-text').fadeIn('fast');
						$('#avatarInput').prop('disabled', true);
					},        
					onError: function( filename, errorType, status, statusText, response, uploadBtn ) {
						alert('No se pudo subir esta imagen.');
					},
					onExtError: function( filename, extension ) {
						alert('Solo se permiten imagenes jpg/jpeg/png/gif');
					},
					onSizeError: function( filename, fileSize ) {
						alert('La imagen no debe de pesar más de 1MB.');
					},
					onComplete: function(filename, response) {
						$('#upload-text').fadeOut('fast');
						if (!response || response.result == 'error') {
							alert('No se pudo subir esta imagen.');
							return false;            
						}
						$('#previewImage').attr('src', '/temporal/'+response.file);
						$('#avatar').val(response.file);
					}
				});
			} else {
				$('input[name="uploadfile"]').closest('div').css('display', 'block');
			}

			// unbind uploader input
			$(this.el).on('hidden.bs.modal', this.modalHidden);
		},

		formSet: function(action) {
			if(action == 'edit') {
				this.villain = this.model.toJSON();
				this.form = {
					method: 'PUT',
					action: 'villain/'+this.villain.id,
					title: '<i class="fa fa-bolt"></i> Editar villano'	
				}
			} else {
				this.model = new VillainModel(); 
				this.villain = {};
				this.form = {
					action: 'villain',
					title: '<i class="fa fa-bolt"></i> Añadir villano'
				}
			}
			// Render form
			this.render();			
		},

		submitVillain: function(event) {
			event.preventDefault();
			var that = this;
			// cached form
			var $form = $(this.el).find('form');
			// array de elementos
			var formArray = $form.serializeArray();
			// cached submit button
			var $submitBtn = $form.find('button').html('<i class="fa fa-cog fa-spin"></i> Guardando...').prop('disabled', true);
			// deshabilitar inputs
			$form.find('input').prop('disabled', true);
			// Ajustando la data para el modelo
			var data = _(formArray).reduce(function(v, field) {
				v[field.name] = field.value;
				return v;
			}, {});

			// Guardando el modelo
			this.model.save(data, {
				success: function(model, response) {
					var icon = (response.result = 'success') ? 'check-circle' : 'exclamation-circle'; 
					$(that.el).html(that.resultTemplate({msg: response.msg, icon: icon}));

					if(response.id) {
						that.collection.add(model);
					}
				},

				error: function(model, response) {
					if(response.status == 422) {
						errors = JSON.parse(response.responseText);
						errorList = '';

						$.each(errors, function(index, val) {
							$('#' + index).closest('div.form-group').addClass('has-error');
							errorList += "<li>"+val+"</li>";
						});

						$('.alert').find('ul').html(errorList).end().show('slow');
					} else {
						alert('Ocurrio un error agregando al villano');
					}
				}
			}).always(function() {
				$form.find('input').prop('disabled', false);
				$submitBtn.html('Guardar cambios').prop('disabled', false);
			});
		},

   	modalHidden: function(e) {
   		$('input[name="uploadfile"]').closest('div').css('display', 'none');
   	},
	});
	// Return instance
	return villainForm;
});