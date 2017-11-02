<div class="row">
    <div class="col-xs-12 col-sm-12">
        <div class="panel panelSettingData">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion"
                                           href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo"> <i
                                class="glyphicon glyphicon-chevron-right"></i>Main Settings</a></h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                    <div class="form-group">
                        <div class="row">
                            <label for="navstyle" class="col-xs-3">Areas width (%)</label>
                            <div class="col-xs-9">
                                <div class="input-group">
                                    <div class="col-md-6">
                                        <span style="color: white;" class="range-value">
                                            {!! (isset($settings['width'])) ? "Left: " . (100 - $settings['width']) ." Main: ".$settings['width'] : "Left: 0 Main: 100" !!}
                                        </span>
                                    </div>
                                    <div class="col-md-6">
                                        <input name="width" class="slider-width" type="range"
                                               value="{!! (isset($settings['width'])) ? $settings['width'] : 100 !!}"
                                               min="0" max="100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <label for="navstyle" class="col-xs-3">Left Areas Unit</label>
                            <div class="col-xs-9">
                                <div class="input-group">
                                    {!! BBbutton2('unit',"sidebar_place_holder_left","frontend_sidebar","Change",['class'=>'btn btn-default change-layout','data-type'=>'frontend_sidebar','model'=>null]) !!}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <label for="navstyle" class="col-xs-3">Main Areas Unit</label>
                            <div class="col-xs-9">
                                <div class="input-group">
                                    {!! BBbutton2('unit',"main_place_holder","front_page_content","Change",['class'=>'btn btn-default change-layout','data-type'=>'front_page_content','model'=>null]) !!}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <button class="btn btn-builder-gray" id="add-hook-btn">Add Hook</button>
    </div>
</div>
<div class="dialog" id="create-hook-dialog">
    <div class="close close-hook-dialog">X</div>
    <div class="col-md-12 hook-dialog-message"></div>
    <div class="col-md-12">
        <div class="col-md-12">
            Position:
            <select name="position">
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
            </select>
        </div>
    </div>
    <div class="col-md-12">
        Name:<input type="text" name="hook_name">
    </div>
    <div class="col-md-12">
        Tag:<input type="text" name="hook_tag">
    </div>
    <div class="col-md-12">
        Width:<input type="number" name="hook_width">
    </div>
    <div class="col-md-12">
        Height:<input type="number" name="hook_height">
    </div>
    <div class="col-md-12">
        <input type="button" id="create-hook" value="Create"><input type="button" value="Cancel">
    </div>
</div>
@if(isset($settings['hook']))
    @foreach($settings['hook'] as $hook)
        <textarea class="hooks-data hide" name="hook[{!! json_decode($hook,true)['name'] !!}]">{!! $hook !!}</textarea>
    @endforeach
@endif
{!!BBscript($model->path.DS.'js/js.js') !!}
{!!BBstyle($model->path.DS.'css/style.css') !!}
