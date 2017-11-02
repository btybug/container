$(document).ready(function () {
    var BBbutton;
    var bbdataoption;
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

    $('body').on('click', '.BBbuttons', function () {
        var bbdata = $(this).data();
        bbdataoption = bbdata;
        BBbutton = $(this);
        if (!bbdataoption['targetappend']) {
            var targetappaned = $(this).closest('[data-bbbuttonappend]').data('bbbuttonappend')
            if (targetappaned) {
                if (targetappaned == "setting") {
                    targetappaned = 'changehtml'
                }
                bbdataoption['targetappend'] = targetappaned;
            }
        }
        var targetappaned = bbdataoption['targetappend'];
        if (targetappaned) {
            $('[data-bbbuttonappend="' + targetappaned + '"]  [data-targetput]').empty();
        }

        $('#magic-body').empty();
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/modality/settings-live',
            data: bbdata,
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    if (targetappaned) {
                        $('[data-bbbuttonappend="' + targetappaned + '"] [data-targetput]').html(data.html);
                        $('[data-bbbuttonappend="' + targetappaned + '"]').collapse('show')
                        $('[data-bbbuttonappend]').not('[data-bbbuttonappend="' + targetappaned + '"]').collapse('hide');
                    } else {
                        $('#magic-settings .modal-title').html("Select " + bbdata['action']);
                        $('#magic-body').html(data.html);
                        $('#magic-settings').modal();
                    }
                }
            }
        });
    }).on('click', '[data-bbclick]', function () {
        var targetopen = $(this).data('targetopen');
        $(this).closest('[data-bbbuttonappend]').collapse('hide');
        if (targetopen) {
            $('[data-bbbuttonappend="' + targetopen + '"]').collapse('show');
        }
    });


    $('body').on('click', '.styles', function () {
        $('body').find('.styles').addClass('btn-info');
        $('body').find('.styles').removeClass('btn-primary');
        $(this).removeClass('btn-info');
        $(this).addClass('btn-primary');
        var action = $(this).attr('data-action');
        var id = $(this).attr('data-id');
        var key = $(this).attr('data-key');
        $('#magic-settings').find('.modal-data-items').empty();
        var targetappaned = bbdataoption['targetappend'];
        if (targetappaned) {
            $('[data-bbbuttonappend="' + targetappaned + '"]').find('.modal-data-items').empty();
        }
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
        $('#magic-settings').find('.modal-data-items').append(loader);
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
                    if (targetappaned) {
                        $('[data-bbbuttonappend="' + targetappaned + '"]').find('.modal-data-items').remove();
                        $('[data-bbbuttonappend="' + targetappaned + '"] .modal-data').append(data.html);
                    }
                    $('#magic-settings').find('.modal-data-items').remove();
                    $('#magic-settings .modal-data').append(data.html);
                }
            }
        });
    });

    $('body').on('click', '.item', function () {
        if (BBbutton) {
            $('body').find('.modal-data-items .btn-primary')
                .removeAttr('name')
                .removeAttr('value');
            $('body').find('.modal-data-items .btn-primary')
                .removeClass('btn-primary')
                .removeClass('active')
                .addClass('btn-info');


            $(this).removeClass('btn-info')
            $(this).addClass('btn-primary').addClass('active');
            $("input[data-name='" + BBbutton.attr("data-key") + "']").val($(this).find('input').attr('data-value')).trigger('change');
            $('#magic-settings span[aria-hidden=true]').click();

            $('[data-bbplace="' + BBbutton.attr('data-key') + '"]').removeClass($('[data-bbplace="' + BBbutton.attr('data-key') + '"]').attr('data-style-old')).attr('data-style-old', $(this).find('input').attr('data-value')).addClass($(this).find('input').attr('data-value'));

            // var input= $(this).find('input')
            // input.attr('name',input.attr('data-key')).val(input.attr('data-value'));
        }
    });

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
        });
    }

});
