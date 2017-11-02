	$(function(){
		var json = {}
		function tinymceeditor(){
			var gettynimc = $('[data-bbfutarget][data-editor="tinymce"]').data('editor');
				if(gettynimc){
				tinymce.init({
				  selector: '[data-bbfutarget][data-editor="tinymce"]',
				  inline: true,
				  plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table contextmenu paste'
				  ],
				  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
				});
			}
		}
		 tinymceeditor()
	})