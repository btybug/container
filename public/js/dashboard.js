$(function () {
    $('.buttonCustomise').click(function () {
        var Dashboardcon = $(this).closest('.dashboardView')
        if (Dashboardcon.hasClass('activeWidget')) {
            Dashboardcon.removeClass('activeWidget');
            $(this).removeClass('active')

        } else {
            Dashboardcon.addClass('activeWidget');
            $(this).addClass('active')
        }
    })

    var reveved = '';
    var cuntainerId = '';
    var shiftdata = '';

    $("[data-dashboard='leftdashbord'], [data-dashboard='rightdashbord']").sortable({
        connectWith: "[data-dashboard='leftdashbord'], [data-dashboard='rightdashbord'], [data-dashboard='Widget']",
        refreshPositions: true,
        start: function (event, ui) {
            reveved = '';
            cuntainerId = $(ui.item).closest('[data-dashboard]').data('id');
            shiftdata = $(ui.item).closest('[data-dashboard]').data('id');
        },
        cancel: ".addWidgethere, input, select, .form-control",
        receive: function (event, ui) {
            if (shiftdata != '') {
                var wid = $(ui.item).data('id');
                var to = $(ui.item).closest('[data-dashboard]').data('id');
                shiftWidget(shiftdata, to, wid)
            }

            if (reveved != '') {
                $(ui.item).find('.panel-collapse').append('<div class="loading"></div>');
                var wid = $(ui.item).data('id');
                var cid = $(ui.item).closest('[data-dashboard]').data('id');
                savedpanel(wid, cid, 'add');
                reveved = '';
                cuntainerId = '';
                setTimeout(function () {
                    $('.loading').remove();
                }, 500);
            }
            adddragdata()
        },
        change: function (event, ui) {
            adddragdata();


        },
        update: function (event, ui) {
            swapeWidget(this);
        }

    }).disableSelection();
    ;
    $("[data-dashboard='Widget']").sortable({
        connectWith: "[data-dashboard='leftdashbord'], [data-dashboard='rightdashbord']",
        refreshPositions: true,
        start: function (event, ui) {
            reveved = 'drag';
        },
        cancel: ".addWidgethere, .pageLayout, input, select, .form-control",
        change: function () {
            adddragdata()
        },
        receive: function (event, ui) {
            var wid = $(ui.item).data('id');
            savedpanel(wid, cuntainerId, 'delete');
            adddragdata()
            cuntainerId = '';
        }
    }).disableSelection();
    ;

    var adddragdata = function () {

        $('.widgetsection').each(function (index, element) {
            var length = $(this).children('.panel').length
            if (length == "0") {
                $(this).append('<div class="addWidgethere">Add Your Widget Here</div>')

            } else {
                $(this).find('.addWidgethere').remove()
            }
        });
    }


    $('.panel-button [data-toggle="collapse"]').click(function () {
        var panelcollapse = $(this).closest('.panel').find('.panel-collapse');
        if (panelcollapse.hasClass('in')) {
            panelcollapse.collapse('hide')
            $(this).removeClass('active')
        } else {
            panelcollapse.collapse('show')
            $(this).addClass('active')
        }
    });

    $('body').on('click', '[data-action="delete"]', function () {
        var wid = $(this).closest('.panel').data('id');
        var cid = $(this).parents('[data-dashboard]').data('id');
        savedpanel(wid, cid, 'delete');
        $(this).closest('.panel').appendTo("[data-dashboard='Widget']");
        adddragdata()
    });

    $('body').on('click', '[data-action="refresh"]', function () {
        var panelcollapse = $(this).closest('.panel').find('.panel-collapse');
        panelcollapse.append('<div class="loading"></div>')
        setTimeout(function () {
            $('.loading').remove();
        }, 500);

    })
    $('[data-pagelayout]').change(function () {
        var value = $('[data-pagelayout]:checked').val()
        getAjax('/admin/dashboard/changlayout', {'layout': value});
        pagelayout();
    })
    pagelayout()

    function pagelayout() {
        var value = $('[data-pagelayout]:checked').val()
        if (value == '1') {
            $('[data-dashboard="leftdashbord"]').removeClass('col-xs-9').addClass('col-xs-12');
            $('[data-dashboard="rightdashbord"]').removeClass('col-xs-3').addClass('col-xs-12');
        } else {
            $('[data-dashboard="leftdashbord"]').removeClass('col-xs-12').addClass('col-xs-9');
            $('[data-dashboard="rightdashbord"]').removeClass('col-xs-12').addClass('col-xs-3');
        }
    }

    function swapeWidget(itemls) {

        var ContainerId = $(itemls).data('id');
        var Widgetitem = $(itemls).find('.panel');
        var itemlsid = [];
        $.each(Widgetitem, function (i, v) {
            itemlsid.push($(this).data('id'))
        })

        //alert(ContainerId +"   "+ itemlsid)
        getAjax('/admin/dashboard/swapewidget', {'ContainerId': ContainerId, 'itemlsid': itemlsid});


    }

    function shiftWidget(from, to, id) {

        getAjax('/admin/dashboard/shiftwidget', {'from': from, 'to': to, 'id': id});
        shiftdata = ''

    }

    function savedpanel(Widgetid, containerId, action) {

        getAjax('/admin/dashboard/updatesetting', {'Widgetid': Widgetid, 'containerId': containerId, 'action': action});

    }

});