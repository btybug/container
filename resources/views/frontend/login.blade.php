@extends('layouts.login')
@section('content')
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 logadmin">
            @if (session('flash.message') != null)
                <div class="flash alert {{ Session::has('flash.class') ? session('flash.class') : 'alert-success' }}">
                    {!! session('flash.message') !!}
                </div>
            @endif
            {!! Form::open() !!}
                <fieldset>
                    <h2>Please Login</h2>
                    <hr class="colorgraph">
                    <div class="form-group">
                        <input type="text" name="usernameOremail" id="email" class="form-control input-lg"
                               placeholder="Username or Email">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" id="password" class="form-control input-lg"
                               placeholder="Password" value="">
                    </div>

                    <div class="checkbox">
                        <label>
                            <input name="remember" type="checkbox" value="Remember Me"> Remember Me
                        </label>
                        <a href="{!! url('forgot')!!}" class="btn btn-link pull-right">Forgot Password?</a>
                    </div>


                    <hr class="colorgraph">
                    <div class="row">
                        <div class="col-xs-6 col-sm-6 col-md-6">
                            <input type="submit" class="btn btn-lg btn-success btn-block" value="Login">
                        </div>
                        @if(isset($enable_reg) && $enable_reg)
                            <div class="col-xs-6 col-sm-6 col-md-6">
                                <a href="{!! url('register')!!}" class="btn btn-lg btn-primary btn-block">Register</a>
                            </div>
                        @endif
                    </div>
                </fieldset>
            {!! Form::close() !!}
        </div>
    </div>
@stop
@section('footer')
@stop



