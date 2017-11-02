
/*
 * Copyright (c) 2017. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

    $("#login-form-link").click(function (e) {
        e.stopPropagation();
        $(this).addClass('active');
        $("#register-form-link").removeClass('active');
        $("#register-form").attr('style','display: none;');
        $("#login-form").attr('style','display: block;');
    });

    $("#register-form-link").click(function (e) {
        e.stopPropagation();
        $(this).addClass('active');
        $("#login-form-link").removeClass('active');
        $("#login-form").attr('style','display: none;');
        $("#register-form").attr('style','display: block;');
    });
