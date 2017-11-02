<div id="settings_div111">

        <div class="form-group my_rows1">
            <label for="newcontainer" class="col-sm-4 labelTitle">Header style</label>
            <div class="col-sm-8">
                {!! BBbutton('styles','newcontainer','Select Header Style',['class'=>'form-control input-md','data-type'=>'container','model'=>$settings]) !!}
            </div>
        </div>

        <div class="form-group my_rows1">
            <label class="col-md-4 control-label" for="sitenametextstyle">Site Name Text Style</label>
            <div class="col-md-8">
                {!! BBbutton('styles','sitenametextstyle','Select Site Name Text Style',['class'=>'form-control','data-type'=>'text','model'=>$settings]) !!}
            </div>
        </div>

    <div class="form-group my_rows1">
        <label class="col-md-4 control-label" for="socialiconswidget_11">Social Icons Widget</label>
        <div class="col-md-8">
            {!! BBbutton('widgets','socialiconswidget_1','Select Social Icons Widget',['class'=>'form-control','data-type'=>'others','model'=>$settings]) !!}
        </div>
    </div>

    <div class="form-group my_rows1">
        <label class="col-md-4 control-label" for="my-menu">Select Menu</label>
        <div class="col-md-8">
            {!! BBbutton('menus','my-menu','Select Menu',['class'=>'form-control input-md btn btn-info', 'data-type'=>'backend','model'=>$settings]) !!}
        </div>
    </div>

    <div class="form-group my_rows1">
        <label class="col-md-4 control-label" for="my-menu">Select Menu Style</label>
        <div class="col-md-8">
            {!! BBbutton('styles','main_menu','Select Menu Style',['class'=>'form-control input-md btn btn-primary', 'data-type'=>'menu','model'=>$settings]) !!}
        </div>
    </div>


    <div class="form-group my_rows1">
        <label class="col-md-4 control-label" for="loginbutton">Login Widget</label>
        <div class="col-md-8">
            {!! BBbutton('widgets','loginbutton','Select Login Widget',['class'=>'form-control','data-type'=>'others','model'=>$settings]) !!}
        </div>
    </div>
</div>





