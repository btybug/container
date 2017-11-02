$(document).ready(function () {

    $('form button').attr('type', 'button');
    var getjson  = $('#hidden_data').val()
    if(getjson){
    var json = JSON.parse(getjson);
    
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
        evens(true);
    });
    
  $('select').on('change', function () {
      evens(true);
    });
    $('input[type="radio"]').on('click', function () {
        evens(true);
    });
    $('input[type="checkbox"]').on('click', function () {
        evens(true);
    });

    $('textarea').on('keyup', function () {
        evens(true);
    });
    $('body').on('click', '.item', function () {
        evens(false);
    });
    
    var getiframesrc = $('[data-loadifram="preview"] iframe').attr('src');
   
    var element = $("#iframeinfor") // global variable
    var targetiframe = $("#previewImageifreamimage") // global variable
    var getCanvas; // global variable   
    
  
    $('#settings_savebtn, [data-settingaction="save"]').on('click', function () {
        var data = $('#add_custome_page').serialize();
        var moredata = $('[data-role="moredata"]').serialize();
        
        var url = $('#add_custome_page').attr('action');
        var layoutID = $('[name=layout_id]').val();
		if(!url){
			url = window.location;
		}else{
			url = url + '/save'
		}
		
		
				var datasend = ''
				if(data){
					datasend += data;
				}
				if(moredata){
					datasend+='&'+moredata
				}
				if(layoutID){
					datasend +="&layout_id=" + layoutID
				}
		
		  var imgageData = ''
					targetiframe.empty();
				if(!element.html()){
						element = $('[data-loadifram="preview"] .previewlivesettingifream')	
				}
				
					element.clone().width(1400).height(500).attr('id', 'targetifreams').appendTo(targetiframe)
					targetiframea = $("#targetifreams");
					//TODO check and fix
					
					   html2canvas(targetiframea, {
						onrendered: function (canvas) {
							   getCanvas = canvas;
							  imgageData = getCanvas.toDataURL("image/png");
						   bootbox.dialog({
							   message: '<div class="imagescroll"><img src="'+imgageData+'"  ></div>',
							   size:'large',
							 buttons: {
								 cancel: {
									 label: 'cancel',
									 className: 'btn-danger'
								 }
							 }
						   });

				
				if(imgageData){
					datasend +="&image="+imgageData;
				}

						  $.ajax({
							 type: "post",
							 datatype: "json",
							 url: url,
							 data: datasend,
							 headers: {
								 'X-CSRF-TOKEN': $("[name=_token]").val()
							 },
							 success: function (data) {
								 if (!data.error) {
									 var newurl =getiframesrc+'&'+ data;
									 $('[data-loadifram="preview"] iframe').attr('src', newurl);
									 window.location.href = data.url
									// $('#widget_container').html(data.html)
								 }
							 }
						 });
					}
				});
      
       
    });
    function evens(variation) {
        var data = $('#add_custome_page').serialize();
		if(data){
			data =  '&'+data;
		}
        var moredata = $('[data-role="moredata"]').serialize();
		if(moredata){
				moredata ='&'+ moredata;
		}
        var url = $('#add_custome_page').attr('action');
		var datasetting = $('[datas-settingjson]').val();
		
		if(datasetting!=''){
			var newurl = '/?'+datasetting;
		}else{
		
				if(variation != true){
					var newurl =getiframesrc+data+datasetting+moredata+ "&pl_live_settings=page_live";
				}else{
					var newurl =getiframesrc+data+datasetting+moredata+'&pl_live_settings=page_live&variation=false';
				}
		}

        $('[data-loadifram="preview"] iframe').attr('src', newurl);  
        
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
});
