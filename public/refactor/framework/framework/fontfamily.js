



$(function(){
  $('[data-role="selectStudio"]').val('text').selectpicker('refresh');
	var typetext = $('[data-action="sub"]').val()  
  
  var getsybtype = $('[data-action="sub"]').val()
  var googlefont = {
        apikey: 'AIzaSyBtCVHmkCh6OEAzZS2nSsiuUIBKei84DRw',
        getfotn:function(){
          $.get( "https://www.googleapis.com/webfonts/v1/webfonts?key="+googlefont.apikey, function( data ) {
             
                var fornoption = ''   
                $.each(data.items, function(index, val){
                        fornoption += googlefont.listingdata(val)
                   })   
                   $('[data-selectfont="google"] [data-css="font-family"]').html(fornoption)
                  $('.customselect').selectpicker('refresh');
                  
          });
        },
        listingdata:function(data){
            var itmelist = '<option value="'+data.family+'">'+data.family+'</option>';
            return itmelist
        }
    }
    googlefont.getfotn()
  
  var typeelement= {
        h1: { demo: '<h1 data-preview="studio">Text Preview Here </h1>',
              option:['shadow', 'animations', 'background', 'padding_margine', 'textshadow', 'border_radius' ]
            },
        h2: { demo: '<h2 data-preview="studio">Text Preview Here </h2>',
             option:['shadow', 'animations', 'background', 'padding_margine', 'textshadow', 'border_radius' ]
            },
        h3:  { demo:'<h3 data-preview="studio">Text Preview Here </h3>', 
                option:['shadow', 'animations', 'background', 'padding_margine', 'textshadow', 'border_radius' ]
            },
        h4: { demo: '<h4 data-preview="studio">Text Preview Here </h4>', 
              option:['shadow', 'animations', 'background', 'padding_margine', 'textshadow', 'border_radius' ]
            },
        h5: { demo: '<h5 data-preview="studio">Text Preview Here </h5>',
              option:['shadow', 'animations', 'background', 'padding_margine', 'textshadow', 'border_radius' ]
            },
        text_title:  { demo:'<div data-preview="studio">Text Preview Here </div>', 
                      option:['header','shadow', 'animations', 'background' ]
            },
        text_header: { demo: '<h2 data-preview="studio">Text Preview Here </h2>', 
                      option:['header','shadow', 'animations', 'background' ]
            },
        linket_text: { demo: '<a href="#" data-preview="studio">Text Preview Here </a>', 
                       option:['header', 'animations', 'background' ]
            },
        button_text: { demo: '<button type="button" data-preview="studio">Text Preview Here </buttons>',
                      option:['header', 'animations', 'background' ]
            },
        defults:{
              option:['header', 'shadow', 'animations', 'backgrounds' ]
        }   
  }
  

  
  var classb = {
			sl:{
				cssview : $('[data-preview="studio"]'),
				cssstyle : $('[data-role="savedcss"]'),
				exportjson : $('[data-export="json"]'),
				exportcss : $('[data-output="studio"]'),
				save : $('[ data-save="class"]')
			},
      less:"",
			generalSetting:{
				csssetting:{
            css:{}
        },
        exportjson:{}
			},
			runcss:function(){
        if(classb.generalSetting.csssetting['setting']){
            if(classb.generalSetting.csssetting['setting']['font']){
                if(classb.generalSetting.csssetting['setting']['font']=="google"){
                  $('#googlefont').remove();
                  var embvedfont = '<link id="googlefont" href="https://fonts.googleapis.com/css?family='+classb.generalSetting.csssetting['setting']['fontfamily']+'" rel="stylesheet">'
                  $('body').append(embvedfont)
                  
                }
              
            }
        }
				var data = classb.generalSetting.csssetting.classname+'{'
				$.each(classb.generalSetting.csssetting.css, function(io, iv){
          if(io=='containerclass' || io== 'animationclass' || io== 'textclass' || io== 'iconclass'){
            data+= iv+'; ';
          }else{
					  data+= io +":"+iv+'; ';
          }
				});
				data+='}';
        
				classb.generalSetting.csssetting.savedcss = data;
				classb.sl.exportcss.val(classb.generalSetting.csssetting.savedcss)
				classb.sl.cssstyle.html(classb.generalSetting.csssetting.savedcss)
        //classb.compile()
         var classkey = classb.generalSetting.csssetting.class;
        classb.generalSetting.exportjson = {}
        if(classkey){
            classb.generalSetting.exportjson[classkey] = {}
				    classb.generalSetting.exportjson[classkey]['normal'] = classb.generalSetting.csssetting.css;
            classb.generalSetting.csssetting['connnected'] = classb.generalSetting.exportjson[classkey];
            classb.generalSetting.csssetting['connnected']['setting'] = classb.generalSetting.csssetting['setting'];
        }

			},
      compile:function(){
        	less.render([classb.less.replace("{{{lesscss}}}", classb.generalSetting.csssetting.savedcss)].join("\n\n")).then(
              function (output) {
               // alert(output.css);
                console.log(output);
                
                classb.sl.cssstyle.html(output.css)
                
              }, function (error) {
                //bootstrap.response("Error", error);
                  alert(error);
              });
        
          
          
      },
			updatecss:function(){
				classb.runcss()
        classb.downloadcss();
        classb.sl.exportjson.val(JSON.stringify(classb.generalSetting.exportjson));
        $('[data-export="hoverjson"]').val(JSON.stringify(classb.generalSetting.csssetting));
				classb.sl.cssview.attr('class', classb.generalSetting.csssetting.class)

			},
			editReload:function(){
				var getjsonvale = classb.sl.exportjson.val()
				if(getjsonvale){
					classb.generalSetting.csssetting = JSON.parse(getjsonvale);
          $('[type="checkbox"][data-cssexist]').prop('checked', false);
					$.each(classb.generalSetting.csssetting.css, function(io, iv){
						iv = iv.replace('px','');
						$('[data-css="'+io+'"][data-selector]').val(iv)
            $('[data-css="'+io+'"][data-html]').val(iv)
						if($('[data-css="'+io+'"]').is('.settingSlider')){
							$('[data-css="'+io+'"].settingSlider').slider('value', iv)
						}
            if($('[data-actioncss="'+io+'"]').is('[data-val]')){
							$('[data-actioncss="'+io+'"][data-val]').addClass('active');
						}
            if($('[data-cssexist="'+io+'"]').is('[data-switch]')){
              $('[type="checkbox"][data-cssexist="'+io+'"][data-switch]').prop('checked', true);
						}
            if($('[data-textcolor="'+io+'"]').is('[data-textcolor]')){
							$('[data-css="'+io+'"]').val(iv)
						}
            if(io=="text-shadow"){
                var textdata = iv.trim().replace(/, /g, ",").split(",");
                $.each(textdata, function(key, val){
                  var dataval =  val.trim().replace(/px/g, "");
                  dataval = dataval.split(" ")
                  
                      var gethtml =  $('[data-template="textshadow"]').html()
                       $('[data-insettemp="textshadow"]').append(gethtml)
                
                  var target = $('[data-role="textGroup"]:eq('+key+')')
                  target.find('[data-textshadow="x"]').val(dataval[0])
                  target.find('[data-textshadow="y"]').val(dataval[1])
                  target.find('[data-textshadow="blur"]').val(dataval[2])
                  target.find('[data-textshadow="color"]').val(dataval[3])
                  target.find('.color-picker').colorpicker().on('changeColor', function(e){
                       classb.csspropa.textshadow()
                  })
                })
            }
            
					});
           
           classb.updatecss()
				}
			},
      csspropa:{
         textshadow:function(target){
           var sedows = ''
           $('[data-role="textGroup"]').each(function(index, element) {
              if(index!=0){
                  sedows +=', '
              }
              var targets = $(this)
              var color = targets.find('[data-textshadow="color"]').val()
              var x = targets.find('[data-textshadow="x"]').val()
              var y = targets.find('[data-textshadow="y"]').val()
              var blurs = targets.find('[data-textshadow="blur"]').val()
              sedows += x+'px '+y+'px '+blurs+'px '+color
             
						    
					});
           
          
           classb.generalSetting.csssetting.css['text-shadow'] =  sedows
           classb.updatecss()  
         }
      },
      downloadcss:function(){
          $('[data-download="css"]').attr('download', classb.generalSetting.csssetting.class+'.css')
          var data = "text/plain;charset=utf-8," + encodeURIComponent(classb.generalSetting.csssetting.savedcss);
          $('[data-download="css"]').attr('href', 'data:' + data)
      }
		}
		classb.generalSetting.csssetting.class = $('[data-role="classname"]').val();
		classb.generalSetting.csssetting.savedcss = '';
		classb.generalSetting.csssetting.classname = '.'+classb.generalSetting.csssetting.class;
		classb.generalSetting.csssetting.css = {};
    
    if(typeelement[typetext]){
        classb.sl.cssview.replaceWith(typeelement[typetext]['demo']);
        classb.sl.cssview = $('[data-preview="studio"]');
        var getoptionhtml = $('[data-template="existingstudio"]') .html()
        $('[data-exiting="studio"]').empty()
      $.each(typeelement[typetext]['option'], function(key, val){
          var formhtml = getoptionhtml;
             formhtml = formhtml.replace(/{name}/g, val);
             formhtml = formhtml.replace(/{studio}/g, val);
            $('[data-exiting="studio"]').append(formhtml)
        })
    }
  
$.get("app/Modules/Framework/Resources/Views/assets/js/framework/generatedcss.less", function(data){
            classb.less = data;
            
            classb.editReload();
            
      });	

	$('.color-picker').colorpicker().on('changeColor', function(e){
		e.preventDefault();
		var color = e.color.toHex();
		var stype = $(this).data('textcolor');
    var shadowcolor = $(this).data('shadowcolor');
    if(shadowcolor){
     
    }else{
		  classb.generalSetting.csssetting.css[stype] = color;
		  classb.updatecss()
    }
	});
	
  $('select[data-selector]').change(function(){
		var thiscsspro = $(this).attr('data-css');
		var thisval = $(this).val()
    var typefont = $(this).data('typefont')
		classb.generalSetting.csssetting.css[thiscsspro] = thisval;
    if(!classb.generalSetting.csssetting['setting']){
      classb.generalSetting.csssetting['setting'] = {}
    }
		classb.generalSetting.csssetting['setting']['font'] = typefont;
    classb.generalSetting.csssetting['setting']['fontfamily'] = thisval;
    
		classb.updatecss()
	})
  
  $('[data-html]').keyup(function(){
		var thiscsspro = $(this).attr('data-css');
    var aftercss = $(this).data('after');
		var thisval = $(this).val()
    if(aftercss){
        thisval = thisval+aftercss;
    }
		classb.generalSetting.csssetting.css[thiscsspro] = thisval;
		classb.updatecss()
	})
  

  
  $('[data-actioncss]').click(function(){
       var itstrue = $(this).is('.active')
       var thiscss = $(this).data('actioncss');
       var thisvalue = $(this).data('val');
        if(itstrue){
          if(classb.generalSetting.csssetting.css[thiscss]){
             delete classb.generalSetting.csssetting.css[thiscss];
          }
          $(this).removeClass('active');
        }else{
          classb.generalSetting.csssetting.css[thiscss] = thisvalue; 
          $(this).addClass('active');
        }
        
        classb.updatecss()
  })
  
  

  

  
	$('[data-role="classname"]').keyup(function(){
			var getname = $(this).val();
			var classnames = getname.replace(/ /g, "-");
			classb.generalSetting.csssetting.class = classnames;
			classb.generalSetting.csssetting.classname = '.'+classnames;
			classb.updatecss()
	})

 $('body').on('click','[data-selectclass]',function(){
		var thiscsspro = $(this).attr('data-css');
		var thisval = $(this).data('selectclass')
    var cssdata = $(this).data('cssdata')
    $.each(cssdata, function(key, val){
      classb.generalSetting.csssetting.css[key] = val; 
    })
    var typeofclass = thiscsspro.replace("class", "");
    $('[data-studiosub="'+typeofclass+'"]').prev('input').val(thisval)
		
    classb.updatecss()
    $("#varModal").modal('hide');
    $('[data-studiosub]').removeClass('active')
	})
  
 function fontselect(){
      var type = $('[data-fonttype="font"]').val()
      $('[data-selectfont]').addClass('hide');
      $('[data-selectfont="'+type+'"]').removeClass('hide');
      var getfontfaimly = $('[data-typefont="'+type+'"]').val();
     
     var thiscsspro = 'font';
     var thisval = type
     if(!classb.generalSetting.csssetting['setting']){
      classb.generalSetting.csssetting['setting'] = {}
    }
		classb.generalSetting.csssetting['setting'][thiscsspro] = thisval;
    classb.generalSetting.csssetting['setting']['fontfamily'] = getfontfaimly
		classb.updatecss()
   
 }
  $('[data-fonttype="font"]').change(function(){
      fontselect()  
  })
  fontselect()
 
     $('body').on('click', '.spinner .btn:first-of-type ', function() {
        var  newval = parseInt( $(this).closest('.spinner').find('input').val(), 10) + 1
        var  tycss = $(this).closest('.spinner').find('input').attr('id');
        $(this).closest('.spinner').find('input').val(newval).keyup();
      });
      $('body').on('click', '.spinner .btn:last-of-type', function() {
         var newval = parseInt( $(this).closest('.spinner').find('input').val(), 10) - 1
         var  tycss = $(this).closest('.spinner').find('input').attr('id');
         $(this).closest('.spinner').find('input').val(newval).keyup();
         
      });
  

 
              


})
