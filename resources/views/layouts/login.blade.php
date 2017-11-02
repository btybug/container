<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <title>Avatarbug</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <link rel="stylesheet" href="{{ url("css/bootstrap/css/bootstrap.min.css") }}" />
    <link rel="stylesheet" href="{{ url("css/font-awesome/css/font-awesome.min.css") }}" />
    <link rel="stylesheet" href="{{ url("js/jquery-ui/jquery-ui.min.css") }}" />


</head>
<body id="page-top">
    <div class="container">
        @if (count($errors) > 0)
            <div class="alert alert-danger" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @if (session('flash.message') != null)
            <div class="flash alert {{ Session::has('flash.class') ? session('flash.class') : 'alert-success' }}" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {!! session('flash.message') !!}
            </div>
        @endif

        @if(Session::has('message'))
            <div class="m-t-10 alert {{ Session::get('alert-class', 'alert-info') }} alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                {{ Session::get('message') }} </div>
        @endif
        @yield('content')
        @include('modal')
    </div>

    <script src="{{ url("js/jquery-3.2.1.min.js") }}" type="text/javascript"></script>
    <script src="{{ url("js/jquery-ui/jquery-ui.min.js") }}" type="text/javascript"></script>
    <script src="{{ url("css/bootstrap/js/bootstrap.min.js") }}" type="text/javascript"></script>
    @yield('footer')
    @stack('javascript')
    {{--@if(Session::has('message_code') && Session::get('message_code') == 200)--}}
        {{--<script>--}}
            {{--$(function() {--}}
                {{--$('#message-modal .modal-body').html("{!! Session::pull('success_mes') !!}");--}}
                {{--$('#message-modal').modal();--}}
            {{--});--}}
        {{--</script>--}}
    {{--@endif--}}
    <input name="token" type="hidden" value="{{ csrf_token() }}" id="token"/>
</body>
</html>
