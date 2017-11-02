
$(document).ready(function () {
    var data=$('#add_custome_page').serialize();
    var url=$('#add_custome_page').attr('action');

$('form button').attr('type','button');
    var data = $('#hidden_data').val();
	
    if(data){
		
        var json = JSON.parse(data);
		
		if(json){
		
				$.each(json,function (k,v) {

					if( $('input[name='+k+']').attr('type')=='checkbox'){
						 $('input[name='+k+']').attr('checked',true);
					}else if( $('input[name='+k+']').attr('type')=='radio'){
							$('input[name='+k+'][value="'+v+'"]').attr('checked',true);
					}else {
						$('input[name='+k+']').val(v);
					}
					$('select[name='+k+']').val(v);
				});
		}
    }


function savesettingevent(){
	 setTimeout(function(){
            var data=$('form').serialize();
            var url=$('#add_custome_page').attr('action');
            $.ajax({
                type: "post",
                datatype: "json",
                url:url,
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $("input[name='_token']").val()
                },
                success: function (data) {
                    if (! data.error) {
                        $('#widget_container').html(data.html)
                    }
                }
            });
          }, 50);
}


    $('#add_custome_page').on('input','input',function () {
    	savesettingevent();
	});
    $('#add_custome_page').on('change','select',function () {
   		savesettingevent();
	});

	
    $('#add_custome_page').on('click','input[type="radio"]',function () {
       	savesettingevent();
    });
    $('#add_custome_page').submit(function (e) {
        e.preventDefault();
        savesettingevent();
    });
  
   $('#add_custome_page').on('click','[data-uisetting]',function () {
       savesettingevent(); 
	  
    });
  
    $('#add_custome_page').on('keyup', 'input[type="text"]',function () {
        savesettingevent(); 
	});

    $('textarea').on('keyup',function () {
        savesettingevent(); 
	});
  
    $('body').on('click','.item',function () {
    var data=$('form').serialize();
    var url=$('#add_custome_page').attr('action');
    $.ajax({
        type: "post",
        datatype: "json",
        url:url,
        data: data,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        success: function (data) {
            if (! data.error) {
                $('#widget_container').html(data.html);
                $('span[aria-hidden=true]').click();
            }
        }
    });
});

    $('#settings_savebtn').on('click',function () {
        var data=$('#add_custome_page').serialize();
        var url=$('#add_custome_page').attr('action');
        $.ajax({
            type: "post",
            datatype: "json",
            url:url+'/save',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (! data.error) {
                    if(data.url){
                         top.window.location.assign(data.url);
                    }else{
                        $('#widget_container').html(data.html);
                       window.location.reload();
                    }
                }
            }
        });
    });
	
});
