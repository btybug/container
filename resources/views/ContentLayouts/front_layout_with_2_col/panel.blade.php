@php
    $frontendRoles=new \Sahakavatar\User\Repository\RoleRepository();
@endphp
<div class="col-sm-4 p-l-0">{!!  'Left Sidebar' !!}</div>
<div class="col-sm-5 p-l-0 p-r-10">
    <input name="selcteunit" data-key="title" readonly="readonly" data-id="{!!'sidebar_place_holder_left'!!}"
           class="page-layout-title form-control"
           value="{!! BBgetUnitAttr(($page->page_layout_settings['sidebar_place_holder_left'])??null,'title') !!}"
    >
</div>
{!! BBbutton2('unit','sidebar_place_holder_left','frontend_sidebar',"Change",['class'=>'btn btn-default change-layout','data-type'=>'frontend_sidebar','data-name-prefix'=>'page_layout_settings','model'=>($page->page_layout_settings['sidebar_place_holder_left'])??null]) !!}
<div class="form-group">
    <label class="col-md-4 control-label" for="checkboxes">Left sidebar access</label>
    <div class="col-md-4">
        @foreach($frontendRoles->getFrontRoles() as $role)
            <div class="checkbox">
                <label for="checkboxes-1">
                    {!! Form::checkbox('page_layout_settings[sidebar_left_roles][]',$role->slug,(isset($page->page_layout_settings['sidebar_left_roles']) && in_array($role->slug,$page->page_layout_settings['sidebar_left_roles']))?1:0) !!}
                    {!! $role->name !!}
                </label>
            </div>
        @endforeach
    </div>
</div>
