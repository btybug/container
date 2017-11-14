@php
    $leftBar = (isset($settings['placeholders']['left_bar']))
        ? $settings['placeholders']['left_bar'] : null;

    $rightBar = (isset($settings['placeholders']['right_bar']))
        ? $settings['placeholders']['right_bar'] : null;
@endphp
<div class="main-wrapper_custm row container_div" style="background-color:#fff">
    @if($leftBar)
        <div class="col-md-2">
            {!! BBRenderUnits($leftBar) !!}
        </div>
    @endif

    <div class="{!! ($leftBar && $rightBar) ? 'col-md-6' : (! $leftBar && ! $rightBar) ? 'col-md-12' : (! $leftBar or ! $rightBar) ? 'col-md-10' : '' !!}">
        @yield('content')
    </div>

    @if($rightBar)
        <div class="col-md-3">
            {!! BBRenderUnits($rightBar) !!}
        </div>
    @endif
</div>
