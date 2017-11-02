
     $(document).ready(function () {
		 
		

         $('.classify-irem').on('click',function () {
             var id=$(this).attr('data-id');
             $('.classify-irem').css({'background':'#ffffff'});
             $(this).css({'background':"#00d0ff"});
             $.ajax({
                 type: "post",
                 datatype: "json",
                 url:'/admin/modules/bburl/get-output-bb',
                 data:{'id':id,'bb':'BBgetClassifyCildsTree'},
                 headers: {
                     'X-CSRF-TOKEN': $("input[name='_token']").val()
                 },
                 success: function (data) {
                     if (!data.error) {
                         data.data= data.data+('<li><input name="classify" type="hidden" value="'+id+'"></li>');
						 $('#menus-list').html(data.data);
						  $('[data-collapsible="button"]').click(function(){
							  	$(this).next('ul').slideToggle()
								$(this).find('i').toggleClass('fa-plus')
								$(this).find('i').toggleClass('fa-minus')
						  })
                     }
                 }
             });
         })
     })
