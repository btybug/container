$(function(){
	
	function sendajaxvar(url, data, success){
						$.ajax({
								type: "post",
								datatype: "json",
								url: url,
								data: data,
								headers: {
									'X-CSRF-TOKEN': $("input[name='_token']").val()
								},
								success: function (data) {
									if(success){
									 success(data);
									}
									 return data;
								}
							});
				  }
	
	$('.selectpicker').selectpicker()
	var eventtab = $('[data-role="eventtab"]'),
	    eventtabtarget = $('[data-role="eventtabcont"]');
	var cout = 0;
	var activefunction =  false;
	var eventbuilder = {
		defulform:{
			
		},
		json: {
			
		},
		updatejson: function(key, val){
				eventbuilder.json[key] = val;
				$('[data-json="exportjson"]').val(JSON.stringify(eventbuilder.json))	
		},
		updatedtabfrom:function(){
					var settings = []
					$('[data-role="eventtabcont"] > .tab-pane').each(function(){
							var fromdata = {}
							var getformdata = $(this).find('[data-tabform]').serializeArray();
							$.each(getformdata, function(i, val){
								var name = val.name
								fromdata[name] = val.value;
							})
							settings.push(fromdata)
					})
					eventbuilder.updatejson('setting', settings);
		},
		addtabs:function(d){
				if(d.data){
					var tabsize = Number($('[data-role="eventtab"] > li').length) + 1;
					var createid  = 'event'+tabsize;
					var couts=  cout.data('cout');
						couts = Number(couts) + 1;
					cout.data('cout', couts)
					 cout.closest('li').find('.badge').text(couts)
				
					 eventbuilder.appnedtabs(d, createid, tabsize)
					$('.selectpicker').selectpicker('refresh');
					 $('[data-role="eventtab"] li:last > a').click();
					eventbuilder.updatedtabfrom()
									
				}
		},
		appnedtabs:function(datas, ids, names, updatedata){
			$('[data-role="eventtab"]').append(eventbuilder.createtabs(datas, ids, names));
			eventbuilder.createContianer(datas, ids, updatedata)
		},
		createtabs:function(d, id, names){
			var htms = $('<li><a href="#'+id+'" aria-controls="home" role="tab" data-toggle="tab" data-tabsindex="'+names+'">'+names+'</a></li>');
			
			return htms
					
		},
		createContianer:function(d, id,  upatefrom){
				var buttondata = {type:'buttons', ids:id}
				var contianerhtmls = $('<div role="tabpanel" class="tab-pane" id="'+id+'" />')
				var htmls = $('<form data-tabform="'+id+'" />');
				var select2  = {}
				$.each(d.data, function(key, val){
						htmls.append(eventbuilder.field.formgroup(val, key));
						if(val.type == 'select2'){
							select2[key] = val;
						}
				})	
				
				htmls.append(eventbuilder.field.formgroup(buttondata, 'button'));
				
				if(upatefrom){
							
							$.each(upatefrom, function(key, vals){
								var targetfrom = htmls.find('[name="'+key+'"]');
								if(targetfrom.is('[type="radio"]')){
									htmls.find('[name="'+key+'"][value="'+vals+'"]').prop('checked', true);
								}else if(targetfrom.is('[type="checkbox"]')){
									htmls.find('[name="'+key+'"][value="'+vals+'"]').prop('checked', true);
								}else{
									targetfrom.val(vals);
								}
							})
					}
			
			
				contianerhtmls.append(htmls)
				
				
				$('[data-role="eventtabcont"]').append(contianerhtmls);
				
					
				
		},
		editbuilder:function(d){
			
			if(d.tabs && d.form){
				var tabsize = 0;
				var datas = {data: d.form}
				eventbuilder.defulform = d.form
				$.each(d.tabs, function(i, data){
					tabsize = Number(tabsize) + 1;
					var createid  = 'event'+tabsize;
					eventbuilder.appnedtabs(datas, createid, tabsize,  data);
					
				});
				activefunction.find('.badge').text(tabsize);
				activefunction.find('[data-cout]').data('cout', tabsize)
				$('[data-role="eventtab"] li:last > a').click();
				eventbuilder.updatedtabfrom()
				$('.selectpicker').selectpicker('refresh');
			}
					
		},
		clickevent:{
			selectfunction: function(target, event){
						if(eventbuilder.json['event_namespace']){
							var getname = $(event.target).data('value');
							if(getname){
								activefunction = target
								target.closest('ul').find('li').removeClass('active')
								target.addClass('active');
								var makechange = false;
								if(!eventbuilder.json['function_namespace'] || eventbuilder.json['function_namespace'] != getname){
									makechange = true;
								}
								
								if(makechange){
									eventbuilder.updatejson('function_namespace', getname);
									eventbuilder.updatejson('setting', []); 
									var data = {event_namespace: eventbuilder.json['event_namespace'], function_namespace: getname}
									sendajaxvar('/admin/manage/event/get-event-function-relations', data, eventbuilder.editbuilder)
									$('[data-role="eventtab"], [data-role="eventtabcont"]').empty();
									$('[data-panelevent]').removeClass('hide')
									//$('[data-panelevent="functions"]').find('.badge').text('0')
									//$('[data-panelevent="functions"]').find('[data-cout]').data('cout', '0')
								}
								
							}
							
						}
						
			},
			addtab:function(target){
				if(eventbuilder.json['event_namespace']){
					cout = target
					var data = {namespace:eventbuilder.json['function_namespace']}
					target.closest('ul').find('li').removeClass('active')
					target.closest('li').addClass('active')
					var datas = {data:eventbuilder.defulform}
					eventbuilder.addtabs(datas)
					//sendajaxvar('/admin/manage/event/get-function-data', data, eventbuilder.addtabs)
				}
			},
			selectevent:function(target){
				if(!target.is('.active')){
					target.closest('.list-group').find('button').removeClass('active')
					target.addClass('active')
					eventbuilder.json = {}
					eventbuilder.updatejson('event_namespace', target.data('value'))
					$('[data-role="eventtab"], [data-role="eventtabcont"]').empty()
					$('[data-panelevent]').removeClass('hide')
					//$('[data-panelevent="functions"]').find('.badge').text('0')
					$('[data-panelevent="functions"]').find('ul').find('li').removeClass('active')
				}
			},
			saveevent:function(target){
				var aftersave = function(d){
					
				}
				
				sendajaxvar('/admin/manage/event/save-event-function-relations', eventbuilder.json, aftersave)
			},
			removetab:function(target){
				var targetdata = target.data('id');
				$('a[href="#'+targetdata+'"]').closest('li').remove()
				$('[data-role="eventtab"] a[href="#'+targetdata+'"]').closest('li').remove()
				$('[data-role="eventtabcont"] > .tab-pane[id="'+targetdata+'"]').remove()
				$('[data-role="eventtab"] li:last > a').click();
				eventbuilder.updatedtabfrom();
			},
			cleartab:function(target){
				var targetdata = target.data('id');
				var targetcontainer = $('[data-role="eventtabcont"] > .tab-pane[id="'+targetdata+'"]');
				$.each(eventbuilder.defulform, function(key, vals){
								var targetfrom = targetcontainer.find('[name="'+key+'"]');
								if(targetfrom.is('[type="radio"]')){
									targetcontainer.find('[name="'+key+'"][value="'+vals.value+'"]').prop('checked', true);
								}else if(targetfrom.is('[type="checkbox"]')){
									targetcontainer.find('[name="'+key+'"][value="'+vals.value+'"]').prop('checked', true);
								}else{
									targetfrom.val(vals.value);
								}
							})
					$('.selectpicker').selectpicker('refresh');
				eventbuilder.updatedtabfrom();
			}
		},
		field:{
			formgroup:function(d, name){
				var formgroup = $('<div class="form-group" />');
				var field = $('<div class="col-xs-9">')
				var label = $('<label class="col-xs-3 control-label text-left">');
					if(d.label){
							label.append(d.label);
					}
					if(d.type){
						if(eventbuilder.field[d.type]){
							
							field.append(eventbuilder.field[d.type](d, name));
							
						}
					}
					formgroup.append(label)
					formgroup.append(field)
				return formgroup;
			},
			select2:function(d, name){
				var htmls = $('<select name="'+name+'"  class="form-control selectpicker " data-select2="select2'+name+'" multiple></select>');
					var values = d.value;
						values = values.split(',')
					if(d.data){
						$.each(d.data, function(key, val){
							var options = $('<option value="'+key+'">'+val+'</option>');
							if(values.indexOf(key) > -1){
								options.attr('selected', 'selected')	
							}
							htmls.append(options);
						})
					}
					
				return htmls;
			},
			select:function(d, name){
				var htmls = $('<select name="'+name+'" class="form-control selectpicker" data-value=""></select>');
					var values = d.value;
						values = values.split(',')
					if(d.data){
						$.each(d.data, function(key, val){
							var options = $('<option value="'+key+'">'+val+'</option>');
							if(values.indexOf(key) > -1){
								options.attr('selected', 'selected')	
							}
							htmls.append(options);
							
						})
					}
					
				return htmls;
			},
			text:function(d, name){
				var htmls = $('<input type="text" name="'+name+'" class="form-control" value="'+d.value+'" >');
				return htmls;
			},
			textarea:function(d, name){
				var htmls = '<textarea class="form-control" name="'+name+'" >'+d.value+'</textarea>'
				return htmls;
			},
			radio:function(d, name){
				var htmls = '<label><input type="radio" name="optradio">Option 1</label>'
					if(d.data){
						htmls = ''
						$.each(d.data, function(key, val){
							if(key==d.value){
								htmls += '<label class="radio-inline"><input type="radio" value="'+key+'" name="'+name+'" checked="checked">'+val+'</label>'
							}else{
								htmls += '<label class="radio-inline"><input type="radio" value="'+key+'" name="'+name+'">'+val+'</label>'
							}
						})
					}
				return htmls
			},
			checkbox:function(d, name){
				var htmls = '<label class="checkbox-inline"><input type="checkbox" value="">Option 1</label>';
					var values = d.value;
					if(d.data){
						htmls = '';
						$.each(d.data, function(key, val){
							if(values.indexOf(key) > -1){
								htmls += '<label class="checkbox-inline"><input type="checkbox" value="'+key+'" name="'+name+key+'"  checked="checked">'+val+'</label>'
							}else{
								htmls += '<label class="checkbox-inline"><input type="checkbox" value="'+key+'" name="'+name+key+'" >'+val+'</label>'
							}
						})
					}
				return htmls
				
			},
			buttons:function(d){
					
					var htmls = '<button class="btn btn-success" type="button" data-btnclick="saveevent">Save</button> <button class="btn btn-warning" type="button" data-btnclick="cleartab" data-id="'+d.ids+'">Clean</button> <button class="btn btn-danger" type="button" data-btnclick="removetab" data-id="'+d.ids+'">Disconect</button>';
					return htmls
			}
		}
		
	}
	
	$('body').on('click', '[data-btnclick]', function(e){
			var targets = $(this).data('btnclick');
			if(eventbuilder.clickevent[targets]){
				eventbuilder.clickevent[targets]($(this), e);
			}
	})
	
	$('[data-role="eventtabcont"]').on('change', 'select, input[type="radio"], input[type="checkbox"]', function(){
			eventbuilder.updatedtabfrom()
	}).on('keyup', 'textarea, input[type="text"]', function(){
			eventbuilder.updatedtabfrom()
	})	
})