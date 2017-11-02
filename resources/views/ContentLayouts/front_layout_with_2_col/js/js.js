/**
 * Created by Comp1 on 1/13/2017.
 */

$(function () {

    checkContentType();

    $('[name=content_type]').change(function (){
        checkContentType();
    });

    function checkContentType(){
        $('.content-types > div').addClass("hidden");
        $('.'+$('[name=content_type]').val()).removeClass('hidden');
        console.log($('[name=content_type]').val());
    }

});