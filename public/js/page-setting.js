$(function () {
    $("body").on("click", '.full-page-view', function () {
        var url = '/admin/manage/frontend/pages/live-settings';
        data = $('form').serialize() + '&id=' + $('#page').val();
        if($(this).data("live") == "live_edit"){
            data = data + '&live_edit=live_edit'
        }
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            cache: false,
            success: function (data) {
                if (data.success) {
                    var iframe = $('<iframe/>', {
                        src: '/admin/manage/frontend/pages/live/' + $('#page').val()
                    });
                    $('.iframe-area').html(iframe);
                    $(iframe).ready(function () {
                        $("#full-page-view").modal();
                    });


                }
            }

        });
    });

    $("body").on("click", '.area-settings', function () {
        $("#area-settings").modal();
    })

    tinymce.init({
        selector: '.main_content_editor', // change this value according to your HTML
        height: 200,
        theme: 'modern',
        plugins: [
            'advlist anchor autolink autoresize autosave bbcode charmap code codesample colorpicker contextmenu directionality emoticons fullpage fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount shortcodes',
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help shortcodes',
        image_advtab: true
    });

    $('body').on('change', '.content_type', function () {
        var value = $(this).val();
        var data_area = $(this).data('area');
        if (value == 'editor') {
            $('.' + data_area + '_editor').removeClass('hide').addClass('show');
            $('.' + data_area + '_template').removeClass('show').addClass('hide');
        } else {
            $('.' + data_area + '_template').removeClass('hide').addClass('show');
            $('.' + data_area + '_editor').removeClass('show').addClass('hide');
        }

    });

    $('body').on('click', '.live-preview-btn', function () {
        if (!$(this).next().hasClass('redirect-type')) {
            var typeInput = $('<input/>', {
                type: 'hidden',
                name: 'redirect_type',
                value: 'view',
                class: 'redirect-type'
            });
            $(this).after(typeInput);
            $('#page_settings_form').submit();
        }

    });

    var sortabledata = function () {
        $(' [data-bbsortable="source"]').sortable({
            connectWith: '[data-bbsortable="target"]',
            forcePlaceholderSize: true,
            forceHelperSize: true,
            tolerance: "pointer",
            start: function (event, ui) {
                //getlnt = $('.target  > [data-id]').length;
                //$(ui.item).width($('.source li').width());
            },
            receive: function (event, ui) {
                if ($(ui.item).data('panelnotallow')) {
                    $(ui.sender).sortable('cancel');
                }
            }

        }).disableSelection();

        $(' [data-bbsortable="target"]').sortable({
            connectWith: '[data-bbsortable="source"]',
            forcePlaceholderSize: true,
            forceHelperSize: true,
            tolerance: "pointer",
            start: function (event, ui) {
                //getlnt = $('.target  > [data-id]').length;
                //$(ui.item).width($('.source li').width());
            }
        }).disableSelection();
    };
    sortabledata();

    function layoutData(variation, data_action, backend) {
        var data;
        if (!variation) {
            variation = $('input[data-name=page_layout]').val();
            data_action = 'page_sections';
        }
        data = {'variation_id': variation, 'data_action': data_action};
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/admin/modules/bburl/get-page-layout-config-toarray',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    $("#placeholders").html(data.data);

                    // $('.layout-data p[data-key=title] code').text(data.data.title);
                    // $('.page-layout-title').val(data.data.title);
                    // $('.layout-data p[data-key=author] code').text(data.data.author);
                    // $('.BBbuttons[data-action="page_sections"]').text('Change')
                    // var div = $('<div/>');
                    // $('#placeholders').empty();
                    // $.each(data.data.placeholders, function (k, v) {
                    //     var place = div.clone();
                    //     if (backend) {
                    //         place.append(BBButtonerBackend(k, v));
                    //     } else {
                    //         place.append(BBButtoner(k, v));
                    //     }
                    //     $('#placeholders').append(place);
                    // });
                    // if (data.data.sidebars) {
                    //     $('.layout-data p[data-key=sidebars] code').text(data.data.sidebars.length());
                    // } else {
                    //     $('.layout-data p[data-key=sidebars] code').text('Not Provided!!!');
                    // }
                    // $('.layout-data p[data-key=id] code').text(variation);
                }
            }
        });
    }

    function sectionData(variation, data_action, dataKey) {
        var data;
        console.log(dataKey);
        data = {'variation_id': variation, 'data_action': data_action};
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/admin/modules/bburl/get-page-section-config-toarray',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                if (!data.error) {
                    $('input[data-id="' + dataKey + '"]').val(data.data.title);
                    $('.BBbuttons[data-key="' + dataKey + '"]').text('Change')
                }
            }
        });
    }


    $('body').on('change', 'input[name=page_layout]', function () {
        var button = $(this).prev();
        layoutData($(this).val(), button.attr('data-action'), false);
    });

    $('body').on('change', 'input[name=backend_page_section]', function () {
        var button = $('button[data-key='+$(this).attr('data-name')+']');
        layoutData($(this).val(), button.attr('data-action'), true);
    });
    //
    // $('body').on('click', '.change-layout', function () {
    //     var $button = $(this);
    //     $('body').on('change', 'input[data-name=' + $button.data('key') + ']', function () {
    //         sectionData($(this).val(), $button.attr('data-action'), $button.data('key'));
    //     });
    // });
    // $('body').on('click', '.BBbuttons', function () {
    //     var $button = $(this);
    //     $('body').on('change', 'input[data-name=' + $button.data('key') + ']', function () {
    //         sectionData($(this).val(), $button.attr('data-action'), $button.data('key'));
    //     });
    // });

    function BBButtoner(key, placeholders) {
        var button = $('<button/>', {
            type: 'button',
            'data-key': key,
            'class': "btn btn-default change-layout BBbuttons change-placeholder",
            'data-action': placeholders.type,
            'data-type': placeholders.tag,
            'text': 'Select',
            'data-name-prefix': 'placeholders'
        });
        var buttonDiv = $('<div/>', {
            class: "col-sm-4 p-l-0"
        }).append(button);

        var lablediv = $('<div/>', {
            class: "col-sm-4 p-l-0"
        }).append(placeholders.title);

        var hidden = $('<input/>', {
            type: 'hidden',
            class: "bb-button-realted-hidden-input",
            'data-name': key,
            name: 'placeholders[' + key + ']',
        });

        var titleInput = $('<input/>', {
            "data-key": "title",
            value: "Nothing to select",
            "readonly": "readonly",
            class: "page-layout-title form-control",
            "data-id": key
        });
        var titleInputDiv = $('<div/>', {
            'class': 'col-sm-5 p-l-0 p-r-10'
        }).append(titleInput);

        var checkBoxDefault = $('<input/>', {
            type: 'hidden',
            value: 0,
            name: 'placeholders[' + key + '][enable]'
        });


        var div = $('<div/>', {
            'class': 'col-md-12 p-b-10'
        }).append(checkBoxDefault, lablediv, titleInputDiv, button, hidden);

        return div;
    }

    function BBButtonerBackend(key, placeholders) {
        var button = $('<button/>', {
            type: 'button',
            'data-key': key,
            class: "btn btn-default change-layout BBbuttons change-placeholder",
            'data-action': placeholders.self_type,
            'data-type': placeholders['data-type'],
            'text': 'Select',
            'data-name-prefix': 'placeholders'
        });
        var buttonDiv = $('<div/>', {
            class: "col-sm-4 p-l-0"
        }).append(button);


        var checkBox = $('<input/>', {
            type: 'checkbox',
            value: 1,
            name: 'placeholders[' + key + '][enable]'
        });

        var lablediv = $('<div/>', {
            class: "col-sm-4 p-l-0"
        }).append(checkBox);

        lablediv.append(placeholders.title);

        var hidden = $('<input/>', {
            type: 'hidden',
            class: "bb-button-realted-hidden-input",
            'data-name': key,
            name: 'placeholders[' + key + '][value]',
        });

        var titleInput = $('<input/>', {
            "data-key": "title",
            value: "Nothing to select",
            "readonly": "readonly",
            class: "page-layout-title form-control",
            "data-id": key
        });
        var titleInputDiv = $('<div/>', {
            'class': 'col-sm-5 p-l-0 p-r-10'
        }).append(titleInput);

        var checkBoxDefault = $('<input/>', {
            type: 'hidden',
            value: 0,
            name: 'placeholders[' + key + '][enable]'
        });


        var div = $('<div/>', {
            'class': 'col-md-12 p-b-10'
        }).append(checkBoxDefault, lablediv, titleInputDiv, button, hidden);

        return div;
    }

    $('input[name=content_type]').on('change', function () {
        if ($(this).val() == 'template') {
            $('#main_content_editor').addClass('hide');
            $('#main_content_template').removeClass('hide');
            $('.page-template').show();
        }
        if ($(this).val() == 'editor') {
            $('#main_content_editor').removeClass('hide');
            $('#main_content_template').addClass('hide');
            $('.page-template').hide();

        }
    });

    function getTemplateHtml(id) {
        $.ajax({
            type: "post",
            datatype: "json",
            url: '/admin/modules/bburl/render-unit',
            data: {"id": id},
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            success: function (data) {
                $('#main_content_template').html(data.html);
            }
        });
    }

    $('input[name=content_type]').on('change', function () {
        if ($(this).val() == 'editor') {
            $('.editor_body').removeClass('hide')
            $('.template_body').addClass('hide')
        }
        if ($(this).val() == 'template') {
            $('.template_body').removeClass('hide')
            $('.editor_body').addClass('hide')
        }
    })
});