$(function(){
   $('.selectpicker').selectpicker();
   var getstyletype = $('[data-action="type"]').val();
   var subtype  = $('[data-action="sub"]').val();
  
   var loadclasstype = ''
   var groupclasstyle = 'box_styles'
   var styletype = 'stylescontianer'
   var activeseletor = "css";
   var styletype = '';
   var extralcass = "";
   var collectionheading = false;
   var extendedheading = '';
   var loadtimedata ='';
    styletype = getstyletype
  
  if(getstyletype){
    switch(getstyletype) {
          case 'icon_styles':
              extralcass = "fa fa-home"
              break;
        case 'heading':
              if(subtype=="default_heading"){
                styletype = 'heading_defult'
              }else{
                collectionheading = 'default_heading';
                extendedheading = subtype.replace('extended_','');
              }
              
              break;
        case 'menu_style':
              styletype = 'general'
              break;
          default:
             
      }
  }else{
    
    
  }
 

  
  
    function sendajax(url, data, success){
        $.ajax({
                type: "post",
                datatype: "json",
                url: url,
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('[name="_token"]').val()
                },
                success: function (data) {
                    if(success){
                     success(data);
                    }
                     return data;
                }
            });
  }
  
    function getclassmodal(data){
    if(data !=''){
        var gethtmls = $('[data-template="existinggroup"]').html()
        $('[data-existmodal="listing"]').html(gethtmls)
         
            //var heading = '<h5>'+key+'</h5>';
            //$('[data-existmodal="listing"]').append(heading)
           if(data.data[groupclasstyle]){
            $.each(data.data[groupclasstyle], function(index, css){
              var createrow = $('<div class="row tab-pane" role="tabpanel" id="popuptab'+index+'"></div>');
              var tabheading = '<li>'+
                                    '<a href="#popuptab'+index+'" aria-controls="home" role="tab" data-toggle="tab" class="tpl-left-items">'+
                                        '<span class="module_icon"></span> '+index+
                                    '</a>'+
                                '</li>';
              
              $('[data-existmodal="tabmenu"]').append(tabheading)
               $.each(css, function(i, csss){
                var gethtml = getlisthtml(csss);
                createrow.append(gethtml)
               })
               createrow.appendTo('[data-existmodal="listinggroup"]')
            })
           }else{
              $('[data-existmodal="listinggroup"]').append('please create '+loadclasstype+' style, ')
           }
      
          
          
         $('[data-existmodal="tabmenu"] li:first a').click()
         $('.ajaxloding').remove()
    }   
    
  }
  
  function getitemmodal(data){
    if(data.data){
       var createrow = $('<div class="row"></div>');
        if(data.data != ''){
           $.each(data.data, function(key, val){
             //alert(key+' '+JSON.stringify(val))
              //var heading = '<h5>'+key+'</h5>';
              //$('[data-existmodal="listing"]').append(heading)


              var gethtml = getlisthtml(val);
              createrow.append(gethtml)

           })  
           createrow.appendTo('[data-existmodal="listing"]')
         }else{
             $('[data-existmodal="listing"]').append('Sorry '+loadclasstype+' style is not have in Basic tab,  please create <a href="#">'+loadclasstype+'</a> style')
         }
         $('.ajaxloding').remove()
    }   
    
  }
  
   function getlisthtml (css){
    var htmls = $('[data-template="existinglist"]').html()
    var cssdata = JSON.stringify(css.css)
    htmls = htmls.replace(/{data}/g, cssdata)
    htmls = htmls.replace(/{type}/g, loadclasstype)
    htmls = htmls.replace(/{classpath}/g, css.classpath)
    htmls = htmls.replace(/{name}/g, css.classname)
    htmls = htmls.replace(/{realClass}/g, css.realClass)
    htmls = htmls.replace(/{styletype}/g, styletype)
    return htmls;
  }
  
  $('body').on('click', '[data-studiosub]', function(e){
        e.preventDefault()
          var classtype = $(this).data('studiosub'); 
          $('[data-studiosub]').removeClass('active')
          $(this).addClass('active');
          var sanddata = {type:classtype};
          groupclasstyle = $(this).data('type')
          loadclasstype = classtype
          styletype = $(this).data('type')
          var ifthisfrst = $('[data-targetselector]').index((this).closest('[data-targetselector]'))
         if(ifthisfrst=='0'){
           activeseletor = 'css';
         }else{
          activeseletor = $(this).closest('[data-targetselector]').data('targetselector');                        
           }
                                   
          $("#varModal").modal('show');
          $('[data-existmodal="listing"]').html('<span class="ajaxloding"></span>')
          $('[data-existmodal="name"]').html(classtype);
           $('[data-existingclass]').addClass('hide')
          $('[data-existingclass="'+classtype+'"]').removeClass('hide')
              
        sendajax('/admin/framework/get-subs-with-classes', sanddata, getclassmodal)
        
  }).on('click', '[data-studioitems]', function(e){
     e.preventDefault()
          var classtype = $(this).data('studioitems'); 
          var sanddata = {}
          sanddata['tab'] = $(this).data('tab');
          sanddata['type'] = $(this).data('type');
          var ifthisfrst = $('[data-targetselector]').index((this).closest('[data-targetselector]'))
         if(ifthisfrst=='0'){
           activeseletor = 'css';
         }else{
          activeseletor = $(this).closest('[data-targetselector]').data('targetselector');                        
           }
          sanddata['sub'] = classtype;
            loadclasstype = classtype
             styletype = $(this).data('styletypes')
          $("#varModal").modal('show');
          $('[data-existmodal="listing"]').html('<span class="ajaxloding"></span>')
          $('[data-existmodal="name"]').html(classtype)
          sendajax('/admin/framework/get-items', sanddata, getitemmodal)
        
  });
  
  function donelinkedclass(data){
      
    
  }
  function linkedclass(){
      var senddata = {}
      senddata['path'] = 'basic.background.colors.589753995b7bf'
      sendajax('/admin/framework/get-class-by-path', senddata, donelinkedclass)
      
  }
    

  
	var classb = {
			sl:{
				cssview : $('[data-role="classview"]'),
				cssstyle : $('[data-role="savedcss"]'),
				exportjson : $('[data-export="json"]'),
				exportcss : $('[data-export="css"]'),
				save : $('[data-save="componet"]'),
				controlLable:$('[data-role="classview"]').find('[data-fcontrol="label"]'),
				controlInput:$('[data-role="classview"]').find('[data-fcontrol="input"]'),
				labelPosition : $('.label-Position button'),
				selectedfield: ':hover'
			},
      preview:{
        text_styles:'<p data-preview="studio" data-role="classview"> Text Preview Here</p>',
        text_style_span:'<span data-preview="studio" data-role="classview"> Text Preview Here</span>',
        box_styles:'<div data-preview="studio" data-role="classview">Preview</div>',
        plain_text:'<p data-preview="studio" data-role="classview">Text Preview Here</p>',
        heading:'<h1 data-preview="studio" data-role="classview">Preview</h1>',
        icon_styles:'<i class="fa fa-home" data-preview="studio" data-role="classview"></i>',
        menu_style:'<ul data-preview="studio" data-role="classview"><li>Link-1</li><li>Link-2</li><li>Link-3</li><li>Link-4</li></ul>',
        button_style:'<button data-preview="studio" data-role="classview">Button</button>',
        navbar_style:'<nav data-preview="studio" data-role="classview"><ul style="list-style-type: none;color: #fff;"><li style="display: inline-block; margin:0 10px; ">Link-1</li><li style="display: inline-block;margin:0 10px;">Link-2</li><li style="display: inline-block;margin:0 10px;">Link-3</li><li style="display: inline-block;margin:0 10px;">Link-4</li></ul></nav>',
        text_input_style:'<input type="text" data-preview="studio" data-role="classview" value="My Input" name="">',
        radio_input_style:'<input type="radio" data-preview="studio" data-role="classview" value="" name="">',
        checkbox_input_style:'<input type="checkbox" data-preview="studio" data-role="classview" value="" name="">',
        hr_style:'<hr data-preview="studio" data-role="classview">',
        image_style:'<img data-preview="studio" data-role="classview" src="http://www.kpmmission.org/wp-content/uploads/2012/05/demo-image.jpg" style="height: 200px; width: 200px;">',
        link_style:'<a data-preview="studio" data-role="classview">Link here</a>',
        li_style:'<ul><li data-preview="studio" data-role="classview">Link-1</li><li data-preview="studio" data-role="classview">Link-2</li><li data-preview="studio" data-role="classview">Link-3</li><li data-preview="studio" data-role="classview">Link-4</li></ul>',
        ul_style:'<ul data-preview="studio" data-role="classview"><li>Link-1</li><li>Link-2</li><li>Link-3</li><li>Link-4</li></ul>'
      },
      reedit:{
          typecontianerstyle:{
              newstyle:['stylescontainer'],
              mystyle:['container_padding_margins', 'container_border_radius', 'container_shadow', 'container_background', 'container_animation']
          },
          typetextstyle:{
              newstyle:['stylestext'],
              mystyle:['text_padding_margins', '"text_shadow', 'text_background', 'text_animation']
          },
          typetextplainstyle:{
              newstyle:['stylesplaintext'],
              mystyle:['']
          },
          typeiconstyle:{
              newstyle:['stylesicon'],
              mystyle:['']
          }
        
      },
      less:"",
			generalSetting:{
				csssetting:{
					css:{},
					hover:{},
          selected:{}
				},
        exportjson:{},
        component:{
          
        },
        activetab:{
          
        }
			},
      
      
      
			runcss:function(){
       
        var generateless = classb.generalSetting.csssetting.classname+'{'
              $.each(classb.generalSetting.component, function(key, val){
                  
                  var selectors = val['selector'];
                  if(selectors){
                    generateless += selectors+'{';
                   }
                  
                   $.each(val, function(io, iv){
                      var notselector = false;
                      switch(io) {
                            case 'selector':
                                break;
                            case 'typetextstyle':
                                break;
                             case 'typecontianerstyle':
                                break;
                             case 'typetextplainstyle':
                                break;
                              case 'typeiconstyle':
                                break;  
                            default:
                               notselector = true;
                        }
                     
                      if(notselector){
                          if(io=='containerclass' || io== 'animationclass' || io== 'textclass' || io== 'iconclass' || io== 'padding_margins' || io== 'stylescontainer' || io== 'stylescontainer' || io== 'stylescontainer'|| io == 'text_styles'){
                            if(io== 'iconclass'){
                              generateless += '& > i{'
                              generateless+= iv+'; ';
                              generateless+='}';
                            }else if(io == 'text_styles' && key == 'css'){
                               generateless += '& > p{'
                               generateless+= iv+'; ';
                               generateless+='}';
                            }else{
                              generateless+= iv+'; ';
                            }
                          }else{
                            generateless+= iv+'; ';
                          }
                        }
                  })
                   
                  if(selectors){
                    generateless +='}'
                  }
                  
              })
          
            generateless +='}';
        var data = classb.generalSetting.csssetting.classname+'{'
				    $.each(classb.generalSetting.csssetting.css, function(io, iv){
          if(io=='containerclass' || io== 'animationclass' || io== 'textclass' || io== 'iconclass' || io== 'padding_margins'){
            if(io== 'iconclass'){
              data += '& i{'
              data+= iv+'; ';
              data+='}';
            }else{
            data+= iv+'; ';
            }
          }else{
					  data+= io +":"+iv+'; ';
          }

				});
        
				if(classb.generalSetting.csssetting.hover){
				  data += '&:hover{'
					$.each(classb.generalSetting.csssetting.hover, function(io, iv){
            if(io=='containerclass' || io== 'animationclass' || io== 'textclass' || io== 'iconclass'){
              if(io== 'iconclass'){
                  data += '& i{'
                  data+= iv+'; ';
                  data+='}';
                }else{
                data+= iv+'; ';
                }
            }else{
              data+= io +":"+iv+'; ';
            }
	
					});
				data+='}';
        
				}
        
        if(classb.generalSetting.csssetting.selected){
				  data += '&:active, &.active, &:focus  {'
					$.each(classb.generalSetting.csssetting.selected, function(io, iv){
            if(io=='containerclass' || io== 'animationclass' || io== 'textclass' || io== 'iconclass'){
             if(io== 'iconclass'){
                  data += '& i{'
                  data+= iv+'; ';
                  data+='}';
                }else{
                data+= iv+'; ';
                }
            }else{
              data+= io +":"+iv+'; ';
            }
	
					});
				data+='}';
        
				}
        
        
				data+='}';
				classb.generalSetting.csssetting.savedcss = generateless;
				//classb.sl.exportcss.val(classb.generalSetting.csssetting.savedcss)
        classb.sl.exportcss.val(generateless)
        classb.compile()
        
        var classkey = classb.generalSetting.csssetting.class;
        classb.generalSetting.exportjson = {}
        if(classkey){
            classb.generalSetting.exportjson[classkey] = {}
				    classb.generalSetting.exportjson[classkey]['normal'] = classb.generalSetting.component.css;
            classb.generalSetting.csssetting['connnected'] = classb.generalSetting.exportjson[classkey];
        }
        
       
			},
      compile:function(){
       
        	less.render([classb.less.replace("{{{lesscss}}}", classb.generalSetting.csssetting.savedcss)].join("\n\n")).then(
                
              function (output) {
                //alert(output.css);
                classb.sl.cssstyle.html(output.css)
               
              }, function (error) {
                //bootstrap.response("Error", error);
                  alert(error);
              });
        
          
          
      },
			updatecss:function(cp, cv, key){
				if(cp){
          if(!key){
					   key =  'css';
          }
					if(key){
						if(!classb.generalSetting.csssetting[key]){
							classb.generalSetting.csssetting[key] = {}
						}
						classb.generalSetting.csssetting[key][cp] = cv;
					}
				}
				classb.runcss()
				classb.sl.exportjson.val(JSON.stringify(classb.generalSetting.exportjson))
        $('[data-export="hoverjson"]').val(JSON.stringify(classb.generalSetting.csssetting));
				classb.sl.cssview.attr('class', extralcass+' '+classb.generalSetting.csssetting.class)
				
			},
      updatecomponet:function(cp, cv, key){
				if(cp){
          if(!key){
              key = activeseletor;
          }
          
					var getfor =  key
          var cssselector =  $('[data-tabnav="button"]').find('.current').data('cssselector');
          if(getfor!='css'){
            cssselector = activeseletor;
          }
          
					if(getfor){
						if(!classb.generalSetting.component[getfor]){
							classb.generalSetting.component[getfor] = {}
						}
            if(cssselector){
                classb.generalSetting.component[getfor]['selector'] = cssselector;
              }
						classb.generalSetting.component[getfor][cp] = cv;
					}
				}
         $('[data-export="componentsjson"]').val(JSON.stringify(classb.generalSetting.component))
			},
      deletecomponet:function(key, targetkey){
          if(key){
              if(!targetkey){
                  targetkey = activeseletor
              }
              var getfor =  targetkey
              if(getfor){
                  if(classb.generalSetting.component[getfor]){  
                     if(classb.generalSetting.component[getfor][key]){  
                        delete classb.generalSetting.component[getfor][key];
                        $('[data-styletypes="'+key+'"]').prev('input').val('');
                     }
                  }
              }
          }
          $('[data-export="componentsjson"]').val(JSON.stringify(classb.generalSetting.component))
      },
      editmodal:function(){
        if(classb.generalSetting.component){
             classb.chekedcssfor('css');
          }
      },
			editReload:function(){
				var getjsonvale = $('[data-export="componentsjson"]').val()
       if(getjsonvale){
				
         classb.generalSetting.component = JSON.parse(getjsonvale);
			    classb.chekedcssfor('css')
					
				}
			},
			chekedcssfor:function(ccf){
         $('[data-styletypes]').prev('input').val('')
          
       if(classb.generalSetting.component[ccf]){
         $('#sortable').empty();
					$.each(classb.generalSetting.component[ccf], function(io, iv){
              //$('[data-css="'+io+'"][data-selector]').val(iv).change();
            var replasname = io+'-'
            var nameofclass = iv.replace(replasname , '').replace('.' , '')
            var htmls = '<div class="class_item" data-typeclass="'+io+'"><div class="col-md-6 prefix_area">'+io+'</div><div class="col-md-4 name_area">'+nameofclass+'</div> <button class="col-md-2 pull-right close_icon_area" data-buttonrole="delete"><i class="fa fa-close"></i> </button> </div>';
              $('#sortable').append(htmls)
						});
				}
        
                 
			},
			csspropa:{
				boxshadow:function(){

				}
			},
      addpopup:function(target){
        var type = target.data('addpopup');
        if(!type){
          var type = target.data('editpopup');
        }
        var html ='<iframe data-viewiframe="iframe" src="'+type+'-studio.html"></iframe>'   
        bootbox.dialog({
          message: html,
          title: type+" Studio",
          className:"bigpopup"
        })
        
        $('[data-viewiframe="iframe"]').load();
        
      },
      getpanel:function(key){
          panelhtml = $('[data-template="keypanel"]').html()
          panelhtml = panelhtml.replace(/{name}/g, key)
          panelhtml = panelhtml.replace(/{type}/g, key)
          return panelhtml
      },
      readElement:function(){
            var gethtml = $('<div data-html="html"></div>')
             gethtml = gethtml.append($('[data-previewclass]').html());
            var getlsit =   classb.readdataelement(gethtml.children()) 
            $('.componetlisting').remove();
            $('[data-role="elementtree"]').html('<ol class="componetlisting"></ol>');
            $('[data-role="elementtree"] > ol').append(getlsit);
            
      },
      readdataelement:function(target){
            var htmlsdata = $('<div></div>');
            target.each(function(){
            var html = $('<li></li>');
            var htmlsstucher = $('[data-template="listingrow"]').html();
                var tagname = $(this).prop('tagName')
                var cssselector = tagname.toLowerCase();
                var rowid = _.uniqueId('row_');
                htmlsstucher = htmlsstucher.replace(/{name}/g, tagname)
                htmlsstucher = htmlsstucher.replace(/{rowid}/g, rowid)
                htmlsstucher = htmlsstucher.replace(/{csstarget}/g, cssselector);
                if(!$(this).children('*').prop('tagName')){
                  htmlsstucher = htmlsstucher.replace('<i class="fa fa-plus" aria-hidden="true"></i>', '<i class="fa" aria-hidden="true"></i>');
                  htmlsstucher = htmlsstucher.replace('data-caction="collapse"', 'data-caction="nocollapse"');
                }
                html.append(htmlsstucher);
                var createol = $('<ol></ol');
                if($(this).children('*').prop('tagName')){
                  var htmls =  classb.readdataelement($(this).children())  
                  createol.append(htmls);
                  html.append(createol)
                }
                htmlsdata.append(html)
             })
            return htmlsdata.html()
      },
      getbasicitem:function(data){
          if(data.data){
                $.each(data.data, function(key, val){
                     $.each(val, function(inde, types){
                     
                        var name = types.replace(/_/g, " ");
                            name = name.replace(/-/g, " ");  
                        var htmlsli = '<li><a href="#" class="tpl-left-items" data-buttonrole="editpopup" data-type="'+key+'" data-buttonrole data-subtype="'+types+'">'+name+'</a> </li>';
                        $('[data-typeclasses="basic"]').append(htmlsli)
                      })
                })
          }
          if(data.error){
            alert(data.message);
          }
          
      },
      getcollectionitem:function(data){
          if(data.data){
              $.each(data.data, function(key, val){
                    var classnem = val.classname
                    classnem = classnem.toLowerCase();
                    if(extendedheading == classnem ){
                        classb.generalSetting.headingdata = val.css;
                      loadtimedata = JSON.stringify(classb.generalSetting)
                    }
              })
            }
          if(data.error){
            alert(data.message);
          }  
        
      },
      applydefultclasses:function(){
            if(classb.generalSetting.headingdata){
                if(classb.generalSetting.headingdata['normal']){
                    classb.generalSetting.component['css'] = classb.generalSetting.headingdata['normal'];
                    classb.editmodal();
                }
            }
      },
      getbasicclasses:function(data){
              if(data.data){
               //var createrow = $('<div class="row"></div>');
                
                if(data.data != ''){
                
                  var prefix = data.prefix;
                  
                   $.each(data.data, function(key, val){
                     
                      var gethtml = classb.getclassbox(val, prefix);
                      $('[data-classeslsit="basic"]').append(gethtml)

                   })  
                  // createrow.appendTo('[data-existmodal="listing"]');
                   classb.dragnaddrop();
                 }else{
                     $('[data-classeslsit="basic"]').append('Sorry '+loadclasstype+' style is not have in Basic tab,  please create <a href="#">'+loadclasstype+'</a> style')
                 }
                 $('.ajaxloding').remove()
            } 
      },
      getclassbox:function(css, prefix){
          var htmls = $('[data-template="listingclasses"]').html()
          var cssdata = JSON.stringify(css.css)
          htmls = htmls.replace(/{data}/g, cssdata);
          htmls = htmls.replace(/{type}/g, loadclasstype);
          htmls = htmls.replace(/{classpath}/g, css.classpath);
          htmls = htmls.replace(/{name}/g, css.classname)
          htmls = htmls.replace(/{realClass}/g, css.realClass);
          htmls = htmls.replace(/{styletype}/g, prefix);
          htmls = htmls.replace(/{prefix}/g, prefix);
          
          return htmls;
      },
      dragnaddrop:function(){
            $( "#draggable li" ).draggable({
                connectToSortable: "#sortable",
                helper:  function(n) {
                      return document.body.classList.add("dragging"), classb.draggablehelper($(this));
                  },
                appendTo: "body",
                revert: false,
                cursorAt: {
                  top:0,
                  left: 0
                },
                revert:function(socketObj) {
                          if (socketObj === false) {
                          // Drop was rejected, revert the helper.

                                return true;
                              } else {
    
                                // Drop was accepted, don't revert.
                                return false;
                              }
                }
            });
      },
      draggablehelper:function(target){ 
         
          var getdata = target.data()
          classb.dragdata = {}
          $.each(getdata, function(key, val){
                 classb.dragdata[key] = val;
          })
          var htmls = classb.dragdata['name'];
          return $('<div id="photo-file-drag" class="photo-file-drag" data-dragdata=""></div>').append(htmls);
      },
      sortableaccept:function(){
          $( "#sortable" ).sortable({
                revert: true,
                receive: function(event, ui) {
                   var htmls = '<div class="class_item" data-typeclass="'+classb.dragdata['stype']+'"><div class="col-md-6 prefix_area">'+classb.dragdata['prefix']+'</div><div class="col-md-4 name_area">'+classb.dragdata['name']+'</div> <button class="col-md-2 pull-right close_icon_area" data-buttonrole="delete"><i class="fa fa-close"></i> </button> </div>';
                    if($(this).find('[data-typeclass="'+classb.dragdata['stype']+'"]').data('typeclass')){
                      
                      bootbox.confirm("Do you want to replace current style", function(result){ 
                        if(result){
                          $('#sortable').find('[data-typeclass="'+classb.dragdata['stype']+'"]').remove();
                          $('#sortable').find('#photo-file-drag').replaceWith(htmls);
                          classb.updatecomponet(classb.dragdata['stype'], classb.dragdata['realclass']);
                          classb.updatecss()
                        }else{
                           $('#sortable').find('#photo-file-drag').remove()
                        }
                      });
                    }else{
                    
                      $(this).find('#photo-file-drag').replaceWith(htmls);
                      classb.updatecomponet(classb.dragdata['stype'], classb.dragdata['realclass']);
                      classb.updatecss();
                    }
                }
            });
      },
      dragdata:{
        
      },
      action:{
        edit:function(target){
            $('[data-tabpreview="setting"]').collapse('hide');
            $('[data-tabpreview="selectclass"]').collapse('show');
            var gettarget = target.closest('li').parent('ol')
            if(gettarget.is('.componetlisting')){
              activeseletor = 'css';
            }else{
              activeseletor  = target.data('cssselector'); 
            }
            
        },
        save:function(target){
           $('[data-tabpreview="setting"]').collapse('show')
            $('[data-tabpreview="selectclass"]').collapse('hide');
        },
        decline:function(target){
            $('[data-tabpreview="setting"]').collapse('show');
            $('[data-tabpreview="selectclass"]').collapse('hide');
        },
        editpopup:function(target){
          var senddata = {}
          $('[data-classeslsit="basic"]').html('<span class="ajaxloding"></span>')
           senddata['tab'] = 'basic'
           senddata['type'] = target.data('type');
           senddata['sub'] = target.data('subtype');
           styletype = 'bsc'+  senddata['sub'];
           styletype  = senddata['sub'];
            target.closest('ul').find('li').removeClass('active_class')
          target.closest('li').addClass('active_class')  
           sendajax('/admin/framework/get-class-with-tab-type-sub', senddata, classb.getbasicclasses)
        },
        collapse:function(target){
            if(target.is('.active')){
                target.removeClass('active')
                target.parent('[data-rowid]').next('ol').slideDown();
                target.find('.fa').removeClass('fa-minus');   
            }else{
               target.addClass('active')
               target.parent('[data-rowid]').next('ol').slideUp()
               target.find('.fa').addClass('fa-minus');
            }
        },
        delete:function(target){
          var targetid = target.closest('[data-typeclass]');
          targeclass = targetid.data('typeclass');
          
          classb.deletecomponet(targeclass)
          classb.updatecss();
          targetid.remove()
        }
      }
		}
		
		classb.generalSetting.csssetting.savedcss = '';
		
		
		
	$.get("/app/Modules/Framework/Resources/Views/assets/base.min.css", function(data){
      	classb.less = data;
        classb.less += '{{{lesscss}}}';
        classb.editReload()
	});
 
   var componetjson = $('[data-component="json"]').val();
  var htmlsstucher = {
        tab : '<li class="tab-link" data-rolecss="{rolecss}" data-tab="tab-6">{name}</li>',
        tabcontener : '<li class="tab-link current" data-rolecss="css" data-tab="tab-6">Normal</li>'
  }
  
     
   classb.generalSetting.csssetting.class = $('[data-role="classname"]').val();
   classb.generalSetting.csssetting.classname = '.'+classb.generalSetting.csssetting.class;
   loadtimedata = JSON.stringify(classb.generalSetting)
  
 
  if(classb.preview[getstyletype]){
    $('[data-preview="studio"]').replaceWith(classb.preview[getstyletype]);
  }
    $('[data-typeclasses="basic"]').empty();  
    sendajax('/admin/framework/get-basic-subs', {type:styletype}, classb.getbasicitem);
    
    if(collectionheading){
        senddata = {}
        senddata['tab'] = 'collections'
        senddata['type'] = getstyletype
        senddata['sub'] = collectionheading;
        
        sendajax('/admin/framework/get-class-with-tab-type-sub', senddata, classb.getcollectionitem);
    }
  
    
    
    classb.dragnaddrop();
    classb.sortableaccept()
  
  $('[data-previewclass] > *').attr('data-role','classview')
  classb.sl.cssview = $('[data-role="classview"]');
 
  classb.readElement();
  
  $('body').on('click', '[data-selectclass]' , function(e){
    e.preventDefault();
		var thiscsspro = $(this).attr('data-css');
    var styletypeinfo = $(this).data('stype');
		var thisval = $(this).data('realclass')
    var typeofclass = thiscsspro.replace("class", "");
    var cssdata = $(this).data('cssdata');
    
    $('[data-studiosub].active').prev('input').val(thisval);
    $('[data-studiosub]').removeClass('active');
    
    if(thisval !='undefined'){
    classb.updatecomponet(styletypeinfo, thisval);
      $.each(cssdata, function(key, val){
        classb.updatecss(key,val)
      })
    }
    //classb.updatecss(thiscsspro,thisval)
    $("#varModal").modal('hide');
    $('[data-studioitems]').removeClass('active')
	})
  
	$('[data-role="classname"]').keyup(function(){
			var getname = $(this).val();
			var classnames = getname.replace(/ /g, "-");
			classb.generalSetting.csssetting.class = classnames;
			classb.generalSetting.csssetting.classname = '.'+classnames;
			classb.updatecss()
	})
	
  $('[data-role="typestyle"]').change(function(){
      var getchekedinfor  = $(this).val()    
      var csstype  = $(this).data('csstype')   
       checktypestyle($(this))
       reupdatestyletype(csstype, getchekedinfor)
       classb.updatecomponet(csstype, getchekedinfor);
    
  });
  $('[data-role="typestyle"]').each(function(){
      checktypestyle($(this))
  })
  
  function reupdatestyletype(tyle, subkey){
     
      if(classb.reedit[tyle][subkey]){
           $.each(classb.reedit[tyle][subkey], function(key, val){
              classb.deletecomponet(val);
           })
           classb.updatecss();
            
      }   
    
  }
  
  function checktypestyle(target){
    var getnaem = target.attr('name');
    var getvalye  = $('[name="'+getnaem+'"]:checked').val()
     target.closest('[data-group]').find('[data-styletype]').addClass('hide')
     target.closest('[data-group]').find('[data-styletype="'+getvalye+'"]').removeClass('hide')
  }
  
  
  $('[data-listingoption="active"]').change(function(){
        activedeactive($(this));
  })
  $('[data-listingoption="active"]').each(function(){
       activedeactive($(this));
  })
  
  function activedeactive(target){
      var istru = target.is(':checked')
        var targetrow = target.closest('[data-listing="row"]')
        if(istru){
            targetrow.removeClass('disabledlist')
           targetrow.find('button[type="button"]').removeAttr('disabled')
        }else{
            targetrow.find('button[type="button"]').attr('disabled', 'disabled')
            targetrow.addClass('disabledlist')
        }
  }
  
  
  $('[data-save="componet"]').click(function(){
       var getjson = JSON.parse($('[data-export="json"]').val())
       alert(JSON.stringify(getjson))
  });
  $('body').on('click', '[data-caction]', function(){
               var gettype = $(this).data('caction')
               if(classb.action[gettype]){
                    classb.action[gettype]($(this));
               }
               
   }).on('click', '[data-buttonrole]', function(){
        var gettype = $(this).data('buttonrole')
          if(classb.action[gettype]){
                   classb.action[gettype]($(this));
         }
  }).on('click','[data-toolaction="edit"]', function(){
       var getcss = $('[data-toolaction="selected"].active').data('itemjson');
      $( "#sortable" ).empty();
       if(getcss){
          if(getcss.css){
              classb.generalSetting.csssetting.css = getcss.css['normal'];
          }
          if(getcss.csssetting){
            classb.generalSetting.component['css'] = getcss.csssetting['normal'];
              
              classb.editmodal()
           }else{
             classb.generalSetting.component = {}
              classb.editmodal()
           }
         if(getcss.classname){
            classb.generalSetting.csssetting.classname = getcss.classname 
            $('[data-role="classname"]').val(getcss.classname).keyup()
         }
       }
      classb.updatecss()
    
 }).on('click','[data-target="#myModal"]', function(){
      classb.generalSetting = JSON.parse(loadtimedata);
      $( "#sortable" ).empty();
      classb.applydefultclasses();  
      classb.chekedcssfor('css')
      classb.updatecss()
      $('[data-role="classname"]').val('classname').keyup()
  })
  
  $('[data-role="addnewclass"]').click(function(){
      bootbox.prompt("Enter New Class name", function(result){ 
          if(result){
                var newclass = '<li class="tab-link" data-tab="tab-2">'+result+'<i class="fa fa-check-circle-o" aria-hidden="true"></i></li>';
                $('[data-role="classlist"]').append(newclass);
          }
      });
  })
 
})

