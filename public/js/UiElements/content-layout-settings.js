
$(document).ready(function () {

    $('form button').attr('type', 'button');
    var json = JSON.parse($('#hidden_data').val());
	if(json){
			$.each(json, function (k, v) {
				if ($('input[name=' + k + ']').attr('type') == 'checkbox') {
					$('input[name=' + k + ']').attr('checked', true);
				}else if($('[name=' + k + ']').is('select')){
					 $('select[name=' + k + ']').val(v);
				}else{
					$('input[name=' + k + ']').val(v);
				}
			});
		}
    $('input').on('input', function () {
        evens($(this));
    });
    
  $('select').on('change', function () {
        evens($(this));
    });
    $('input[type="radio"]').on('click', function () {
        evens($(this));
    });
    $('input[type="checkbox"]').on('click', function () {
        evens($(this));
    });

    $('textarea').on('keyup', function () {
        evens($(this));
    });
    $('body').on('click', '.item', function () {
        evens($(this));
    });
    $('#settings_savebtn, [data-settingaction="save"]').on('click', function () {
        var data = $('form').serialize();
        data += '&itemname=' + $('#itemname').val();
        var url = $('#add_custome_page').attr('action');
        $.ajax({
            type: "post",
            datatype: "json",
            url: url + '/save',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("#token").val()
            },
            success: function (data) {
                if (!data.error) {
                    if(data.url.length != 0) {
                        window.location.replace(data.url);
                    } else if(data.html.length) {
                        $('#widget_container').html(data.html)
                    }
                }
            }
        });
    });
	
		
	function tinymceeditor(){
			var gettynimc = $('[data-bbfutarget][data-type="tinymceeditor"]').data('type');
				if(gettynimc){
				tinymce.init({
				  selector: '[data-bbfutarget][data-type="tinymceeditor"]',
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
	
    function evens(input) {

        var data = $('form').serialize();
        var url = $('#add_custome_page').attr('action');
        console(data);
        $.ajax({
            type: "post",
            datatype: "json",
            url: url,
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("#token").val()
            },
            success: function (data) {
                if (!data.error) {
                    $('#widget_container').html(data.html);
                    $('#output-content').html(data.request);
					$('.fullheight').addClass('editplaceholders');
					tinymceeditor()
                }
            }
        });
    }
  
      $('[data-settingaction="setting"]').click(function(){
         var  $this = $(this)
          if($this.hasClass('active')){
              $this.removeClass('active')
              $('[data-settinglive="settings"]').addClass('hide')
          }else{
            $this.addClass('active')
            $('[data-settinglive="settings"]').removeClass('hide')
          }
      });
    $('button[data-settingaction=console]').on('click',function () {
        $( "#output-content" ).slideToggle('slow');
    });
	function console(data) {
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/admin/uploads/gears/page-sections/console',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("#token").val()
            },
            success: function (data) {
                    $('#output-content').html(data);
            }
        });
    }
	$('body').on('click','[data-bbfutarget]' ,  function(){
		var target = $(this).data('bbfutarget');
		var targettype = $(this).data('types');
		var data =  $(this).data()
		
		if(targettype == 'tinymceeditor'){
			//
		}else{
			if($('.BBbuttons[data-key="'+target+'"]').length > 0){
				
				$('.BBbuttons[data-key="'+target+'"]').click();
			}else{
				 $('#magic-body').empty();
					$.ajax({
						type: "post",
						datatype: "json",
						url: '/modality/settings-live',
						data: data,
						headers: {
							'X-CSRF-TOKEN': $("input[name='_token']").val()
						},
						success: function (data) {
							if (!data.error) {
								$('#magic-settings .modal-title').html("Select " + data['action']);
								$('#magic-body').html(data.html);
								$('#magic-settings').modal();
							}
						}
					});
			}
		}
	});
	tinymceeditor();

	$('.fullheight').addClass('editplaceholders');
	
});
