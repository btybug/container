<div class="dropdown user user-menu">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <img src="{!! BBGetUserAvatar() !!}"
             class="img-circle img-responsive pull-left"
             alt="{!! BBGetUserName() !!}">
        <div class="drop">
            <div>
                User
                <span>
                                        <i class="caret"></i>
                                    </span>
            </div>
        </div>
    </a>
    <ul class="dropdown-menu">
        <!-- User image -->
        <li class="user-header bg-light-blue">
            <img src="{!! BBGetUserAvatar() !!}"
                 class="img-responsive img-circle" alt="{!! BBGetUserName() !!}">
            <p class="topprofiletext">User</p>
        </li>
        <!-- Menu Body -->
        <li>
            <a href="#">
                <i class="fa fa-user" aria-hidden="true"></i>
                My Profile
            </a>
        </li>
        <li role="presentation"></li>
        <li>
            <a href="#">
                <i class="fa fa-sign-out"></i>
                Account Settings
            </a>
        </li>
        <!-- Menu Footer-->
        <li class="user-footer">
            <div class="pull-left">
                <a href="">
                    <i class="livicon" data-name="lock" data-s="18"></i>
                    Lock
                </a>
            </div>
            <div class="pull-right">
                <a href="{!! url('/logout') !!}">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </a>
            </div>
        </li>
    </ul>
</div>
<style>
    .drop {
        color: #fff;
        padding: 15px 4px 5px 45px;
    }

    .drop .caret {
        margin-top: -10px;
    }

    .drop span i {
        margin-top: 0 !important;
    }

    .drop div {
        margin-top: -10px;
    }
    .user-menu a{
        text-decoration: none;
    }

    .dropdown-menu:after {
        -moz-border-bottom-colors: none;
        -moz-border-left-colors: none;
        -moz-border-right-colors: none;
        -moz-border-top-colors: none;
        border-color: transparent;
    }

    .user-menu > .dropdown-menu:after {
        -moz-border-bottom-colors: none;
        -moz-border-left-colors: none;
        -moz-border-right-colors: none;
        -moz-border-top-colors: none;
        border-color: transparent;
    }

    .user-menu > .dropdown-menu:after {
        bottom: 100%;
        right: 10px;
        border: solid rgba(255, 255, 255, 0);
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-bottom-color: #ffffff;
        border-width: 10px;
        margin-left: -10px;
    }

    .user-menu > .dropdown-menu > li.user-header {
        height: 140px;
        padding: 6% 6% 6% 22%;
        background: #3c8dbc;
        text-align: center;
    }

    .topprofiletext {
        margin-left: -18px !important;
    }

    .user-menu > .dropdown-menu > li.user-header > img {
        z-index: 5;
        height: 90px;
        width: 90px;
        border: 8px solid;
        border-color: rgba(255, 255, 255, 0.2);
    }

    .user-menu > .dropdown-menu > li.user-header > p {
        z-index: 5;
        color: #f9f9f9;
        color: rgba(255, 255, 255, 0.8);
        font-size: 17px;
        margin-top: 10px;
    }

    .user-menu > .dropdown-menu > li.user-header > p > small {
        display: block;
        font-size: 12px;
    }

    .user-menu > .dropdown-menu > li.user-body {
        padding: 15px;
        border-bottom: 1px solid #f4f4f4;
        border-top: 1px solid #dddddd;
    }

    .user-menu > .dropdown-menu > li.user-body:before, .navbar-nav > .user-menu > .dropdown-menu > li.user-body:after {
        display: table;
        content: " ";
    }

    .user-menu > .dropdown-menu > li.user-body:after {
        clear: both;
    }

    .dropdown-menu > li.user-body > div > a {
        color: #0073b7;
    }

    .user-menu > .dropdown-menu > li.user-footer {
        padding: 10px;
    }

    .user-menu > .dropdown-menu > li.user-footer:before, .navbar-nav > .user-menu > .dropdown-menu > li.user-footer:after {
        display: table;
        content: " ";
    }

    .user-menu > .dropdown-menu > li.user-footer:after {
        clear: both;
    }

    .user-menu > .dropdown-menu > li.user-footer .btn-default {
        color: #666666;
    }

    /* Add fade animation to dropdown menus */
    .open > .dropdown-menu {
        animation-name: fadeAnimation;
        animation-duration: .7s;
        animation-iteration-count: 1;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        -webkit-animation-name: fadeAnimation;
        -webkit-animation-duration: .7s;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-timing-function: ease;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-name: fadeAnimation;
        -moz-animation-duration: .7s;
        -moz-animation-iteration-count: 1;
        -moz-animation-timing-function: ease;
        -moz-animation-fill-mode: forwards;
        left: -58px;
    }

    @keyframes fadeAnimation {
        from {
            opacity: 0;
            top: 120%;
        }
        to {
            opacity: 1;
            top: 100%;
        }
    }

    @-webkit-keyframes fadeAnimation {
        from {
            opacity: 0;
            top: 120%;
        }
        to {
            opacity: 1;
            top: 100%;
        }
    }

    .bg-light-blue>img {
        width: 90px;
        height: 90px;
    }
    .img-circle {
        width: 35px;
        height: 35px;
    }
    .dropdown-menu > li > a:hover {
        background-color: #3c8dbc;
        color: #f9f9f9;
    }
</style>