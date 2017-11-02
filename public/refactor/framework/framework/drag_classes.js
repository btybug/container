$(function(){
    var windowHeight =  $( window ).height();
    var modalBodyHeight = windowHeight - 323;
    $('#mymodal-fullscreen .modal-body').css({
        'height':modalBodyHeight,
        'overflow-y': 'auto'
    });
    $('body').on('click', '[class-item]', function() {
        if(!$(this).parent().find('li').hasClass('selected')) {
            $(this).addClass('selected');
            var dataclassname = $(this).attr('data-classname');
            var classname =  $(this).attr('data-attr-name');
            var html = {
                li: $("<li/>", {
                    "class": "col-xs-2 col-sm-2 col-md-2 col-lg-2 m-r-15 m-b-15",
                }),
                div: $("<div/>", {

                }),
                span: $("<span/>", {

                }),
                i: $("<i/>", {
                    "class": "fa fa-close pull-right",
                    "data-id":""
                })
            };
            var li =  html.li.clone();
            var div =  html.div.clone().attr('data-classname',dataclassname );
            var span =  html.span.clone().text(classname);
            var i =  html.i.clone().attr('data-class-name',classname );
            div.append(span, i);
            li.append(div);

            $('#selected_classes').append(li);
            $('.selected').prop('disabled', true);
            var basket = jQuery.parseJSON($('#selected_collection_basket').val());
            basket[classname] = classname;
            var newBasket = JSON.stringify(basket);
            $('#selected_collection_basket').val(newBasket);
        }
    });

    $('body').on('click', '[data-id]', function() {
        var item_id = $(this).data('class-name');
        $(this).closest('li').remove();
        $('li[data-attr-name = "' +item_id + '"]').removeClass('selected');
        $('li[data-attr-name = "' +item_id + '"] .main_div_1').removeClass('active');
        var basket = jQuery.parseJSON($('#selected_collection_basket').val());
        delete basket[item_id];
        var newBasket = JSON.stringify(basket);
        $('#selected_collection_basket').val(newBasket);
    });
});

$.fn.checkSelectedClasses = function() {
    var basket = jQuery.parseJSON($('#selected_collection_basket').val());
    $.each(basket, function( index, value ) {
        $('ul.classes_list li[data-attr-name="'+value+'"]').addClass('selected');
    });
    return this;
};


