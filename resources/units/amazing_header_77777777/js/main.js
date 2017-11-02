$(function () {
    var sections=$('section');
// <li><a class="active" href="#services">Services</a></li>
    var li=$('<li/>',{
        class:'menu-item'
    });
    var a=$('<a/>');
    $.each(sections,function (k,v) {
        var li_clone=li.clone();
        var a_clone=a.clone();
        a_clone.attr('href','#'+$(v).attr('id')).text($(v).attr('id'));
        li_clone.append(a_clone);
        $('#navigation-items').append(li_clone);

    });
    $('body').on('click','.menu-item',function () {
        $('body').find('.menu-item a').removeClass('active')
        $(this).find('a').addClass('active');
    });
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
       if(scroll>=79){
           $('.sahak-header').addClass('fixed');
           $('.site-name').removeClass('hide');
       }else {
           $('.sahak-header').removeClass('fixed');
           $('.site-name').addClass('hide');

       };
       ;
    });
})