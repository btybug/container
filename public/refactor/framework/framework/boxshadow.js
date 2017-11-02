$(function(){

	var classb = {
			sl:{
				cssview : $('[data-preview="studio"]'),
				cssstyle : $('[data-role="savedcss"]'),
				exportjson : $('[data-export="json"]'),
				exportcss : $('[data-output="studio"]'),
				save : $('[ data-save="class"]')
			},
      asset:{
       assest1: {
            "width":"50%",
            "display":"block",
            "float":"left"
        },
       assest2: {
            "width":"50%",
            "display":"block",
            "float":"none",
            "margin-left":"auto",
            "margin-right":"auto"
        },
        assest3: {
            "width":"50%",
            "display":"block",
            "float":"right"
        },
        assest4: {
            "width":"100%",
            "display":"block",
            "float":"none",
            "margin-left":"auto",
            "margin-right":"auto"
        }
      },
      dataload:'',
			generalSetting:{
				csssetting:{
          border:{},
          tabs:{}
         },
        exportjson:{}
			},
			runcss:function(){
				var data = classb.generalSetting.csssetting.classname+'{'
				$.each(classb.generalSetting.csssetting.css, function(io, iv){
					data+= io +":"+iv+'; ';
				});
				data+='}';
        
        
        if(classb.generalSetting.csssetting.hover && classb.generalSetting.csssetting.tabs['hover']){
           data+= classb.generalSetting.csssetting.classname+':hover, '+classb.generalSetting.csssetting.classname+'.hover{'
            $.each(classb.generalSetting.csssetting.hover, function(io, iv){
              data+= io +":"+iv+'; ';
            });
          data+='}';
        
        }
      
        
        if(classb.generalSetting.csssetting.selected && classb.generalSetting.csssetting.tabs['selected']){
           data+= classb.generalSetting.csssetting.classname+':focus, '+classb.generalSetting.csssetting.classname+'.selected, '+classb.generalSetting.csssetting.classname+':active{'
            $.each(classb.generalSetting.csssetting.selected, function(io, iv){
              data+= io +":"+iv+'; ';
            });
          data+='}';
        }
        
				classb.generalSetting.csssetting.savedcss = data;
				classb.sl.exportcss.val(classb.generalSetting.csssetting.savedcss)
				classb.sl.cssstyle.html(classb.generalSetting.csssetting.savedcss)
        classb.generalSetting.exportjson = {}
        var classnames = classb.generalSetting.csssetting.class;
        if(classnames){
            classb.generalSetting.exportjson[classnames] = {}
				    classb.generalSetting.exportjson[classnames]['normal'] = classb.generalSetting.csssetting.css;
            classb.generalSetting.csssetting['connnected'] = classb.generalSetting.exportjson[classnames]
          }
			},
			updatecss:function(){
        classb.runcss()
        classb.downloadcss();
				classb.sl.exportjson.val(JSON.stringify(classb.generalSetting.exportjson))
        $('[data-export="hoverjson"]').val(JSON.stringify(classb.generalSetting.csssetting))
        var activeclass =  'css';
				classb.sl.cssview.attr('class', classb.generalSetting.csssetting.class+" "+activeclass)
				
			},
			editReload:function(){
				var getjsonvale = classb.sl.exportjson.val()
				if(getjsonvale){
					classb.generalSetting.csssetting = JSON.parse(getjsonvale);
          
          if(classb.generalSetting.csssetting.class){
            $('[data-role="classname"]').val(classb.generalSetting.csssetting.class)
          }
          $('[data-tabactive]').prop('checked', false);
          if(classb.generalSetting.csssetting['tabs']){
              $.each(classb.generalSetting.csssetting['tabs'], function(k, v){
                $('[data-tabactive="'+k+'"]').prop('checked', v);
              })
          }
          
          classb.chekedcssfor('css');
          classb.updatecss()
         
				}
			},
      chekedcssfor:function(ccf){
        
       if(classb.generalSetting.csssetting[ccf]){
         var margindl = [];
         var paddingl = [];
         $('[type="checkbox"][data-cssexist]').prop('checked', false);
        	$.each(classb.generalSetting.csssetting[ccf], function(io, iv){
						iv = iv.replace('px','');
              if(io.match(/margin/g)){
                iv = iv.replace('%','').replace('em','');
                  margindl.push(iv)
              }
              if(io.match(/padding/g)){
                iv = iv.replace('%','').replace('em','');
                  paddingl.push(iv)
              }
						
              $('[data-css="'+io+'"][data-selector]').val(iv);
              $('[data-css="'+io+'"][data-html]').val(iv)
              $('[data-css="'+io+'"][data-role="editcss"]').val(iv)
              
              if($('[data-css="'+io+'"]').is('.settingSlider')){
                $('[data-css="'+io+'"].settingSlider').slider('value', iv);
              }
              
              if($('[data-textcolor="'+io+'"]').is('[data-textcolor]')){
                $('[data-css="'+io+'"]').val(iv);
              }
              
              if($('[data-cssexist="'+io+'"]').is('[data-switch]')){
                  $('[type="checkbox"][data-cssexist="'+io+'"][data-switch]').prop('checked', true);
						  }
              
              if(io=="box-shadow"){
                $('[data-insettemp="boxShadow"]').empty();
                var textdata = iv.trim().replace(/, /g, ",").split(",");
                $.each(textdata, function(key, val){
                  if(val!=''){
                  var dataval =  val.trim().replace(/px/g, "");
                  dataval = dataval.split(" ")
                  
                  var gethtml =  $('[data-template="boxShadow"]').html()
                       $('[data-insettemp="boxShadow"]').append(gethtml)
                
                  var target = $('[data-insettemp="boxShadow"] [data-role="textGroup"]:eq('+key+')')
                  
                  if(dataval.length == 6){
                    target.find('[data-subcss="type"][data-multycss="boxShadow"]').val(dataval[0])    
                    dataval.shift();
                  }
                  target.find('[data-multycss="boxShadow"][data-html="x"]').val(dataval[0])
                  target.find('[data-multycss="boxShadow"][data-html="y"]').val(dataval[1])
                  target.find('[data-multycss="boxShadow"][data-html="blur"]').val(dataval[2])
                  target.find('[data-multycss="boxShadow"][data-html="spread"]').val(dataval[3])
                  target.find('[data-multycss="boxShadow"][data-html="color"]').val(dataval[4])
                  target.find('.color-picker').colorpicker().on('changeColor', function(e){
                       classb.csspropa['boxShadow']()
                       classb.updatecss()
                     })
                  }
                })
             }
             
             
              if(io=="border-radius"){
                  var textdata = iv.trim().replace(/px/g, "").split(" ");
                  if(textdata.length == 1){
                      $('[data-csstype="border-radius"][name="radiustype"][value="same"]').prop('checked', true);
                      $('[data-multycss="borderRadius"][data-html="top"]').val(textdata[0]);
                      $('[data-multycss="borderRadius"][data-html="right"]').val(textdata[0]);
                      $('[data-multycss="borderRadius"][data-html="bottom"]').val(textdata[0]);
                      $('[data-multycss="borderRadius"][data-html="left"]').val(textdata[0]);
                      $('[data-csstype="border-radius"][value="same"]').prop('checked', true)
                  }else {
                      $('[data-csstype="border-radius"][name="radiustype"][value="customize"]').prop('checked', true);
                      $('[data-multycss="borderRadius"][data-html="top"]').val(textdata[0]);
                      $('[data-multycss="borderRadius"][data-html="right"]').val(textdata[1]);
                      $('[data-multycss="borderRadius"][data-html="bottom"]').val(textdata[2]);
                      $('[data-multycss="borderRadius"][data-html="left"]').val(textdata[3]);
                      $('[data-csstype="border-radius"][value="customize"]').prop('checked', true)
                  }
              }
              
              if(io=="background"){
                  $('[data-subcss="color"][data-css="background"]').attr('data-val', iv).val(iv)
                  $('[data-editpopup="color"] i').attr('style', 'background:'+iv+';')
              }
					});	
          
          if(classb.generalSetting.csssetting.border){
            if(classb.generalSetting.csssetting.border[ccf]){
                  var borderlanth = classb.generalSetting.csssetting.border[ccf];
                  var i = 0
                  $.each(borderlanth, function(k, v){
                       var textdata = v.trim().replace(/px/g, "").split(" ");
                       if(textdata[0])
                        $('[data-css="border-style"][data-html="'+k+'"][data-multycss="border"]').val(textdata[0])
                       
                       if(textdata[1])
                        $('[data-css="border-width"][data-html="'+k+'"][data-multycss="border"]').val(textdata[1])
                       
                       if(textdata[2]){
                        $('[data-css="border-color"][data-html="'+k+'"][data-multycss="border"]').val(textdata[2])
                        setTimeout(function(){ 
                          $('.color-picker[data-html="'+k+'"][data-multycss="border"]').colorpicker('setValue', textdata[2])
                         }, 200);
                        }
                        
                      i++
                   })
                   if(i==1){
                      $('[data-csstype="border"][value="same"]').prop('checked', true)
                   }else{
                      $('[data-csstype="border"][value="customize"]').prop('checked', true)
                   }
                
             }
          }
          
         var mi = 0;
         var pi = 0;
         for (var i = 0; i < margindl.length; i++) {
              if (margindl[i] === margindl[0]) {
                  mi++
              }
          }
          
          for (var i = 0; i < paddingl.length; i++) {
              if (paddingl[i] === paddingl[0]) {
                  pi++
              }
          }
          
          if(mi===margindl.length && margindl.length != 0){
            $('[data-csstype="margin"][value="same"]').prop('checked', true)
          }else{
            $('[data-csstype="margin"][value="customize"]').prop('checked', true)
          }
          if(pi===paddingl.length && paddingl.length != 0){
            $('[data-csstype="padding"][value="same"]').prop('checked', true)
          }else{
            $('[data-csstype="padding"][value="customize"]').prop('checked', true)
          }
          
          
           switchas();	
           updateContainer('all')
            $('.customselect').selectpicker('refresh');
            $('.color-picker').colorpicker('update')
           
				}
			},
      csspropa:{
          border:function(target){
            
             var activemode = 'css'
             var type = $('[data-csstype="border"][name="bordertype"]:checked').val();
             
             if(!classb.generalSetting.csssetting.border){
                      classb.generalSetting.csssetting.border = {}
             }
             if(!classb.generalSetting.csssetting.border[activemode]){
                    classb.generalSetting.csssetting.border[activemode] = {}
             }
             
             if(target){
                 var targetType = target.data('html')
                 if(type=='same'){
                    targetType = 'top'
                 }
                 
                 var style = $('[data-css="border-style"][data-html="'+targetType+'"][data-multycss="border"]').val()
                 var width = $('[data-css="border-width"][data-html="'+targetType+'"][data-multycss="border"]').val()
                 var color = $('[data-css="border-color"][data-html="'+targetType+'"][data-multycss="border"]').val()
                 
                  var border =  style+' '+width+'px '+color;
                  
                  
                  classb.generalSetting.csssetting.border[activemode][targetType] = border;
             }
              
              
              if(type == 'same'){
                    if(classb.generalSetting.csssetting.border[activemode]['top']){
                    classb.generalSetting.csssetting[activemode]['border'] = classb.generalSetting.csssetting.border[activemode]['top'];
                    }
                   
                    var deletekey = 'border-right border-bottom border-left'
                    classb.deleteJson(deletekey)
                    
                    
              }else{
                  if(classb.generalSetting.csssetting.border[activemode]['top']){
                    classb.generalSetting.csssetting[activemode]['border'] = classb.generalSetting.csssetting.border[activemode]['top'];
                  }
                  
                  if(classb.generalSetting.csssetting.border[activemode]['right']){
                    classb.generalSetting.csssetting[activemode]['border-right'] = classb.generalSetting.csssetting.border[activemode]['right'];
                  }
                  if(classb.generalSetting.csssetting.border[activemode]['bottom']){
                    classb.generalSetting.csssetting[activemode]['border-bottom'] = classb.generalSetting.csssetting.border[activemode]['bottom'];
                  }
                  if(classb.generalSetting.csssetting.border[activemode]['left']){
                    classb.generalSetting.csssetting[activemode]['border-left'] = classb.generalSetting.csssetting.border[activemode]['left'];
                  }
              }
              
              
          },
          borderRadius:function(){
              var activemode = 'css'
              var type = $('[data-csstype="border-radius"][name="radiustype"]:checked').val()
              var borderredius = ''
              if(type == 'same'){
                 borderredius = $('[data-multycss="borderRadius"][data-html="top"]').val();
                 
                 
                 $('[data-multycss="borderRadius"][data-html="top"]').val(borderredius);
                 $('[data-multycss="borderRadius"][data-html="right"]').val(borderredius);
                 $('[data-multycss="borderRadius"][data-html="bottom"]').val(borderredius);
                 $('[data-multycss="borderRadius"][data-html="left"]').val(borderredius);
                 
                 borderredius = borderredius+ 'px';
                 
              }else{
                 var top = $('[data-multycss="borderRadius"][data-html="top"]').val() + 'px';
                  var right = $('[data-multycss="borderRadius"][data-html="right"]').val() + 'px';
                  var bottom = $('[data-multycss="borderRadius"][data-html="bottom"]').val() + 'px';
                  var left = $('[data-multycss="borderRadius"][data-html="left"]').val() + 'px';
                  borderredius = top+' '+right+' '+bottom+' '+left;
                  
              }
             
               classb.generalSetting.csssetting[activemode]['border-radius'] = borderredius;
            
              
          },
          boxShadow:function(){
            var activemode = 'css'
           var sedows = ''
             $('[data-insettemp="boxShadow"] [data-role="textGroup"]').each(function(index, element) {
                if(index!=0){
                    sedows +=', '
                }
                var targets = $(this)
                var color = targets.find('[data-multycss="boxShadow"][data-html="color"]').val()
                var x = targets.find('[data-multycss="boxShadow"][data-html="x"]').val()
                var type = targets.find('[data-multycss="boxShadow"][data-subcss="type"]').val()
                var y = targets.find('[data-multycss="boxShadow"][data-html="y"]').val()
                var blurs = targets.find('[data-multycss="boxShadow"][data-html="blur"]').val()
                var spread = targets.find('[data-multycss="boxShadow"][data-html="spread"]').val()
                sedows += type+' '+x+'px '+y+'px '+blurs+'px '+spread+'px '+color
            });
            
            if(sedows!=''){
             classb.generalSetting.csssetting[activemode]['box-shadow'] = sedows;
            }
            
          }
      },
      updatenav:function(){
        //var active =  $('[data-tabnav="button"] .active a').data('rolecss');
        var active =  'css';
        var type = $('[data-tabnav="button"] .active [data-tabactive]').is(':checked')
        if(active =='css'){
          classb.suporter.tabEditor = true;
        }else{
          if(type){
              classb.suporter.tabEditor = true;
          }else{
              classb.suporter.tabEditor = false;
          } 
        }
        if(!classb.suporter.tabEditor){
          $('[data-activetab="suporter"]').removeClass('hide')
        }else{
          $('[data-activetab="suporter"]').addClass('hide')
        }
        if(!classb.generalSetting.csssetting['tabs']){
            classb.generalSetting.csssetting['tabs'] = {}
        }
        classb.generalSetting.csssetting['tabs'][active] = classb.suporter.tabEditor;
        
        
      },
      suporter:{
          tabEditor: true
      },
      updatejson:function(key, value , mcss , target){
        classb.updatenav()
        if(classb.suporter.tabEditor){
            var updatetype =  'css';
            if(!classb.generalSetting.csssetting[updatetype]){
              classb.generalSetting.csssetting[updatetype] = {};
            }
            if(mcss){
                classb.csspropa[mcss](target);
            }else if(key || value){
               classb.generalSetting.csssetting[updatetype][key] = value;
            } 
            classb.updatecss()
        }
      },
      deleteJson:function(key){
         classb.updatenav()
         if(classb.suporter.tabEditor){
           var dkey = key.split(" ")
            var updatetype =  'css';
            $.each(dkey, function(i, val){
                  delete classb.generalSetting.csssetting[updatetype][val]; 
             });
            
         }
         classb.updatecss()
          
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
	  
    
    var timerimportjson = window.setInterval(inportjson, 200);
    function inportjson(){
          openjsonload = $('[data-export="importjson"]').attr('data-open');
          if(openjsonload){
            $('[data-export="importjson"]').keyup()
            clearInterval(timerimportjson);
          }
    }
    
    $('body').on('keyup', '[data-export="importjson"]', function(){
            var thisValue = $(this).val()
             $('[data-export="json"]').val(thisValue)
              classb.editReload();
    })
    
    $.get("/appdata/app/Modules/Studio/Resources/Views/classes/container/js/sampledata.json", function(data){
      classb.dataload = data;
    })

    
	
    
	$('.color-picker').colorpicker().on('changeColor', function(e){
		e.preventDefault();
		var color = e.color.toHex();
		var stype = $(this).data('textcolor');
    var multycss = $(this).data('multycss');
    if(multycss){
           classb.updatejson('','',multycss,$(this))
     }else{
           classb.updatejson(stype,color)
     }  
    
    
	});
  
	$('body').on('change','select[data-selector]',function(){
		var thiscsspro = $(this).attr('data-css');
		var thisval = $(this).val()
    var multycss = $(this).data('multycss');
    if(multycss){
         classb.updatejson('','',multycss,$(this))
    }else{
         classb.updatejson(thiscsspro,thisval)
    }
    updateContainer(thiscsspro)
	})	
  
  $('body').on('keyup','[data-html]',function(){
      var thiscsspro = $(this).attr('data-css');
      var multycss = $(this).data('multycss');
      var aftercss = $(this).data('after');
      var thisval = $(this).val()
      var  mim = $(this).data('min');
      if(mim || mim == 0){
           if(Number(mim) > Number(thisval)){
                 return false;
          }
       }
       if(thiscsspro=="border-radius"){
              var type = $('[data-csstype="border-radius"][name="radiustype"]:checked').val()
              if(type == 'same'){
                 borderredius = $('[data-multycss="borderRadius"][data-html="top"]').val(thisval);
              }
         }
     
      if(thiscsspro){
        if(aftercss){
            thisval = thisval+aftercss;
        }
        
        if(multycss){
           classb.updatejson('','',multycss,$(this))
         }else{
               classb.updatejson(thiscsspro,thisval)
         }
      }
	})
  
  
	$('[data-role="classname"]').keyup(function(){
			var getname = $(this).val();
			var classnames = getname.replace(/ /g, "-");
			classb.generalSetting.csssetting.class = classnames;
			classb.generalSetting.csssetting.classname = '.'+classnames;
			classb.updatejson()
	})
	
 $('.spacing-type').change(function(){
    $(this).prev('[data-role="editcss"]').keyup()
 })
  
  $('[data-role="editcss"]').keyup(function(){
      var getcss = $(this).data('css')
      var getvalue = Number($(this).val());
      var datasame = $(this).data('same');
      var  pxtype = 'px';
                  if($(this).next().is('.spacing-type')){
                        pxtype = $(this).next('.spacing-type').val()
                  }
      if(datasame){
          var type = $('[data-csstype="'+datasame+'"][name="'+datasame+'type"]:checked').val()
          if('same'==type){
              $('[data-same="'+datasame+'"]').each(function(index, element) {
								  $(this).val(getvalue);
                  var getcssss = $(this).data('css');
                  var  pxtype = 'px';
                  if($(this).next().is('.spacing-type')){
                        pxtype = $(this).next('.spacing-type').val()
                  }
                  var value = getvalue+pxtype;
                   classb.updatejson(getcssss,value)
                  
							});
              
          }
      }
      var value = getvalue+pxtype;
      if(pxtype=="auto"){
        $(this).val('auto')
        classb.updatejson(getcss,'auto')
      }else{
        classb.updatejson(getcss,value)
      }
      
  })
  
 
  
  $('[data-switch]').change(function(){
      var itstrue = $(this).is(':checked')
      var getdataswitch = $(this).data('switch');
      var cssexist = $(this).data('cssexist');
      
      if(itstrue){
          $('#'+getdataswitch).collapse("show")
          $(this).closest('.studio-collapse-header').removeClass('disabled')
          if(cssexist=='background'){
               var value = $('[data-subcss="color"][data-css="background"]').val();
               classb.updatejson('background',value)
               
           }
           if(cssexist=='box-shadow'){
              classb.updatejson('','','boxShadow')
           }
         
           if(cssexist=='border-radius'){
              classb.updatejson('','','borderRadius')
              classb.updatejson('','','border')
           }
      }else{
        
          if(cssexist=='border-radius'){
              cssexist = cssexist+' border';
          }
          if(cssexist=="height"){
               $('#'+getdataswitch).find('[data-css]').each(function(index, element) {
								    var gatcss = $(this).data('css')
                    var thisdefault = $(this).data('default')
                    if(thisdefault){
                        $(this).val(thisdefault)
                    }
                    if($(this).next().is('[data-default]')){
                        var getDefil = $(this).next('[data-default]').data('default')
                        $(this).next('[data-default]').val(getDefil);
                    }
                    
                    classb.deleteJson(gatcss)
							});
              $('.customselect').selectpicker('refresh');
          }
          classb.deleteJson(cssexist)
          
         $('#'+getdataswitch).collapse("hide")
         $(this).closest('.studio-collapse-header').addClass('disabled')
          
      }
      classb.updatecss()
  })

  
  $('[data-clickcss]').click(function(){
      var getcss = $(this).data('clickcss')
      var getuse = $(this).data('use')
      var currentvaleu  = Number($('[data-css="'+getcss+'"]').val()) 
      if(getuse=='+'){
            currentvaleu = currentvaleu + 1;
      }else{
            currentvaleu = currentvaleu - 1;
      }
      $('[data-css="'+getcss+'"]').val(currentvaleu)
      var value= currentvaleu+'px';
      classb.updatejson(getcss,value)
  })
  
  
  $('[data-csstype]').change(function(){
        var csstype = $(this).data('csstype')
        var getcontainer = $(this).data('getcontainer')
        var getvalue = $(this).val()
        
        if(getvalue=="same"){
             $('[data-role="'+csstype+'Group"]').not('[data-roletype="top"]').addClass('hide')
             $('[data-role="'+csstype+'Group"][data-roletype="top"]').find('[data-lable-title="top"]').html(csstype)
             if(csstype=="border"){
                 classb.updatejson('','','border')
             }
             if(csstype=="border-radius"){
                 classb.updatejson('','','borderRadius')
             }
             if(csstype=="height"){
               classb.deleteJson('min-height')
               classb.deleteJson('max-height')
             }
              if(csstype=="width"){
               classb.deleteJson('min-width')
               classb.deleteJson('max-width')
              }
             
        }else{
          
            $('[data-role="'+csstype+'Group"]').removeClass('hide')
            $('[data-role="'+csstype+'Group"][data-roletype="top"]').find('[data-lable-title="top"]').html('Top')
             if(csstype=="border"){
               classb.updatejson('','','border')
             }
             if(csstype=="border-radius"){
                 classb.updatejson('','','borderRadius')
             }
             if(csstype=="height"){
               classb.deleteJson('height')
             }
             if(csstype=="width"){
               classb.deleteJson('width')
              }
        }
        if(getvalue=="auto"){
              if(csstype=="height"){
               classb.deleteJson('min-height')
               classb.deleteJson('max-height')
               classb.deleteJson('height')
              }
              if(csstype=="width"){
               classb.deleteJson('min-width')
               classb.deleteJson('max-width')
               classb.deleteJson('width')
              }
        }
        
        if($(this).closest('[data-collapsegroup]').is('[data-collapsegroup]')){
            $(this).closest('[data-collapsegroup]').find('[data-showcontainer]:visible').not('[data-showcontainer="'+getcontainer+'"]').collapse('hide');
            $(this).closest('[data-collapsegroup]').find('[data-showcontainer="'+getcontainer+'"]').collapse('show');
        }else{
        
        $(this).closest('.formrow').find('[data-showcontainer]:visible').not('[data-showcontainer="'+getcontainer+'"]').collapse('hide');
        $(this).closest('.formrow').find('[data-showcontainer="'+getcontainer+'"]').collapse('show');
        }
        
        setTimeout(function(){  classb.updatecss() }, 300);
       
  })
  
  
  

  
    function switchas(){
      
      $('[data-csstype]').each(function() {
          var csstype = $(this).data('csstype')
          var getcontainer = $('[data-csstype="'+csstype+'"]:checked').data('getcontainer');
          var getvalue = $('[data-csstype="'+csstype+'"]:checked').val()
          
        if(getvalue=="same"){
             $('[data-role="'+csstype+'Group"]').not('[data-roletype="top"]').addClass('hide')
             $('[data-role="'+csstype+'Group"][data-roletype="top"]').find('[data-lable-title="top"]').html(csstype)
        }else{
            $('[data-role="'+csstype+'Group"]').removeClass('hide')
            $('[data-role="'+csstype+'Group"][data-roletype="top"]').find('[data-lable-title="top"]').html('Top')
        }
       
          if($(this).closest('[data-collapsegroup]').is('[data-collapsegroup]')){
            $(this).closest('[data-collapsegroup]').find('[data-showcontainer]:visible').not('[data-showcontainer="'+getcontainer+'"]').collapse('hide');
            $(this).closest('[data-collapsegroup]').find('[data-showcontainer="'+getcontainer+'"]').collapse('show');
        }else{
        
         $(this).closest('.formrow').find('[data-showcontainer]:visible').not('[data-showcontainer="'+getcontainer+'"]').collapse('hide');
         $(this).closest('.formrow').find('[data-showcontainer="'+getcontainer+'"]').collapse('show');
         
           }
        });
    
      
      
      $('[data-switch]').each(function(){
          var itstrue = $(this).is(':checked')
          var getdataswitch = $(this).data('switch');
          if(itstrue){
              $('#'+getdataswitch).collapse("show")
              $(this).closest('.studio-collapse-header').removeClass('disabled')
              
          }else{
             $('#'+getdataswitch).collapse("hide")
             $(this).closest('.studio-collapse-header').addClass('disabled')
          }
      })
  }
 
 function updateContainer(ttype){
   if(ttype=="position" || ttype=="all"){
      var position = $('[data-css="position"][data-selector="position"]').val()
      if(position=="absolute" || position=="fixed" || position=="relative" ){
          $('[data-showcontainer="positionsetting"]').collapse('show')
          $('[data-showcontainer="settingFloat"]').addClass('hide')
           classb.deleteJson('float')
      }else{
          $('[data-showcontainer="positionsetting"]').collapse('hide')
          $('[data-showcontainer="settingFloat"]').removeClass('hide')
          classb.deleteJson('left')
          classb.deleteJson('right')
          classb.deleteJson('top')
          classb.deleteJson('buttom')
      }
    }
    
 }
 
 
 $('[data-roletemplate]').click(function(){
    var gettemplate =  $(this).data('roletemplate') 
    var getcss =  $(this).data('css') 
    var multycss =  $(this).data('multycss') 
    var truefor= $('[data-cssexist="'+getcss+'"][type="checkbox"]').is(':checked')
    if(truefor){
          var gethtml =  $('[data-template="'+gettemplate+'"]').html()
          $('[data-insettemp="'+gettemplate+'"]').append(gethtml)
          $('[data-insettemp="'+gettemplate+'"]').collapse("show")
          $('.customselect').selectpicker('refresh');
          $('.color-picker').colorpicker().on('changeColor', function(e){
              if(multycss){
                classb.updatejson('','',multycss)
                 
              }
          })
          if(multycss){
              classb.updatejson('','',multycss)
           }
           
     }
 })
 

 
  
 $('body').on('click', '[data-role="removeTextShedow"]', function(){
      $(this).closest('[data-role="textGroup"]').remove()
      var mylticss = $(this).data('mylticss')
       classb.updatejson('','',mylticss)
  }) 
  
  $('[data-insettemp="boxShadow"]').sortable({
        update: function( event, ui ) {
          classb.updatejson('','','boxShadow')
        }
    });
 
 $('body').on('click', '.spinner .btn:first-of-type ', function() {
       var spacingtype = $(this).closest('.spinner').find('.spacing-type:first').val()
       if(spacingtype!='auto'){
         var isauto  = $(this).closest('.spinner').find('input:first').val();
         if(isauto=="auto"){
            $(this).closest('.spinner').find('input:first').val(1)
         }
          var  newval = parseInt( $(this).closest('.spinner').find('input:first').val(), 10) + 1
          var  tycss = $(this).closest('.spinner').find('input:first').attr('id');
          $(this).closest('.spinner').find('input:first').val(newval).keyup();
        }
      });
  $('body').on('click', '.spinner .btn:last-of-type', function() {
        var spacingtype = $(this).closest('.spinner').find('.spacing-type:first').val()
        if(spacingtype!='auto'){
          var isauto  = $(this).closest('.spinner').find('input:first').val();
           if(isauto=="auto"){
              $(this).closest('.spinner').find('input:first').val(1)
           }
           var newval = parseInt( $(this).closest('.spinner').find('input:first').val(), 10) - 1
           var  tycss = $(this).closest('.spinner').find('input:first').attr('id');
           var  mim = $(this).closest('.spinner').find('input:first').data('min');
           if(mim || mim == 0){
             if(Number(mim) > Number(newval)){
                   return false;
              }
            }
           $(this).closest('.spinner').find('input:first').val(newval).keyup();
         }
         
  });  
  $('[data-tabnav="button"] a').click(function(){
      classb.updatenav();
      var getcyrntdata = $(this).data('rolecss');
      classb.chekedcssfor(getcyrntdata); 
      if(classb.generalSetting.csssetting.tabs[getcyrntdata]){
        classb.updatecss();
      }
      
   })
   $('[data-tabactive]').change(function(){
       classb.updatenav();
       classb.updatecss();
   })
   

  
  $('[data-loadnew]').click(function(){
      var getdata = $(this).data('loadnew');
      setTimeout(function(){ 
        if(classb.dataload){
            if(classb.dataload[getdata]){
               $('[data-export="json"]').val(JSON.stringify(classb.dataload[getdata]))
               classb.editReload();
               
            }
        }
     }, 500);
    $('#gradient-datalist').collapse('hide')
  })
  
 
  
  
  
	classb.editReload();
	
  $('[data-loadasset]').click(function(){
      var targetAsset = $(this).data('loadasset')
      if(classb.asset[targetAsset]){
          $.each(classb.asset[targetAsset], function(k, v){
            
                if(k=='width'){
                     v = v.replace("%", "");  
                     $('[data-css="width"]').next('.spacing-type').val('%')
                     $('[data-csstype="width"][data-getcontainer="widthFixed"]').click()
                } 
                if(k=='margin-left' || k=='margin-right'){
                  $('[data-css="'+k+'"]').next('.spacing-type').val('auto') 
                }
                
                if($('[data-css="'+k+'"]').is('input')){
                  $('input[data-css="'+k+'"]').val(v).keyup()
                }else  if($('[data-css="'+k+'"]').is('select')){
                  $('select[data-css="'+k+'"]').val(v).change()
                }
                $('.customselect').selectpicker('refresh');
                    
          })
       
      }
        
  })
	
	
	
})
