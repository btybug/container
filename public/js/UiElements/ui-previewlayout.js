$(function(){
    $('[data-bblayoutaction="setting"]').click(function(){
         var  $this = $(this)
          if($this.hasClass('active')){
            $this.removeClass('active')
              $('[data-settinglive="settings"]').addClass('hide')
          }else{
            $this.addClass('active')
            $('[data-settinglive="settings"]').removeClass('hide')
          }
      });
      
  
  $('body').on('change', 'input[type="radio"], input[type="checkbox"], select',function () {
        updatehtml()
  })
    $('body').on('keyup', 'input[type="text"]',function () {
        updatehtml()
  })

var iframeactive = 1;

function updatehtml(){
    var data=$('form').serialize();
    var url=$('input[data-url]').data('url');
    $.ajax({
        type: "post",
        datatype: "json",
        url:url,
        data: data,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        success: function (data) {
            if (!data.error) {
               /* var gettargetid = $('[data-reloadiframe].hide').data('reloadiframe')
                $('[data-reloadiframe="'+gettargetid+'"]').attr('src',$('[data-selectedlayout]').val()).load(function(){
                      $('[data-reloadiframe]').addClass('hide')
                      $('[data-reloadiframe="'+gettargetid+'"]').removeClass('hide')
                })*/
            }
        }
    });

}



})
