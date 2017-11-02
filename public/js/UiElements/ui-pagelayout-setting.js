$(function(){
   
   
   
      $('[data-settingaction="setting"]').click(function(){
         var  $this = $(this)
         var ifram = $('[data-loadifram="preview"]');
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
          ifram.find('[data-settingaction="save"]').trigger('click')
         
      })
    
})