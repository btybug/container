var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}
$(document).resize(function () {

    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    var height = $('.published_1').height();
    var designPanelHeight = $('.design_panel').height();
    var width = $('.vertical-text').width();
    var docWidth = $( document ).width();
    // if (docWidth > 1200){
    //     $('.left_part_publ').css('height', height);
    // }

    $('.select_option').change(function(){

        $('.vertical-text ').removeClass('published draft').addClass(
            $(this).find('option:selected').text().toLowerCase()
        );
        var text = $(this).find('option:selected').val();
        $('.icon_pbl').removeClass('fa-check-circle').addClass('fa-trash');
        var icon;
        if(text == 'Published'){
            icon = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        }else{
            icon = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        }
        $('.vertical-text ').html(text +' '+icon);
    })
        .change();

    $('.vertical-text').css('width', height);
//        $('.title_h').css('height', designPanelHeight);
    $(document).on('click', '.panel-heading span.clickable', function(e){
        var $this = $(this);
        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });


    $("#test2").change(function() {
        if(this.checked) {
            $('#header').show();
        }
        else {
            $('#header').hide();
        }
    });
    $("#test1").change(function() {
        if(this.checked) {
            $('#footer').removeClass('hidden');
            $('#footer').show();
        }
        else {
            $('#footer').hide();
        }
    });


    $(".aslist").click(function(){
        $(".articles_as_row").removeClass('hidden');
        $(".articles").addClass('hidden');
        $(".aslist").addClass('active');
        $(".large").removeClass('active');
    });

    $(".large").click(function(){
        $(".articles").removeClass('hidden');
        $(".articles_as_row").addClass('hidden');
        $(".large").addClass('active');
        $(".aslist").removeClass('active');
    });
    var lastHeight = $(".slide-menu").height();
    // console.log(lastHeight);
    var myheight = 0;
    $('.lab').click(function(){
        if($('input[type="checkbox"]').prop("checked") == true){
            lastHeight == 0;
        }
    });
});
$(document).ready(function () {
    $( ".make_def" ).on( "click", function() {
        var textMake = "Make Default";
        var textDefault = "Default";
        var icon = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        $(this).html(textDefault +' '+icon);
        $(this).toggleClass('default make_default');
        if ($(this).hasClass("default")) {
            $(this).html(textDefault +' '+icon);
        }
        else {
            $(this).html(textMake +' '+icon);
        }
    });



    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    var height = $('.published_1').height();
    var designPanelHeight = $('.design_panel').height();
    var width = $('.vertical-text').width();
    var docWidth = $( document ).width();
    // if (docWidth > 1200){
    //     $('.left_part_publ').css('height', height);
    // }


    // $("body").on('click','.collactions', function () {
    //     var key = $(this).attr('data-key');
    //     $('.collactions'+key).css( "border-color", color );
    //     $('.collactions'+key).show();
    // });

    // var key = $(".collactions").attr('data-key');
    // $('.collactions'+key).css( "border-color", color );



    $('.select_option').change(function(){

        $('.vertical-text ').removeClass('published draft').addClass(
            $(this).find('option:selected').text().toLowerCase()
        );
        var text = $(this).find('option:selected').val();
        $('.icon_pbl').removeClass('fa-check-circle').addClass('fa-trash');
        var icon;
        if(text == 'Published'){
            icon = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
        }else{
            icon = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
        }
        $('.vertical-text ').html(text +' '+icon);
    })
        .change();




    $('.vertical-text').css('width', height);
//        $('.title_h').css('height', designPanelHeight);
    $(document).on('click', '.panel-heading span.clickable', function(e){
        var $this = $(this);
        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });

    $("#test2").change(function() {
        if(this.checked) {
           $('#header').show();
        }
        else {
            $('#header').hide();
        }
    });
    $("#test1").change(function() {
        if(this.checked) {
            $('#footer').removeClass('hidden');
            $('#footer').show();
        }
        else {
            $('#footer').hide();
        }
    });

    $(".aslist").click(function(){
        $(".articles_as_row").removeClass('hidden');
        $(".articles").addClass('hidden');
        $(".aslist").addClass('active');
        $(".large").removeClass('active');
    });

    $(".large").click(function(){
        $(".articles").removeClass('hidden');
        $(".articles_as_row").addClass('hidden');
        $(".large").addClass('active');
        $(".aslist").removeClass('active');
    });
    var lastHeight = $(".slide-menu").height();
    // console.log(lastHeight);
    var myheight = 0;
    $('.lab').click(function(){
        if($('input[type="checkbox"]').prop("checked") == true){
            lastHeight == 0;
        }
    });
});