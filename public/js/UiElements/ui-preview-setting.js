$(function(){


    $('[data-loadifram="preview"] iframe').on("load",function(){
      $('[data-settingaction="setting"]').click(function(){
         var  $this = $(this)
         var ifram = $('[data-loadifram="preview"] iframe').contents();
          if($this.hasClass('active')){
            $this.removeClass('active')
              ifram.find('[data-settinglive="content"]').addClass('activeprevew')
              ifram.find('[data-settinglive="settings"]').addClass('hide')
          }else{
             $this.addClass('active')
             ifram.find('[data-settinglive="content"]').removeClass('activeprevew')
             ifram.find('[data-settinglive="settings"]').removeClass('hide')
          }
      });
      
      $('[data-settingaction="save"]').click(function(){
           var ifram = $('[data-loadifram="preview"] iframe').contents();
        var getitemname = $('#itemname').val()
        ifram.find('[data-parentitemname="itemname"]').val(getitemname);
          ifram.find('[data-settingaction="save"]').trigger('click')
         
      })
      
      $('#itemname').keyup(function(){
          var ifram = $('[data-loadifram="preview"] iframe').contents();
          var getitemname = $('#itemname').val();
          ifram.find('[data-parentitemname="itemname"]').val(getitemname);
      })
      
      if($('#itemname').length > 0){
          var ifram = $('[data-loadifram="preview"] iframe').contents();
          var getitemname = $('#itemname').val();
          ifram.find('[data-parentitemname="itemname"]').val(getitemname);
      }
      
    })
    
    
    
})