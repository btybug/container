@php
    $login = BBCheckLoginEnabled();
@endphp

<ul id="nav-user-menu" class="nav navbar-nav navbar-right">
    <li class="dropdown">
        @if(\Auth::check())
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account
                <b class="caret"></b>
            </a>
        @else
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Log In
                <b class="caret"></b>
            </a>
        @endif

        <ul class="dropdown-menu">
            <li>
                @if(\Auth::check())
                    <div class="navbar-content">
                        <div class="row">
                            <div class="col-md-5">
                                <img src="{!! BBGetUserAvatar() !!}" alt="Alternate Text" class="img-responsive"/>
                            </div>
                            <div class="col-md-7">
                                <span>{!! BBGetUser() !!}</span>
                                <p class="text-muted small">
                                    {!! BBGetUser(null,'email') !!}</p>
                                <div class="divider">
                                </div>
                                <a href="#" class="btn btn-primary btn-sm active">View Profile</a>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-footer">
                        <div class="navbar-footer-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <a href="{!! url('/') !!}" class="btn btn-default btn-sm">Home</a>
                                </div>
                                <div class="col-md-6">
                                    <a href="{!! url('/logout') !!}" class="btn btn-default btn-sm pull-right">Sign
                                        Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                @else
                    <div class="navbar-content">
                        <div class="row" style="padding: 10px;">
                            {!! Form::open(['url' => '/login','id' => 'login-form']) !!}
                            <div class="form-group">
                                {!! Form::text('usernameOremail',null,['class' => 'form-control','id' => 'username','tabindex' => '1']) !!}
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" id="password" tabindex="2"
                                       class="form-control" placeholder="Password">
                            </div>
                            <div class="form-group text-center">
                                <input type="checkbox" tabindex="3" class="" name="remember"
                                       id="remember">
                                <label for="remember"> Remember Me</label>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6 col-sm-offset-3">
                                        <input type="submit" name="login-submit" id="login-submit"
                                               tabindex="4"
                                               class="form-control btn btn-login" value="Log In">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="text-center">
                                            <a href="#" tabindex="5" class="forgot-password">Forgot
                                                Password?</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                @endif
            </li>
        </ul>
    </li>
</ul>


{{--
@php
    $login = BBCheckLoginEnabled();
    $reg = BBCheckRegistrationEnabled();
@endphp
@if(\Auth::check())
    <li class="dropdown my-log-drop {!! $settings['loginunitstyle'] or '' !!}">
        <div class="col-md-6">
            {!! \Auth::user()->username !!}
            <img src="{!! BBGetUserAvatar() !!}" width="40" height="40" class="avatar">
        </div>
        <div class="col-md-6">
            <a class="dropdown-toggle" href="{!! url('logout') !!}"> LOGOUT
            </a>
        </div>
    </li>
@else
    <li class="dropdown my-log-drop {!! $settings['loginunitstyle'] or '' !!}">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            @if($login)
                LOGIN
            @endif

            @if($reg && $login)
                /
            @endif
            @if($reg)
                REGISTER
            @endif
            @if($reg || $login)
                <span class="caret"></span>
            @endif

        </a>
        <ul class="dropdown-menu">
            <div class="dropdown_menu_style">
                <div class="panel panel-login">
                    <div class="panel-heading">
                        <div class="row">
                            @if($login)
                                <div class="col-xs-6">
                                    <a href="#" class="active" id="login-form-link">Login</a>
                                </div>
                            @endif
                            @if($reg)
                                <div class="col-xs-6">
                                    <a href="#" id="register-form-link">Register</a>
                                </div>
                            @endif
                        </div>
                        <hr>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                @if($login)
                                    @if(Session::has('message'))
                                        <div class="alert alert-danger">
                                            {!! Session::get('message') !!}
                                        </div>
                                    @endif
                                    <div>
                                        {!! Form::open(['url' => '/login','style' => 'display: block;','id' => 'login-form','role' => 'form']) !!}
                                        <div class="form-group">
                                            {!! Form::text('usernameOremail',null,['class' => 'form-control','id' => 'username','tabindex' => '1']) !!}
                                            <div class="form-group">
                                                <input type="password" name="password" id="password" tabindex="2"
                                                       class="form-control" placeholder="Password">
                                            </div>
                                            <div class="form-group text-center">
                                                <input type="checkbox" tabindex="3" class="" name="remember"
                                                       id="remember">
                                                <label for="remember"> Remember Me</label>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="login-submit" id="login-submit"
                                                               tabindex="4"
                                                               class="form-control btn btn-login" value="Log In">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="text-center">
                                                            <a href="#" tabindex="5" class="forgot-password">Forgot
                                                                Password?</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {!! Form::close() !!}
                                        </div>

                                        @endif
                                        @if($reg)

{{--[form id=1]--}}

{{--@endif--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}
{{--</ul>--}}
{{--</li>--}}
{{--@endif--}}


{!! $_this->style('/css/styles.css') !!}
@section("js")
    {!! $_this->script('/js/boostrap.min.js') !!}
    {!! $_this->script('/js/script.js') !!}
@stop
