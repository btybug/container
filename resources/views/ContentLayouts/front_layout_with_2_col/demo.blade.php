@php
    $columnSizes = explode("-", get_settings($settings, 'columns_sizes', '3-6-3'));
    $leftTop = []; $mainTop = []; $rightTop = [];
    if(isset($settings['hook']['left_top']['units'])) $leftTop = $settings['hook']['left_top']['units'];
    if(isset($settings['hook']['main_top']['units'])) $mainTop = $settings['hook']['main_top']['units'];
    if(isset($settings['hook']['right_top']['units'])) $rightTop = $settings['hook']['right_top']['units'];

    if(isset($settings['hook']['left_bottom']['units'])) $leftBottom = $settings['hook']['left_bottom']['units'];
    if(isset($settings['hook']['main_bottom']['units'])) $mainBottom = $settings['hook']['main_bottom']['units'];
    if(isset($settings['hook']['right_bottom']['units'])) $rightBottom = $settings['hook']['right_bottom']['units'];
@endphp

<div class="{!! get_settings($settings, "container_type", "container") !!} main-wrapper">
    <div class="row">
        <div class="col-md-{!! $columnSizes[0] !!} {!! get_settings($settings, 'left_style') !!} {!! get_settings($settings, 'left_mobile_settings') !!}">
            @if(count($leftTop) > 0 and $leftTop[0] != "")
                @foreach($leftTop as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif

            @if(!has_setting($settings, 'left_top_unit', 'hide'))
                {!! BBRenderUnits($settings['left_top_unit_placeholder']) !!}
            @endif

            @if(!has_setting($settings, 'left_middle_unit', 'hide'))
                {!! BBRenderUnits($settings['left_middle_unit_placeholder']) !!}
            @endif

            @if(!has_setting($settings, 'left_bottom_unit', 'hide'))
                {!! BBRenderUnits($settings['left_bottom_unit_placeholder']) !!}
            @endif

            @if(count($leftBottom) > 0 and $leftBottom[0] != "")
                @foreach($leftBottom as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif
        </div>
        <div class="col-md-{!! $columnSizes[1] !!}">
            @if(count($mainTop) > 0 and $mainTop[0] != "")
                @foreach($mainTop as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif

            @if(has_setting($settings, "content_type", "unit-type"))
                @if(has_setting($settings, 'main_content_unit'))
                    {!! BBrenderUnits($settings['main_content_unit']) !!}
                @endif
            @else
                {!! get_settings($settings, "main_content_value") !!}
            @endif

            @if(count($mainBottom) > 0 and $mainBottom[0] != "")
                @foreach($mainBottom as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif
        </div>
        <div class="col-md-{!! $columnSizes[2] !!}">
            @if(count($rightTop) > 0 and $rightTop[0] != "")
                @foreach($rightTop as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif

            @if(!has_setting($settings, 'right_top_unit', 'hide'))
                {!! BBRenderUnits($settings['right_top_unit_placeholder']) !!}
            @endif

            @if(!has_setting($settings, 'right_middle_unit', 'hide'))
                {!! BBRenderUnits($settings['right_middle_unit_placeholder']) !!}
            @endif

            @if(!has_setting($settings, 'right_bottom_unit', 'hide'))
                {!! BBRenderUnits($settings['right_bottom_unit_placeholder']) !!}
            @endif

            @if(count($rightBottom) > 0 and $rightBottom[0] != "")
                @foreach($rightBottom as $unit)
                    {!! BBrenderUnits($unit) !!}
                @endforeach
            @endif
        </div>
    </div>
</div>

{!! BBstyle($_this->path.DS.'css/style.css') !!}