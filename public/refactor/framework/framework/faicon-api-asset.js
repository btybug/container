$(function(){
 var getsybtype = $('[data-action="sub"]').val()
  var faicon = {
        font: 'FontAwesome',
        getfotn:function(){
          $.get( "http://edo.bootydev.co.uk/admin/assets/core_assest/font-icons/"+faicon.font, function( data ) {
                  var prefix = data.config.prefix;
             
                $.each(data.list, function(key, val){
                      var icon = prefix+' '+key;
                        $('[data-icolist="ficon"]').append(faicon.listingdata(icon, key));
                   })   
            
                 
          });
        },
        listingdata:function(icon, name){
            var itmelist = $('[data-template="iconitem"]').html();
            itmelist = itmelist.replace(/{name}/g,name);
            itmelist = itmelist.replace(/{icon}/g,icon);
            return itmelist
        }
  }
    
     faicon.getfotn()
  })