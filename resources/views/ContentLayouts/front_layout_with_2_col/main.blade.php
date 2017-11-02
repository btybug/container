<div class="col-md-3">
    @if(has_setting($settings,"left_bar",false))
        {!! BBRenderUnits($settings['left_bar']) !!}
    @endif
</div>
<div class="col-md-9">
    {!! main_content() !!}
</div>