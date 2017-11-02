{!! $_this->style('css/main.css') !!}
<div class="logo-menu">
    <nav class="navbar navbar-default" role="navigation" data-spy="affix" data-offset-top="50">
        <div class="row">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="col-md-3">
                <div class="navbar-header col-md-12">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#home">
                        <img src="{!! BBgetSiteLogo() !!}" width="50" alt="Logo" class="img-circle pull-left">
                        <span>{!! BBgetSiteName() !!}</span></a>
                </div>
            </div>
           <div class="col-md-6">
               <div class="collapse navbar-collapse" id="navbar">
                   @if(isset($settings['menu_area']))
                       @php
                           $items = BBGetMenu($settings['menu_area'])
                       @endphp
                       @if(count($items))
                           <ul class="nav navbar-nav col-md-9 pull-right">
                               @foreach($items as $item)
                                   <li><a href="{!! url($item->url) !!}"><i class="{!! $item->icon !!}"></i> {!! $item->title !!}</a></li>
                               @endforeach
                           </ul>
                       @endif
                   @endif
               </div>
           </div>
            <div class="col-md-3">
                <div class="navbar-header col-md-3">
                    @if(isset($settings['user_area']))
                        {!! BBRenderUnits($settings['user_area']) !!}
                    @endif
                </div>
            </div>
        </div>
    </nav>
</div>
<!-- Nav Menu Section End -->