@inject('classifiers','App\Modules\Manage\Models\Classifier')

                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-7 col-lg-6 col-xl-6 author_name_div">
                        <div class="name_btn_div">
                            <div class="col-md-6">
                                <h2>Select Classify</h2>
                                <ul class="list-group">
                                    @foreach($classifiers->all() as $classifier)
                                    <li  data-id="{{ $classifier->id }}" class="list-group-item classify-irem"> {{ $classifier->title }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                    <div style="padding:15px;">
                        <ul id="menus-list" class="sortable ui-sortable ui-droppable dvmin-height terms-box list-unstyled terms-boxdesgin">

                        </ul>
                    </div>
                    </div> 

                </div>
 
{!! $_this->style('css/styles.css') !!} 
{!! $_this->script('js/main.js') !!}
