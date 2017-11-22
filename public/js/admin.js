$(function () {

    var CMS = {};

    function dd() {
        console.debug(attributes);
    }

    if (typeof(Storage) !== "undefined") {

        if (localStorage.detopmenu) {

            localStorage.detopmenu = localStorage.detopmenu;

        } else {

            localStorage.detopmenu = "";

        }


        if (localStorage.mobilemenu) {

            localStorage.mobilemenu = localStorage.mobilemenu;

        } else {

            localStorage.mobilemenu = "";

        }

    }


    CMS.openDeleteModal = function ($_this) {
        $('#item_modal_delete_button').attr('data-slug', $_this.data('key')).attr('data-url', $_this.data('href'));
        $('#delete_item_label').html('Delete ' + $_this.data('type'));
        $('#delete_item').modal('show');
    };

    $('body').on('click', '.delete-button', function () {
        CMS.openDeleteModal($(this));
    });

    $('body').on('click', '#item_modal_delete_button', function () {
        var item = $(this);
        $.ajax({
            url: item.data('url'),
            type: 'POST',
            dataType: 'JSON',
            headers: {
                'X-CSRF-TOKEN': $("input[name='_token']").val()
            },
            data: {
                slug: item.data('slug')
            }
        }).done(function (data) {
            if (data.success) {
                if (typeof data.url != 'undefined') {
                    window.location.href = data.url;
                }
                location.reload();
            }
        }).fail(function (data) {
            alert('Could not delete item. Please try again.');
        });
    });


    function mobilemenu() {

        $('body').removeClass('ad-active-left-sidebar');

        getwindoww = $(window).width();

        if (getwindoww >= 768) {

            $('body').addClass(localStorage.detopmenu);

        } else {

            $('body').removeClass('ad-active-mleft-sidebar');

        }

    }


    mobilemenu()


    $('.sidebar-toggle-right').click(function () {

        $('body').toggleClass('ad-active-right-sidebar');

    });


    $('.sidebar-toggle-left').click(function () {

        getw = $(window).innerWidth();

        if (getw > 768) {

            if (localStorage.detopmenu == '') {

                $('body').addClass('ad-active-left-sidebar');

                localStorage.detopmenu = "ad-active-left-sidebar";

            }

            else {

                $('body').removeClass('ad-active-left-sidebar');

                localStorage.detopmenu = "";

            }


        } else {


            $('body').toggleClass('ad-active-mleft-sidebar');

        }

    });


    //$(".lefthtmlnav").html(runnavitem(JSON.parse($("#leftnav_json_data").val())));

    //$(".user_nav").html(runnavitem(JSON.parse($("#usernav_json_data").val())));

    //$('[data-role="headernav"]').html(runnavitem(JSON.parse($("#left_header_nav_json_data").val())));

    //$('[data-role="header_right_nav"]').append(runnavitem(JSON.parse($("#right_header_nav_json_data").val())));


    function runnavitem(data, sub, t) {

        m = '';

        if (data) {

            if (!sub) {

                m += '<ul class="nav">\n';

            } else {

                m += '<ul class="dropdown-menu nav-second-level">\n';

            }

            $.each(data, function (ci, cv) {

                var micon = '';

                if (cv['icon']) {

                    micon = '<i class="' + cv['icon'] + '"></i>';

                }

                if (cv['children']) {

                    m += '<li class="dropdown">\n';

                    m += '<a href="/' + cv['link'] + '" class="dropdown-toggle" data-toggle="dropdown">' + micon + ' <span class="htext"> ' + cv['title'] + ' </span><span class="fa arrow fa-caret-down"></span>';

                } else {

                    m += '<li>\n';

                    m += '<a href="/' + cv['link'] + '">' + micon + ' <span class="htext">' + cv['title'] + '</span>';

                    if (cv['label']) {

                        m += '<span class="label label-danger absolute">' + cv['label'] + '</span>';

                    }

                }


                m += '</a>\n';

                m += runnavitem(cv['children'], 'sub', t);

                m += '</li>\n';

            })

            m += '</ul>\n';

        }

        return m;


    }


    if ($('.navbar-fixed-top').length > 0) {

        function fixedheight() {

            var gethight = $('.navbar-fixed-top').height()

            $('#page-wrapper').css({'margin-top': gethight});

        }

        fixedheight()

        $(window).resize(fixedheight)

    }


});


postAjax = function (url, data, success) {

    var dataPeramiter = '';

    token = $('#token').val();

    for (var key in data) {

        if (data.hasOwnProperty(key)) {

            newkey = key + '=' + data[key] + '&';

            dataPeramiter += newkey;

        }

    }

    dataPeramiter += '&_method=POST';


    $.ajax({

        type: "post",

        url: url,

        data: dataPeramiter,

        cache: false,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        success: function (data) {

            if (success) {

                success(data);

            }

            return data;

        }

    });

};

getAjax = function (url, data, success) {

    var dataPeramiter = '';

    for (var key in data) {

        if (data.hasOwnProperty(key)) {

            newkey = key + '=' + data[key] + '&';

            dataPeramiter += newkey;

        }

    }

    dataPeramiter += '_method=GET';

    $.ajax({

        type: "get",

        url: url,

        data: dataPeramiter,

        cache: false,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        success: function (data) {

            if (success) {

                success(data);

            }

            return data;

        }

    });

};

// JavaScript Document

returnOption = function (d) {
    var option = '';
    d = JSON.parse(d)
    $.each(d, function (key, val) {
        option += '<option value="' + key + '">' + val + '</option>';
    })
    return option;
}

$(document).ready(function () {

    $('#chk_unchk_all').click(function () {

        if ($(this).is(':checked')) {

            $('.chk_unchk_all').prop('checked', true);

        } else {

            $('.chk_unchk_all').prop('checked', false);

        }

    })

});


// JavaScript Document

//$("#side-menu > .nav").metisMenu({});


function deleteSelected(url, bkurl) {

    ids = getAllselectedVals();

    token = $('#token').val();

    $.ajax({

        type: "post",

        url: url,

        data: 'ids=' + ids + '&_method=POST',

        cache: false,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        success: function () {

            if (bkurl !== undefined) {

                window.location.href = bkurl;

            } else {

                location.reload();

            }

        }

    });


}


function getAllselectedVals() {

    var chkId = '';

    $('.chk_unchk_all:checked').each(function () {

        chkId += $(this).val() + ",";

    });

    chkId = chkId.slice(0, -1);

    return chkId;

}


function changeStatus(url, id, status) {

    token = $('#token').val();

    $.ajax({

        type: "post",

        url: url,
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        data: 'id=' + id + '&status=' + status + '&_method=POST',

        cache: false,

        success: function (data) {


        }

    });

}


function active(id) {

    token = $('#token').val();

    $.ajax({

        type: "post",

        url: '/admin/modules/status',

        data: 'id=' + id + '&active=yes&_method=POST',
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        cache: false,

        success: function (data) {

            location.reload();

        }

    });

}


function deactive(id) {

    token = $('#token').val();

    $.ajax({

        type: "post",

        url: '/admin/modules/status',
        headers: {
            'X-CSRF-TOKEN': $("input[name='_token']").val()
        },
        data: 'id=' + id + '&active=no&_method=POST',

        cache: false,

        success: function (data) {

            location.reload();

        }

    });

}
