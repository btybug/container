$(function(){
   $('[data-role="selectStudio"]').val('animation').selectpicker('refresh');
	var classb = {
			sl:{
				cssview : $('[data-preview="studio"]'),
				cssstyle : $('[data-role="savedcss"]'),
				exportjson : $('[data-export="json"]'),
				exportcss : $('[data-output="studio"]'),
				save : $('[ data-save="class"]')
			},
			generalSetting:{
				csssetting:{},
         exportjson:{}
			},
			runcss:function(){
				var data = classb.generalSetting.csssetting.classname+'{'
				$.each(classb.generalSetting.csssetting.css, function(io, iv){
					data+= io +":"+iv+'; ';

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
        }

			},
			updatecss:function(){
				classb.runcss()
        classb.sl.exportjson.val(JSON.stringify(classb.generalSetting.exportjson))
        $('[data-export="hoverjson"]').val(JSON.stringify(classb.generalSetting.csssetting));
				classb.sl.cssview.attr('class', classb.generalSetting.csssetting.class);
        
        

			},
			editReload:function(){
				var getjsonvale = classb.sl.exportjson.val()
				if(getjsonvale){
					classb.generalSetting.csssetting = JSON.parse(getjsonvale);
					$.each(classb.generalSetting.csssetting.css, function(io, iv){
						iv = iv.replace('px','')
						$('[data-css="'+io+'"][data-selector]').val(iv).change();
						if($('[data-css="'+io+'"]').is('.settingSlider')){
							iv = iv.replace('s','')
							$('[data-css="'+io+'"].settingSlider').slider('value', iv).change();
						}
						if($('[data-textcolor="'+io+'"]').is('[data-textcolor]')){
							$('[data-css="'+io+'"]').val(iv).change();
						}
					});
				}
			},
			csspropa:{
				boxshadow:function(){

				}
			}
		}
		classb.generalSetting.csssetting.class = $('[data-role="classname"]').val();
		classb.generalSetting.csssetting.savedcss = '';
		classb.generalSetting.csssetting.classname = '.'+classb.generalSetting.csssetting.class;
		classb.generalSetting.csssetting.css = {};


	$('.settingSlider').each(function() {
		var smin= $(this).data('slide-min');
		var smax=$(this).data('slide-max');
		var sval= $(this).data('slide-val');
		var step= $(this).data('slide-step');
		var effet = $(this).data('adjust');
		$( this ).empty().slider({
			range: "min",
			value: sval,
			min:smin,
			max:smax,
			step: step,
			animate: true,
			slide: function( event, ui ) {
				var thisval = ui.value;
				var thiscsspro = $(this).attr('data-css');
				var thiscssafte = $(this).attr('data-css-after');
				classb.generalSetting.csssetting.css[thiscsspro] = thisval+thiscssafte;
				classb.updatecss()
			}
		});
	});

	$('.color-picker').colorpicker().on('changeColor', function(e){
		e.preventDefault();
		var color = e.color.toHex();
		var stype = $(this).data('textcolor');
		classb.generalSetting.csssetting.css[stype] = color;
		classb.updatecss()
	});
	$('select[data-selector]').change(function(){
		var thiscsspro = $(this).attr('data-css');
		var thisval = $(this).val()
		classb.generalSetting.csssetting.css[thiscsspro] = thisval;
		classb.updatecss()
	})
	$('[data-role="classname"]').keyup(function(){
			var getname = $(this).val();
			var classnames = getname.replace(/ /g, "-");
			classb.generalSetting.csssetting.class = classnames;
			classb.generalSetting.csssetting.classname = '.'+classnames;
			classb.updatecss()
	})

	classb.editReload();

	


})
