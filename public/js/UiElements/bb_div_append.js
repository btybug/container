$(document).ready(function () {
    var BBbutton;
    var types = {
        styles: '/modality/styles/options',
        templates: '/modality/templates/options',
        menus: '/admin/backend/menus/options',
        widgets: '/modality/widgets/options',
        units: '/modality/units/options',
        page_sections: '/modality/page-sections/options',
        placeholder_section: '/modality/placeholder_section/options',
        main_body_modality: '/modality/main_body_modality/options'
    };
	
	var jsondata = {};

		var jsondatafield = $('body').find('[data-pagejson="setting"]').val();
		if(jsondatafield  && jsondatafield!=''){
			if( typeof jsondatafield !='object'){
				jsondata = JSON.parse(jsondatafield);
			}
		}
		converturlString(jsondata)
    $("body").on('click', '.BBdivs', function(event) {
            var action = $(this).attr('data-action');
            var key = $(this).attr('data-key');
            var place = $(this).attr('data-place');
            var type = $(this).attr('data-type');
            var sub = $(this).attr('data-sub');
            var item = $(this).attr('data-item');
            var module = $(this).attr('data-module');
            var except = $(this).attr('data-except');
			var targetmodal = $(this).attr('data-targetmodal');
            BBbutton = $(this);
            $('.panel-body').empty();
            $.ajax({
                type: "post",
                datatype: "json",
                url: '/modality/settings-live',
                data: {
                    key: key,
                    action: action,
                    type: type,
                    sub: sub,
                    item: item,
                    module: module,
                    except: except,
                    place: place
                },
                headers: {
                    'X-CSRF-TOKEN': $("input[name='_token']").val()
                },
                success: function (data) {
                    if (!data.error) {
						if(targetmodal){
							
							$('#magic-settings .modal-title').html("Select " + action);
							$('#magic-body').html(data.html);
							$('#magic-settings').modal();
						}else{
							$('.custom-panel-title').html("Select " + action);
							$('.custom-panel-body').html(data.html);
							$('.settingmodal').removeClass('hidden');
							return false;
						}
                    }
                }
            });
        });


    $("body").on('click', '.closeIcon', function () {
        if(!$('.settingmodal').hasClass('hidden')) {
            $('.settingmodal').addClass('hidden');
            return false;
        }
    });

    $("body").on('click', '.styles', function () {
        $('body').find('.styles').addClass('btn-info');
        $('body').find('.styles').removeClass('btn-primary');
        $(this).removeClass('btn-info');
        $(this).addClass('btn-primary');
        var action = $(this).attr('data-action');
        var id = $(this).attr('data-id');
        var key = $(this).attr('data-key');
        $('.settingmodal').find('.modal-data-items').empty();

        var loader = $('<div/>', {
            class: 'loader'
        }).css({
            position: 'fixed',
            'z-index': 9999999999999,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: 'rgba( 255, 255, 255, .8 ) url("http://i.stack.imgur.com/FhHRx.gif") 50% 50%  no-repeat',
        });
        $('.settingmodal').find('.modal-data-items').append(loader);
        $.ajax({
            type: "post",
            datatype: "json",
            url: types[action],
            data: {
                id: id,
                key: key,
                action: action,
            },
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    $('.settingmodal').find('.modal-data-items').remove();
                    $('.settingmodal .modal-data').append(data.html);
                }
            }
        });
    });




    $('body').on('click', '.item', function () {
		if(BBbutton){
			$('body').find('.modal-data-items .btn-primary')
				.removeAttr('name')
				.removeAttr('value');
			$('body').find('.modal-data-items .btn-primary')
				.removeClass('btn-primary')
				.removeClass('active')
				.addClass('btn-info');


			$(this).removeClass('btn-info')
			$(this).addClass('btn-primary').addClass('active');
			if(typeof BBbutton != 'undefined') {
				$("input[data-name='" + BBbutton.attr("data-key") + "']").val($(this).find('input').attr('data-value')).trigger('change');
				var keys = BBbutton.attr('data-key');
				var bvalue = $(this).find('input').attr('data-value');
				jsondata[keys] = bvalue;
				converturlString(jsondata);
			}

			$('span[aria-hidden=true]').click();
			

			if(typeof BBbutton != 'undefined') {
				
				$('[data-bbplace="' + BBbutton.attr('data-key') + '"]').removeClass($('[data-bbplace="' + BBbutton.attr('data-key') + '"]').attr('data-style-old')).attr('data-style-old', $(this).find('input').attr('data-value')).addClass($(this).find('input').attr('data-value'));
			}
          	// changeUrlParam(keys, bvalue);
			BBbutton.text(bvalue)	 
			// var input= $(this).find('input')
			// input.attr('name',input.attr('data-key')).val(input.attr('data-value'));
		}
    });
	
	function converturlString(data){
		var url = jQuery.param(data);
		$('[datas-settingjson]').val(url);
	}
	
	
	

    /////////////////////////

    function reset(valuec) {
        var BBdropdown = $('body').find('.BBdropdown');

        $.each(BBdropdown, function (k, v) {
            console.log(v)
            var action = $(v).attr('data-action');
            var data = {id: $(v).attr('data-val')};
            var dropdown = $(v).attr('id');
            var url = types[action];
            $.ajax({
                type: "post",
                url: url,
                datatype: "json",
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $("input[name='_token']").val()
                },
                success: function (data) {
                    if (data) {
                        $('select[data-dropdown=' + dropdown + ']').html(data);
                        $('select[data-dropdown=' + dropdown + ']').val(valuec);
                    }
                }
            });
        })
    }



    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

    function changeUrlParam (param, value) {
        var currentURL = window.location.href+'&';
        var change = new RegExp('('+param+')=(.*)&', 'g');
        var newURL = currentURL.replace(change, '$1='+value+'&');

        if (getURLParameter(param) !== null){
            try {
                window.history.replaceState('', '', newURL.slice(0, - 1) );
            } catch (e) {
                console.log(e);
            }
        } else {
            var currURL = window.location.href;
            if (currURL.indexOf("?") !== -1){
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '&' + param + '=' + value);
            } else {
                window.history.replaceState('', '', currentURL.slice(0, - 1) + '?' + param + '=' + value);
            }
        }
        window.location.reload();
    }


});
/**
 * Created by Comp2 on 03-May-17.
 */
