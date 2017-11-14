<div class="container">
    <div class="col-md-3">
        @if(isset($settings['left_bar']))
            {!! BBRenderUnits($settings['left_bar']) !!}
        @endif
    </div>
    <div class="col-md-9">
        Main View
    </div>
</div>