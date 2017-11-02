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

    $('body').on('click', '.BBbuttons', function () {
        var action = $(this).attr('data-action');
        var key = $(this).attr('data-key');
        var place = $(this).attr('data-place');
        var type = $(this).attr('data-type');
        var sub = $(this).attr('data-sub');
        var item = $(this).attr('data-item');
        var module = $(this).attr('data-module');
        var except = $(this).attr('data-except');
        var mt = $(this).data('mt');
        var prefix = $(this).data('name-prefix');
        var group = $(this).attr('data-group');
        var multiple = $(this).attr('data-multiple');
        BBbutton = $(this);
        $('#magic-body').empty();
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
                place: place,
                mt: mt,
                group: group,
                multiple: multiple
            },
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    $('#magic-settings .modal-title').html("Select " + action);
                    $('#magic-body').html(data.html);
                    $('#magic-settings').modal();
                }
            }
        });
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
                    $('#magic-settings').find('.modal-data-items').remove();
                    $('#magic-settings .modal-data').append(data.html);
                }
            }
        });
    });
    $('[data-toggle="popover"]').popover();
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

            $('[data-bbplace="' + BBbutton.attr('data-key') + '"]')
                .removeClass($('[data-bbplace="' + BBbutton.attr('data-key') + '"]')
                    .attr('data-style-old'))
                .attr('data-style-old', $(this).find('input').attr('data-value'))
                .addClass($(this).find('input').attr('data-value'));

            // var input= $(this).find('input')
            // input.attr('name',input.attr('data-key')).val(input.attr('data-value'));
        }
    });

    $('body').on('click', '.item-multiple', function () {

    });

    /////////////////////////

    function reset(valuec) {
        var BBdropdown = $('body').find('.BBdropdown');

        $.each(BBdropdown, function (k, v) {
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
    $('body').on('click', '.BBbuttons', function () {
        var $button = $(this);
        $('body').on('change', 'input[data-name=' + $button.data('key') + ']', function () {
            getBBbuttonData($(this).val(), $button.attr('data-action'), $button.data('key'));
        });
    });


    function getBBbuttonData(variation, data_action, dataKey) {
        var data;
        data = {'variation_id': variation, 'data_action': data_action};
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/admin/modules/bburl/get-bb-button-data',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    var input=$('input[data-id="' + dataKey + '"]');
                    $(input).val(data.value);
                    $(input).attr('data-content',data.content);
                    $('[data-toggle="popover"]').popover();
                }
            }
        });
    }

});
