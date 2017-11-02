$(function(){
   $('.selectpicker').selectpicker();
   var loadclasstype = ''
   var groupclasstyle = 'box_styles'
   var styletype = 'stylescontianer'
   var activeseletor = "";
   var collectiontype =""
   var modeofmodal = 'new';
   var oldclass = ''
   var newmodaljson = ''
  
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
      activejson: {},
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
      editclasstye:{
          box_styles:['div', 'hr', 'css', 'img'],
          heading:['h1','h2','h3','h4', 'h5', 'h6' ],
          text_styles:['p','span'],
          button_style:['button', 'a']
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
          
        },
        extra:{},
        extraparth:{}
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
            classb.generalSetting.exportjson[classkey] = classb.generalSetting.component;
            
        }
			},
      compile:function(){
       
        	less.render([classb.less.replace("{{{lesscss}}}", classb.generalSetting.csssetting.savedcss)].join("\n\n")).then(
                
              function (output) {
                //alert(output.css);
                classb.sl.cssstyle.html(output.css)
               
              }, function (error) {
                //bootstrap.response("Error", error);
                  if(classb.generalSetting.csssetting.class!=''){
                    alert(error);
                  }
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
         $('[data-export="componentsjson"]').val(JSON.stringify(classb.generalSetting.component))
				classb.sl.cssview.attr('class', classb.generalSetting.csssetting.class)
        $('[data-export="componentsextra"]').val(JSON.stringify(classb.generalSetting.extraparth))
				
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
      deletecomponet:function(key, targetkey, deletetarkedkey){
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
          if(deletetarkedkey){
            if(classb.generalSetting.component[deletetarkedkey]){
              delete classb.generalSetting.component[deletetarkedkey]
            }
              
          }
          $('[data-export="componentsjson"]').val(JSON.stringify(classb.generalSetting.component))
      },
      updateExtracomponet:function(cp, cv, key){
				if(cp){
          if(!key){
              key = activeseletor;
          }
            
          var getfor =  key
          var cssselector =  $('[data-tabnav="button"]').find('.current').data('cssselector');
         // var activetabs = $('[data-type-selector] li.active').data('role');
           var activetabs = 'normal';
          if(getfor!='css'){
            cssselector = activeseletor;
          }
          if(!classb.generalSetting.extraparth){
             classb.generalSetting.extraparth = {}
          }
          
					if(getfor){
						if(!classb.generalSetting.extraparth[getfor]){
							classb.generalSetting.extraparth[getfor] = {}
						}
            if(!classb.generalSetting.extraparth[getfor][activetabs]){
              classb.generalSetting.extraparth[getfor][activetabs] = {}
            }
            if(cssselector){
               // classb.generalSetting.extra[getfor]['selector'] = cssselector;
              }
						classb.generalSetting.extraparth[getfor][activetabs][cp] = cv;
					}
				}
         $('[data-export="componentsextra"]').val(JSON.stringify(classb.generalSetting.extraparth))
			},
      deleteExtracomponet:function(key, targetkey, deletetarkedkey){
          if(key){
              if(!targetkey){
                  targetkey = activeseletor
              }
              var getfor =  targetkey
              var activetabs = $('[data-type-selector] li.active').data('role');
              if(getfor){
                  if(classb.generalSetting.extraparth[getfor]){ 
                    if(classb.generalSetting.extraparth[getfor][activetabs]){
                         if(classb.generalSetting.extraparth[getfor][activetabs][key]){  
                            delete classb.generalSetting.extraparth[getfor][activetabs][key];
                         }
                      }
                  }
              }
          }
          if(deletetarkedkey){
            if(classb.generalSetting.extraparth[deletetarkedkey]){
              delete classb.generalSetting.extraparth[deletetarkedkey]
            }
              
          }
          $('[data-export="componentsextra"]').val(JSON.stringify(classb.generalSetting.extraparth))
      },
      editmodal:function(){
        if(classb.generalSetting.csssetting.connnected){
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
            if(io != "selector"){
              //$('[data-css="'+io+'"][data-selector]').val(iv).change();
            var replasname = io+'-'
            var nameofclass = iv.replace(replasname , '').replace('.' , '')
            var htmls = '<div class="class_item" data-typeclass="'+io+'"><div class="col-md-6 prefix_area">'+io+'</div><div class="col-md-4 name_area">'+nameofclass+'</div> <button class="col-md-2 pull-right close_icon_area" data-buttonrole="delete"><i class="fa fa-close"></i> </button> </div>';
              $('#sortable').append(htmls)
              }
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
              $('[data-typeclasses="basic"]').empty()
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
              if(data.error){
                alert(JSON.stringify(data));
              }else{
              $('[data-typeclasses="collections"]').empty()
                $.each(data, function(key, val){
                         var name = val.replace(/_/g, " ");
                            name = name.replace(/-/g, " ");  
                        var htmlsli = '<li><a href="#" class="tpl-left-items" data-buttonrole="editpopup" data-type="'+collectiontype+'" data-buttonrole data-subtype="'+key+'">'+name+'</a> </li>';
                        $('[data-typeclasses="collections"]').append(htmlsli)
                      
                })
            }
      },
      getbasicclasses:function(data){
              if(data.data){
               //var createrow = $('<div class="row"></div>');
                if(data.data != ''){
                var getclassestype = $('[data-models="classes"] li.active').data('role');
                  var prefix = data.prefix;
                  
                   $.each(data.data, function(key, val){
                     
                      var gethtml = classb.getclassbox(val, prefix);
                      $('[data-classeslsit="'+getclassestype+'"]').append(gethtml)

                   })  
                  // createrow.appendTo('[data-existmodal="listing"]');
                   classb.dragnaddrop();
                 }else{
                     $('[data-classeslsit="'+getclassestype+'"]').append('Sorry '+loadclasstype+' style is not have in Basic tab,  please create <a href="#">'+loadclasstype+'</a> style')
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
      gettypecomponet:function(){
        
      },
      ajaxdone:{
          gettypedone:function(data){
              if(!data.error){
                  var gethtml = $('[data-template="typecomponet"]').html()
                  $('[componenmenu]').empty()
                   $('[data-modal="componenmenu"]').empty()
                   $('[data-modal="componenmenucontent"]').empty()
                  if(data){   
                  $.each(data, function(key, val){
                      //var createrow = $('<div class="row tab-pane" role="tabpanel" id="ctype'+key+'"></div>');
                      if(val !=''){
                      $.each(val, function(i, d){
                         //var htmls = classb.ajaxdone.returntumbdata(d)
                         //createrow.append(htmls)
                         $('[data-modal="componenmenu"]').append('<li><a href="#ctype'+d.type+'" class="tpl-left-items" data-name="'+d.name+'" data-type="'+d.type+'" data-core="'+key+'" data-p="'+i+'" data-buttonrole="getitem">'+d.name+'</a></li>');
                      })
                      //createrow.appendTo('[data-modal="componenmenucontent"]');
                     }
                  });
                      //$('[data-modal="componenmenu"] li').first().find('a').click();
                  }else{
                      $('[data-modal="componenmenucontent"]').append('please upload componet, ')
                  }
                  $('#componentslisting').modal('show')
              }
          },
          readtypecomponent:function(){
              var json = $('[data-typecomponet]').data('typecomponet')
              var optiondata = ''
             $.each(json, function(key, val){
                optiondata += ' <option value="'+key+'">'+val+'</option>'
             })
             $('[data-typecomponet]').html(optiondata)
          },
          returntumbdata:function(data){
            var html = $('[data-template="typecomponet"]').html()
                html = html.replace(/{name}/g, data.name)
                 var div = $('<div></div>')
                 div.append(html);
                 div.find('[data-buttonrole]').attr('data-original', 'true')
                 $.each(data, function(key, val){
                    if( typeof val =="object"){
                        val = JSON.stringify(val);
                    }
                   div.find('[data-buttonrole]').attr('data-'+key, val)
                })
              return div.html();
          },
          returntumbdatavaris:function(data){
            var html = $('[data-template="typecomponet"]').html()
                html = html.replace(/{name}/g, data.classname)
                var div = $('<div></div>')
                div.append(html)
                $.each(data, function(key, val){
                    if( typeof val =="object"){
                        val = JSON.stringify(val);
                    }
                   div.find('[data-buttonrole]').attr('data-'+key, val)
                  
                })
              return div.html();
          },
          getitemdone:function(data){
                if(data){
                  var componenmenucontent = $('[data-modal="componenmenucontent"]');
                    componenmenucontent.empty(); 
                   var createrow = $('<div class="row"></div>');
                   classb.activejson['originalextra'] = data.original;
                   if(data.original['data']){
                          var  htmls = classb.ajaxdone.returntumbdata(data.original['data'])
                              createrow.append(htmls)
                    };
                    $.each(data.variations, function(key, val){
                            //var  htmls = classb.ajaxdone.returntumbdatavaris(val)
                            //createrow.append(htmls);
                    })
                    createrow.appendTo('[data-modal="componenmenucontent"]');
                    componenmenucontent.find('[data-original]').click()
                  
                }
          }
      },
      ajaxget:{
          gettypecomponet:function(type){
            var data = {}
                data['type'] = type;
                sendajax('/admin/framework/component/get-components', data, classb.ajaxdone.gettypedone) 
                $('[data-modal="componenttitle"]').html(type);
                
          }
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
                  if(classb.getcssdata['tab']=="collections"){
                    var collectionparth = classb.dragdata['classpath']; 
                      if(classb.dragdata['cssdata']){
                          if(classb.dragdata['cssdata']['normal']){
                              $.each(classb.dragdata['cssdata']['normal'], function(key, val){
                                   
                                    var htmls = '<div class="class_item" data-typeclass="'+key+'"><div class="col-md-6 prefix_area">'+key+'</div><div class="col-md-4 name_area">'+val+'</div> <button class="col-md-2 pull-right close_icon_area" data-buttonrole="delete"><i class="fa fa-close"></i> </button> </div>';
                                    if($('#sortable').find('[data-typeclass="'+key+'"]').data('typeclass')){
                                        bootbox.confirm("Do you want to replace current style "+key, function(result){ 
                                            if(result){
                                              $('#sortable').find('[data-typeclass="'+key+'"]').remove();
                                               $('#sortable').append(htmls);
                                              classb.updatecomponet(key, val);
                                              classb.updateExtracomponet(key, collectionparth);
                                            }
                                        })
                                      
                                    }else{
                                       $('#sortable').append(htmls);
                                        classb.updatecomponet(key, val);
                                        classb.updateExtracomponet(key, collectionparth);
                                    }
                              }) 
                               classb.updatecss();
                          }
                          
                      }
                       
                       $('#sortable').find('#photo-file-drag').remove() 
                  }else{
                    classb.selectedclasshtml();
                  }
                   
                }
            });
      },
      selectedclasshtml:function(){
            var htmls = '<div class="class_item" data-typeclass="'+classb.dragdata['stype']+'"><div class="col-md-6 prefix_area">'+classb.dragdata['prefix']+'</div><div class="col-md-4 name_area">'+classb.dragdata['name']+'</div> <button class="col-md-2 pull-right close_icon_area" data-buttonrole="delete"><i class="fa fa-close"></i> </button> </div>';
                    if($('#sortable').find('[data-typeclass="'+classb.dragdata['stype']+'"]').data('typeclass')){
                      bootbox.confirm("Do you want to replace current style", function(result){ 
                        if(result){
                          $('#sortable').find('[data-typeclass="'+classb.dragdata['stype']+'"]').remove();
                          $('#sortable').find('#photo-file-drag').replaceWith(htmls);
                          classb.updatecomponet(classb.dragdata['stype'], classb.dragdata['realclass']);
                          classb.updateExtracomponet(classb.dragdata['stype'], classb.dragdata['classpath']);
                          classb.updatecss()
                        }else{
                           $('#sortable').find('#photo-file-drag').remove()
                        }
                      });
                    }else{
                    
                     $('#sortable').find('#photo-file-drag').replaceWith(htmls);
                      classb.updatecomponet(classb.dragdata['stype'], classb.dragdata['realclass']);
                      classb.updateExtracomponet(classb.dragdata['stype'], classb.dragdata['classpath']);
                      classb.updatecss();
              }
      },
      
      dragdata:{
        
      },
      getcssdata:{
        
      },
      opneeditpopyp:function(selector){
            var type = ''
            $.each(classb.editclasstye, function(key, val){
                  for (var i = 0; i < val.length; i++) {
                        if (val[i] === selector) {
                            type = key;
                            return true;
                        }
                  }
            })
            collectiontype = type
            $('[data-typeclasses="basic"]').empty()
            $('[data-typeclasses="collections"]').empty()
            $('[data-classeslsit]').empty()
             $('#sortable').empty();
            sendajax('/admin/framework/get-basic-subs', {type:type}, classb.getbasicitem)
            sendajax('/admin/framework/get-collections-subs', {type:type}, classb.getcollectionitem);
            classb.chekedcssfor(activeseletor)
            classb.updatecss()
      },
      editmode:function(data){
       $('[data-role="masterelementtree"]').empty()
      
        if(typeof data == 'string'){
            data = JSON.parse(data);  
        }
        var cssdata = {}
        oldclass = data.classname;
       
        $.each(data.css, function(kay, val){
            if(kay=="self"){
                kay = 'css';
            }
            if(val.normal){
              cssdata[kay] = val.normal;
            }
            if(val.selector){
              cssdata[kay]['selector'] = val.selector;
            }
            classb.editmodeli(kay);
        })
        classb.generalSetting.component = cssdata;
        classb.generalSetting.extraparth = data.extra;
        classb.modalehtml();
        classb.generalSetting.csssetting.classname = data.classname 
        $('[data-role="classname"]').val(data.classname).keyup();
        
      },
      newMode:function(){
           $('[data-role="masterelementtree"]').empty()
           classb.generalSetting = JSON.parse(newmodaljson);
            
           classb.modalehtml();
          $('[data-role="classname"]').val('default').keyup();
            
                $('[data-toolaction="selected"]').removeClass('active');
                if (classb.activejson['json']) {
                    delete classb.activejson['json']
                }
          
      },
      editmodeli:function(targetelement){
                var html = $('<li></li>');
                var htmlsstucher = $('[data-template="listingrow"]').html();
                var tagname = targetelement
                var cssselector = tagname.toLowerCase();
                var rowid = _.uniqueId('row_');
                htmlsstucher = htmlsstucher.replace(/{name}/g, tagname)
                htmlsstucher = htmlsstucher.replace(/{rowid}/g, rowid)
                htmlsstucher = htmlsstucher.replace(/{csstarget}/g, cssselector);
                htmlsstucher = htmlsstucher.replace('<i class="fa fa-plus" aria-hidden="true"></i>', '<i class="fa fa-trash-o" aria-hidden="true"></i>');
                htmlsstucher = htmlsstucher.replace('data-caction="collapse"', 'data-caction="deleteselector"');
                html.append(htmlsstucher);
                
              if(!$('[data-role="masterelementtree"] > ol').is('ol')){
                  $('[data-role="masterelementtree"]').append('<ol class="componetlisting"></ol>')
              }
              
              $('[data-role="masterelementtree"] > ol').append(html)
              $('[data-listingoption="active"]').each(function(){
                     activedeactive($(this));
              })
              
      },
      modalehtml:function(){
        if(classb.activejson['original']){
                $('[data-previewclass]').html(classb.activejson['original']['html'])
                $('[data-previewclass] > *').attr('data-role','classview')
                classb.sl.cssview = $('[data-role="classview"]');
                var term= classb.activejson['original']['data']['term'];
                $('[data-prefixcomponet]').data('prefixcomponet', term).prev('span').html(term);
                $('[data-role="modalactive"]').removeAttr('disabled')
        }
      },
      ajaxdelete:function(data){
         if (!data.error) {
            $('[data-toolaction="selected"].active').closest('.col-xs-12').remove()
            if (classb.activejson['class']) {
                delete classb.activejson['class'];
            }
        }
         
        if(data.error){
          alert(JSON.stringify(data));
        }
      },
      action:{
        edit:function(target){
            $('[data-tabpreview="setting"]').collapse('hide');
            $('[data-tabpreview="selectclass"]').collapse('show');
            var gettarget = target.closest('li').parent('ol')
            if(gettarget.is('.componetlisting')){
              if(gettarget.closest('[data-role="masterelementtree"]').data('role')){
                activeseletor = target.data('cssselector');
              }else{
                activeseletor = 'css';
              }
            }else{
              activeseletor  = target.data('cssselector'); 
            }
            classb.opneeditpopyp(target.data('cssselector'));
        },
        deleteselector:function(target){
              var gettarget = target.closest('li').parent('ol')
              if(gettarget.is('.componetlisting')){
                  if(gettarget.closest('[data-role="masterelementtree"]').data('role')){
                    gettargetkey = target.data('cssselector');
                  }else{
                    gettargetkey = 'css';
                  }
                }else{
                  gettargetkey  = target.data('cssselector'); 
                }  
          
            classb.deletecomponet('','',gettargetkey)
            classb.deleteExtracomponet('','',gettargetkey)
            target.closest('[data-listing]').remove();
            classb.updatecss();
           
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
           var getclassestype = $('[data-models="classes"] li.active').data('role');
          $('[data-classeslsit="'+getclassestype+'"]').html('<span class="ajaxloding"></span>')
           senddata['tab'] = getclassestype
           senddata['type'] = target.data('type');
           senddata['sub'] = target.data('subtype');
           styletype = 'bsc'+  senddata['sub'];
           styletype  = senddata['sub'];
           classb.getcssdata = {}
           classb.getcssdata = senddata; 
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
        selectmaster:function(target){
                var targetelement = $('[data-selectmaster]').val();
                if($('[data-role="masterelementtree"]').find('[data-cssselector="'+targetelement+'"]').is('[data-cssselector]')){
                  alert('Allready have '+targetelement+' master');
                  return false;
                }
               classb.editmodeli(targetelement);
  
        },
        delete:function(target){
          var targetid = target.closest('[data-typeclass]');
          targeclass = targetid.data('typeclass');
          classb.deletecomponet(targeclass)
          classb.deleteExtracomponet(targeclass);
          targetid.remove()
          classb.updatecss();
        },
        getitem:function(target){
                var data = {}
                if(target.data('core') == "cores"){
                  data['core'] = true;  
                }else{
                  data['core'] = false;
                }
                data['type'] = target.data('type');
                data['p'] = target.data('p');
                classb.activejson['type'] =  target.data('type');
                classb.activejson['sub'] =  target.data('p');
                sendajax('/admin/framework/component/get-items', data, classb.ajaxdone.getitemdone) 
               $('[data-modal="componenmenucontent"]').html('<span class="ajaxloding"></span>')
        }, 
        savecomponet:function(target){  
            var exportty = target.data('roletype');
         
            var data = {}   
            data['tab'] = 'component';
            data['type'] = $('[data-action="type"]').val()
            data['sub'] = $('[data-action="sub"]').val();   
            var exportjsonss = JSON.parse($('[data-export="json"]').val()) 
            var savejson = {}
            var classnamess = ''
            $.each(exportjsonss, function(key, val){
              classnamess = key
               savejson[key]= {}
              $.each(val, function(skey, sval){
                if(skey=="css"){
                  skey = 'self';
                }
                savejson[key][skey] = {}
                if(sval.selector){
                  savejson[key][skey]['selector'] = sval.selector
                  delete sval.selector;
                }
                savejson[key][skey]['normal'] = sval
              })
              
            })
            data['css'] = savejson;
           
           // alert(JSON.stringify(data))
           var outputlesscss = $('[data-export="css"]').val()
           var prefix = $('[data-prefixcomponet]').data('prefixcomponet')
           removeclassname  = '.'+classnamess;
           newname = '.'+prefix+'-'+classnamess
          outputlesscss = outputlesscss.replace(removeclassname,newname)
          data['lesscss'] = outputlesscss
          data['prefix'] = prefix;
          data['extra'] = classb.generalSetting.extraparth;
         
          if(exportty){
              alert(JSON.stringify(data));
          }else{
            if(modeofmodal=='edit'){
               data['old_classname'] = oldclass;
              // sendajax('/admin/framework/edit-class', data, classb.action.savecomponetsuccess)  
            }else{
              //sendajax('/admin/framework/create-class', data, classb.action.savecomponetsuccess)
            }
          }    
        },
        savecomponetsuccess:function(data){
              var message = data.message
              if (typeof message == 'object') {
                  var messagehtml = ''
                  $.each(message, function (key, val) {
                      messagehtml += key + ' ' + val + '<br>';
                  })
                  bootbox.alert(messagehtml);
              } else {
                  if (message) {
                      bootbox.alert(message);
                  }

              }
              if (data.data) {
                  /*var htmls = $('[data-template="listingitem"]').html()
                   $('[data-role="listitem"]').empty()
                   $.each(data.data, function(index, val){
                   var newhtmls = htmls;
                   newhtmls =  newhtmls.replace(/{name}/g, val.classname)
                   $('[data-role="listitem"]').append(newhtmls)

                   })*/


                  $('#editpopup').modal('hide');
                  location.reload();
              }
        },
        selected: function (target) {
            var getcssjson = target.closest('[data-role="items"]').find('[data-itemsjson="josn"]').val()
            if (target.hasClass('active')) {
                target.removeClass('active')
                if (classb.activejson['json']) {
                    delete classb.activejson['clas']
                    delete classb.activejson['json']
                }
            }else {
                $('[data-toolaction="selected"]').removeClass('active');
                target.addClass('active')
                var jso = JSON.parse(getcssjson);
                classb.activejson['clas'] = jso['classname']
                classb.activejson['json'] = getcssjson;
            }
        },
        itemedit:function(target){
              var getjson = target.data();
               classb.activejson['original'] = classb.activejson['originalextra'];
               $('[data-action="type"]').val(classb.activejson['type'])
               $('[data-action="sub"]').val(classb.activejson['sub'])
              if(getjson['original']){
                  modeofmodal = 'new'
                  classb.newMode()
               }else{
                  classb.activejson['clas'] = getjson['classname']
                  classb.activejson['json']  = JSON.stringify(getjson)
                  $('[data-tabpreview="setting"]').collapse('show');
                  $('[data-tabpreview="selectclass"]').collapse('hide');
                  classb.editmode(classb.activejson['json'])
                  modeofmodal = 'edit'
               }
              $('#componentslisting').modal('hide');
        },
        editselectedclass: function (target) {
            if (classb.activejson['json']) {
                $('[data-tabpreview="setting"]').collapse('show');
                $('[data-tabpreview="selectclass"]').collapse('hide');
                classb.editmode(classb.activejson['json'])
                modeofmodal = 'edit'
                $('#editpopup').modal('show');
            }
        },
        deletes: function (target) {
            if (classb.activejson['clas']) {
                var data = {}
                data['tab'] = 'component';
                data['type'] = $('[data-action="type"]').val()
                data['sub'] = $('[data-action="sub"]').val();  
                data['classname'] = classb.activejson['clas'];
                sendajax('/admin/framework/delete-class', data, classb.ajaxdelete)
            }

        },
        copy: function (target) {

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
    
   newmodaljson = JSON.stringify(classb.generalSetting);
  
  classb.dragnaddrop();
  classb.sortableaccept()
  //classb.ajaxget.gettypecomponet('button')
  classb.ajaxdone.readtypecomponent();
  
  $('[data-previewclass] > *').attr('data-role','classview')
  classb.sl.cssview = $('[data-role="classview"]');
 $('.componetlisting').remove();
  //classb.readElement();
  
  $('body').on('click', '[data-selectclass-s]' , function(e){
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
             classb.deleteExtracomponet(val);
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
  
  
  $('body').on('change','[data-listingoption="active"]', function(){
        activedeactive($(this));
        var ittrue = $(this).is(':checked');
        var selecter = $(this).data('cssselector');
        if(ittrue){
          if(classb.generalSetting.extra[selecter]){
            var data= JSON.stringify(classb.generalSetting.extra[selecter])
            classb.generalSetting.component[selecter] = JSON.parse(data)
            delete classb.generalSetting.extra[selecter]
          }
        }else{
          if(!classb.generalSetting.extra){
            classb.generalSetting.extra = {}
          }
          if(classb.generalSetting.component[selecter]){
            var data= JSON.stringify(classb.generalSetting.component[selecter])
            classb.generalSetting.extra[selecter] = JSON.parse(data)
            delete classb.generalSetting.component[selecter];
          }
        }
      classb.updatecss();
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
  }).on('click','[data-target="#editpopup"]', function(){
        $('[data-tabpreview="setting"]').collapse('show');
        $('[data-tabpreview="selectclass"]').collapse('hide');
        modeofmodal = 'new'
        var geteditmode = $(this).data('type');
        if(geteditmode){
          var getjson = $(this).closest('[data-role="items"]').find('[data-itemsjson="josn"]').val()
          if(getjson){
            classb.editmode(getjson)
            modeofmodal = 'edit'
          }else{
             classb.newMode()
          }
        }else{
          classb.newMode()
       }
      //classb.chekedcssfor('css')
      //classb.updatecss()
     // $('[data-role="classname"]').val('classname').keyup()
  }).on('click', '[data-toolaction]', function () {
        var thisevent = $(this).data('toolaction');
        if(classb.action[thisevent]){
          classb.action[thisevent]($(this));
        }
  }).on('change', '[data-typecomponet]', function(){
        classb.ajaxget.gettypecomponet($(this).val())
  })
  
  $('[data-models="classes"] a').click(function(){
            var grole = $(this).closest('li').data('role');                                    
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

