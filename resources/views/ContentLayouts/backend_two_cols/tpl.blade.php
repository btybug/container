<div class="col-md-3 left-column"  style="background: black;">
    @if(isset($settings['placeholders']['left_bar']))
        {!! BBRenderUnits($settings['placeholders']['left_bar']) !!}
    @endif
</div>
<div class="col-md-9">
    @yield('content')
</div>