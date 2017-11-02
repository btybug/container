$(function(){
 var getsybtype = $('[data-action="sub"]').val()
  var googlefont = {
        apikey: 'AIzaSyBtCVHmkCh6OEAzZS2nSsiuUIBKei84DRw',
        getfotn:function(){
          $.get( "https://www.googleapis.com/webfonts/v1/webfonts?key="+googlefont.apikey, function( data ) {
                var fontload = ''   
                $.each(data.items, function(index, val){
                         $('[data-role="listitem"]').append(googlefont.listingdata(val))
                         if(index!=0){
                            fontload += ' | '+val.family
                        }else{
                          fontload += val.family
                        } 
                         
                   })   
                  
          });
        },
        listingdata:function(data){
            var itmelist = $('[data-template="listingitem"]').html();
            itmelist = itmelist.replace(/{name}/g, data.family);
            return itmelist
        }
  }
    if(getsybtype=="font_family"){
        googlefont.getfotn()
    }
  
  })