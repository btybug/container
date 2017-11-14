<div class="nav-side-menu">
    <div class="brand">
        <div class="orange">
            <div class="fg-white row">
                <div class="col-md-4">
                    <img src="{!! BBGetUserAvatar() !!}" width="40" height="40" class="avatar">
                </div>
                <div class="col-md-8 p-r-0">
                    <div class="admin_name">{!! BBGetUserName() !!}</div>
                    <div>
                        <div id="demo-progress" class="progress">
                            <div role="progressbar" class="progress-bar progress-bar-style" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        <div class="menu-list">
            {!!BBAdminMenu()!!}
        </div>
    </div>
</div>

<style>
    @font-face {
        font-family: opensans;
        src: url('fonts/Open-Sans/OpenSans-Regular.ttf');
    }
    .nav-side-menu{
        font-family: opensans;
    }
    .nav-side-menu {
        /*overflow: auto;*/
        /*font-size: 12px;*/
        /*font-weight: 200;*/
        /*background-color: #273135;*/
        /*position: fixed;*/
        /*top: 75px !important;*/
        /*left: 0 !important;*/
        /*height: 100%;*/
        /*color: #e1ffff;*/
        /*min-height: 500px;*/
        font-size: 12px;
        font-weight: 200;
        color: #e1ffff;
        min-height: 100%;
        z-index: 800;
    }
    .nav-side-menu .brand{
        height: auto;
    }
    .nav-side-menu .orange{
        height: 75px;
        background: #FA7252;
        padding-left: 8px;
        padding-right: 32px;
    }

    .nav-side-menu .toggle-btn {
        display: none;
    }
    .nav-side-menu ul,
    .nav-side-menu li {
        list-style: none;
        padding: 0px;
        margin: 0px;
        line-height: 35px;
        cursor: pointer;
    }
    .nav-side-menu ul :not(collapsed) .arrow:before,
    .nav-side-menu li :not(collapsed) .arrow:before {
        content: "\f104";
        display: inline-block;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: middle;
        float: right;
        font-size: 20px;
    }
    .nav-side-menu li.collapsed .arrow:before{
        content: "\f104";
        font-size: 20px;

    }
    .nav-side-menu li :not(collapsed) .arrow:before {
        content: "\f107";
        display: inline-block;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: middle;
        float: right;
        font-size: 20px;
    }
    .nav-side-menu li i {
        margin-right: 7px;
    }
    .nav-side-menu ul .active,
    .nav-side-menu li .active {
        border-left: 5px solid #E76049;
        background-color: #E76049;
    }
    .nav-side-menu ul .sub-menu li.active,
    .nav-side-menu li .sub-menu li.active {
        color: #E76049;
    }
    .nav-side-menu ul .sub-menu li.active a,
    .nav-side-menu li .sub-menu li.active a {
        color: #E76049;
    }
    .nav-side-menu ul .sub-menu li,
    .nav-side-menu li .sub-menu li {
        background-color: #273135;
        border: none;
        line-height: 28px;
        border-bottom: 1px solid #273135;
        margin-left: 0px;
    }
    .nav-side-menu ul .sub-menu li:hover,
    .nav-side-menu li .sub-menu li:hover {
        background-color: #4f5b69;
    }
    .nav-side-menu li {
        padding-left: 0px;
        border-bottom: 1px solid #273135;
        padding-right: 6px;
        -webkit-transition: all 400ms ease;
        -moz-transition: all 400ms ease;
        -o-transition: all 400ms ease;
        -ms-transition: all 400ms ease;
        transition: all 400ms ease;
    }
    .nav-side-menu  li[aria-expanded="true"]{
        padding-right: 1px!important;
    }
    .nav-side-menu li a {
        text-decoration: none;
        color: #e1ffff;
    }
    .nav-side-menu li a i {
        padding-left: 10px;
        width: 20px;
        padding-right: 20px;
    }
    .nav-side-menu li:hover {
        border-left: 5px solid #E76049;
        background-color: #4f5b69;
        -webkit-transition: all 400ms ease;
        -moz-transition: all 400ms ease;
        -o-transition: all 400ms ease;
        -ms-transition: all 400ms ease;
        transition: all 400ms ease;
    }
    .nav-side-menu .sub-menu li:hover {
        margin-left: -1px;
    }
    .fg-white {
        color: #fff;
    }
    @media (max-width: 767px) {
        .nav-side-menu {
            position: relative;
            width: 100%;
            margin-bottom: 10px;
        }
        .nav-side-menu .toggle-btn {
            display: block;
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 10 !important;
            padding: 3px;
            background-color: #ffffff;
            color: #000;
            width: 40px;
            text-align: center;
        }
        .brand {
            text-align: left !important;
            font-size: 22px;
            padding-left: 20px;
            line-height: 50px !important;
        }
    }
    @media (min-width: 767px) {
        .nav-side-menu .menu-list .menu-content {
            display: block;
        }
    }
    .admin-name{
        background: #FA7252;
        color: white!important;
        padding: 26px;
        font-size: 22px;

    }
    .admin-name:hover,  .admin-name:focus,  .admin-name:active{
        opacity: 0.9;
        background: #FA7252!important;
    }

    @media (min-width: 765px) {
        .admin-name{
            height: 75px;
        }
    }
    .avatar{
        top: 17px;
        position: relative;
        height: 42px;
        width: 42px;
        border-radius: 50%;
    }
    #demo-progress {
        margin: 0;
        top: 30px;
        height: 4px;
        width: 115px;
        border-radius: 0;
        position: relative;
        background: #DE5939;
    }
    .progress {
        overflow: hidden;
        height: 25px;
        margin-bottom: 25px;
        background-color: #f5f5f5;
        border-radius: 4px;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }
    .progress-bar {
        float: left;
        width: 0%;
        height: 100%;
        font-size: 12px;
        line-height: 25px;
        color: #fff;
        text-align: center;
        background-color: #428bca;
        box-shadow: inset 0 -1px 0 rgba(0,0,0,0.15);
        -webkit-transition: width 0.6s ease;
        transition: width 0.6s ease;
    }
    #demo-icon {
        top: 3px;
        float: right;
        font-size: 18px;
        position: relative;
        color: #DE5939;
    }
    .icon-fontello-lock-5:before {
        content: '\ED23';
    }
    .icon-fontello-lock-5:before {
        content: '\ED23';
    }
    [class^="icon-fontello-"]:before, [class*=" icon-fontello-"]:before {
        font-style: normal;
        font-weight: normal;
        speak: none;
        line-height: 1;
        display: inline-block;
        text-decoration: inherit;
        text-align: center;
        font-variant: normal;
        text-transform: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .menu-list a{
        height: 45px;
        border: none;
        outline: none;
        color: #89949B;
        display: block;
        font-size: 15px;
        line-height: 14px;
        text-decoration: none;
        padding: 15px 0px 15px 4px;
    }
    .menu-list .sub-menu a{
        padding: 15px 0px 15px 25px;
    }
    .nav-side-menu  .menu-list li[aria-expanded="true"] > a{
        padding: 15px 0px 15px 0!important;
    }
    @media (max-width: 991px) {
        .nav-side-menu .orange {
            height: 116px;
        }
    }
    @media (max-width: 767px){
        .nav-side-menu .toggle-btn {
            display: block;
            cursor: pointer;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 10 !important;
            padding: 3px;
            background-color: transparent;
            color: #fff;
            width: 40px;
            text-align: center;
        }
        .brand{
            padding-left: 0;
        }
    }
    .sub-menu{
        margin-left: 40px!important;
        border-left: 2px solid rgba(59,70,72,0.5);
    }
    .sub-menu>li{
        position: relative;
    }
    .sub-menu>li:before {
        left: 0;
        top: 22px;
        width: 15px;
        content: ' ';
        position: absolute;
        display: inline-block;
        border: 1px solid rgba(59,70,72,0.5);
    }
    .sub-menu>li a{
        font-size: 14px;
    }
    .sub-menu>li:hover:before{
        border:none;
    }
    .nav-side-menu{
        font-family: opensans;
    }
    .admin_name{
        top: 24px;
        font-size: 13px;
        line-height: 1;
        position: relative;
        margin-bottom: 6px;
    }
    .progress-bar-style{
        width: 30%;
        background-color: rgb(255, 255, 255);
    }
    .nav-side-menu::-webkit-scrollbar {
        width: 6px;
    }
    .nav-side-menu::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background: #6d7173;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    }
</style>
