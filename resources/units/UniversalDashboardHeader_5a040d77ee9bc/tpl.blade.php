{!! BBstyle($_this->path.DS.'css/header.css') !!}

<header>
    <div class="brand pull-left">
        <a href="javascript:" class="bb-toggle-side-menu"><i class="fa fa-bars"></i></a>
        <img src="{{url(BBgetSiteLogo())}}" alt=""/>
        <small class="text-muted">{{BBgetSiteName()}}</small>
    </div>
    <div class="pull-right">
        @if(isset($settings['right_unit']))
            {!! BBRenderUnits($settings['right_unit']) !!}
        @endif
    </div>

    <div class="bb-side-menu not-visible">
        <div class="row">
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-smile-o"></i> <span>Uploads</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-folder-open"></i> <span>Developers</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-users"></i> <span>Users</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-film"></i> <span>Media</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-cog"></i> <span>Manage</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-hand-lizard-o"></i> <span>Frameworks</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-thumbs-o-up"></i> <span>Studios</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-gavel"></i> <span>AutoValidator</span></a>
            </div>
            <div class="col-xs-4">
                <a href="" class="bb-side-menu-item"><i class="fa fa-anchor"></i> <span>Blog</span></a>
            </div>
        </div>
    </div>
</header>

<script>
    jQuery(function ($) {
        var sideMenu = $('.bb-side-menu');
        var menuWidth = $('.bb-side-menu').outerWidth();

        sideMenu.css('left', -menuWidth).removeClass("not-visible");

        $('.bb-toggle-side-menu').clickToggle(function () {
            sideMenu.animate({
                left: 0
            });
        }, function () {
            sideMenu.animate({
                left: -menuWidth
            });
        });
    });

    (function ($) {
        $.fn.clickToggle = function (func1, func2) {
            var funcs = [func1, func2];
            this.data('toggleclicked', 0);
            this.click(function () {
                var data = $(this).data();
                var tc = data.toggleclicked;
                $.proxy(funcs[tc], this)();
                data.toggleclicked = (tc + 1) % 2;
            });
            return this;
        };
    }(jQuery));
</script>