<style>
    .panel{
        color: #000000!important;
    }
</style>

<div class="panel panel-default" style="margin-top: 15px;">
    <div class="panel-heading">Units</div>
    <div class="panel-body">
        <div class="form-group">
            <label for="">Select User Unit</label>
            {!! BBbutton2('unit','right_unit','user-unit','Select Unit',['class'=>'form-control input-md','model'=>$settings]) !!}
        </div>
    </div>
</div>