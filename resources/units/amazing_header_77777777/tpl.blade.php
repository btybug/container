<div class="sahak-header-banner">{!! BBgetSiteName() !!}</div>
<nav class="sahak-header">
    <div class="header-logo"><a class="brand" title="{!! BBgetSiteName() !!}" href="/"><img alt="site logo"
                                                                                            src="{!! BBgetSiteLogo() !!}"></a>
    </div>
    <div class="site-name hide">{!! BBgetSiteName() !!}</div>
    <div class="dropdown pull-right">
        @if(isset($settings['menu_area']))
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                @php
                    $items = BBGetMenu($settings['menu_area'])
                @endphp
                @if(count($items))
                    @foreach($items as $item)
                        <a href="{!! url($item->url) !!}"><i class="{!! $item->icon !!}"></i> {!! $item->title !!}</a>
                    @endforeach
                @endif
                @endif
            </div>
    </div>
    <div class="nav navbar pull-right">
        <ul id="navigation-items">

        </ul>

    </div>
</nav>


<!-- Nav Menu Section End -->
{!! $_this->script('js/main.js') !!}
{!! $_this->style('css/main.css') !!}