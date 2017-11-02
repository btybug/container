<nav class="navbar navbar-default navbar-static-top header-pir">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand navBrand" href="#">
                <img src="{{url(BBgetSiteLogo())}}" alt="" class="logoImg" >
                <span class="sitename">{{BBgetSiteName()}}</span>
            </a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" >
            <div style="display: inline-block;">
                {!!isset($settings['area1'])? BBRenderUnits($settings['area1']):"area 1" !!}
            </div>
            <div style="display: inline-block;">
                {!!isset($settings['area2'])? BBRenderUnits($settings['area2']):"area 2" !!}
            </div>
            <ul class="nav navbar-nav navbar-right">
                @if(isset($settings['area3']))
                    {!! BBRenderUnits($settings['area3']) !!}
                @else
                    area 3
                    <li>
                        <a href="{!! url('logout') !!}" class="logout-btn" ><i class="fa fa-power-off" aria-hidden="true"></i></a>
                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>

<style>
    .header-pir{
        background: #00d18d;
        border: none!important;
    }
    .logout-btn{
        background: #FA7252;
        color: white!important;
        padding: 26px;
        font-size: 22px;

    }
    .logout-btn{
        width: 75px;
        text-align: center;
        font-size: 32px;
        padding: 24px!important;
    }
    .logout-btn:hover, .logout-btn:focus,  .logout-btn:active, .logout-btn:visited{
        opacity: 0.9;
        background: #FA7252!important;
    }

    @media (min-width: 765px) {
        .logout-btn,.header-dark{
            height: 75px;
        }

    }
    @media (max-width: 765px){
        .navbar-header{
            padding: 6px;
            height: 83px;
        }
    }

    .header-dark a.navbar-brand{
        color: #ffffff!important;
    }
    .navBrand {
        width: 220px;
        height: 50px;
        background-size: 50px;
        position: relative;
    }
    img.logoImg{
        width: 70px;
        height: 50px;
        background-size: 50px;
        float: left;
        margin-right: 19px;
    }
    .sitename{
        font-size: 23px;
        position: absolute;
        top: 24px;
    }

    @font-face {
        font-family: opensans;
        src: url(/fonts/Open-Sans/OpenSans-Regular.ttf);
    }
    .navBrand{
        font-family: opensans;
    }
</style>

