$(function () {
    var framework = {};

    $('.selectpicker').selectpicker();
    var saveoredit = 'save';
    var loadclasstype = '';
    var loadsavecss = '';
    var groupclasstyle = 'box_styles';

    function sendajax(url, data, success) {

        $.ajax({
            type: "post",
            datatype: "json",
            url: url,
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('[name="_token"]').val()
            },
            success: function (data) {
                if (success) {
                    success(data);
                }
                return data;
            }
        });
    }

    if ($('#colorbuilder').length > 0) {

        $('#colorbuilder').colorpicker({
            color: '#ffaa00',
            container: true,
            inline: true
        }).on('changeColor', function (e) {
            e.preventDefault();
            var rgba = e.color.toRGB();
            var rgbcolor = 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
            var getcss = $(this).data('css')
            if (!getcss) {
                getcss = 'background';
            }
            var getname = $('[data-studiname]').val();

            var outputcss = '.' + getname + '{' + getcss + ':' + rgbcolor + ';}';
            $('[data-output="studio"]').val(outputcss)
            var createjson = {}
            createjson[getname] = {}
            createjson[getname]['normal']= {}
            createjson[getname]['normal'][getcss] = rgbcolor;
            var connnected= {};
            connnected['connnected'] = createjson[getname];
            $('[data-export="json"]').val(JSON.stringify(createjson))
            $('[data-export="hoverjson"]').val(JSON.stringify(connnected))
            $('[data-preview="studio"]').css(getcss, rgbcolor)
        });

        $('[data-studiname]').keyup(function () {
            var rgbcolor = $('#colorbuilder').colorpicker('getValue')
            var getcss = $('#colorbuilder').data('css')
            if (!getcss) {
                getcss = 'background';
            }
            var getname = $('[data-studiname]').val();
            var outputcss = '.' + getname + '{' + getcss + ':' + rgbcolor + ';}';
            var createjson = {}
            createjson[getname] = {}
            createjson[getname]['normal']= {}
            createjson[getname]['normal'][getcss] = rgbcolor;
            var connnected= {}
            connnected['connnected'] = createjson[getname];
          
            $('[data-export="json"]').val(JSON.stringify(createjson))
            $('[data-export="hoverjson"]').val(JSON.stringify(connnected))
            $('[data-output="studio"]').val(outputcss)
            $('[data-preview="studio"]').css(getcss, rgbcolor);
        })


    }
    function ajaxsuccess(data) {
        var message = data.message
        if (typeof message == 'object') {
            var messagehtml = ''
            $.each(message, function (key, val) {
                messagehtml += key + ' ' + val + '<br>';
            })
            bootbox.alert(messagehtml);
        } else {
            if (message) {
                bootbox.alert(message);
            }

        }
        if (data.data) {
            /*var htmls = $('[data-template="listingitem"]').html()
             $('[data-role="listitem"]').empty()
             $.each(data.data, function(index, val){
             var newhtmls = htmls;
             newhtmls =  newhtmls.replace(/{name}/g, val.classname)
             $('[data-role="listitem"]').append(newhtmls)

             })*/
            
            
            $('#myModal').modal('hide');
            location.reload();
        }
    }


    if ($('#gradienteditor').length > 0) {
        var onchage = true;

        var editor = ace.edit("gradienteditor");
        var editorcss = '';

        editor.setTheme("ace/theme/twilight");
        editor.getSession().setMode("ace/mode/css");
        editor.getSession().on('change', function () {
            if (onchage) {
                updategradient()
            }
        });
        loadsavecss = editor.getValue();
        updategradient();

        $('[data-studiname]').focusin(function () {
            if (onchage) {
                editorcss = editor.getValue();
                editorcss = editorcss.split('{');
                editorcss = editorcss[1]
            }
            onchage = false
        })
        $('[data-studiname]').focusout(function () {
            onchage = true
        })

        $('[data-studiname]').keyup(function () {
            var getname = $(this).val();
            var csss = '.' + getname + '{' + editorcss;
            editor.setValue(csss, -1);
            updategradient();

        })

        function updategradient() {
            var previewgradient = editor.getValue();
            var gradient = previewgradient.split(':')
           
            if (gradient[1]) {
               
                var getname = previewgradient.split('{')

                var csspropar = getname[1]
                csspropar = getname[1].replace('}', '')
                csspropar = csspropar.split(';')
                getname = getname[0].replace('.', '')
                if (onchage) {
                    $('[data-studiname]').val(getname);
                }

                var senect = gradient[1]
                senect = senect.replace(';', ' ')
                senect = senect.replace('}', ' ')
                var createjson = {}
                createjson[getname]= {}
                createjson[getname]['normal']={}
                var connnected = {}
                
                $.each(csspropar, function (index, val) {
                    var keypro = val.split(':')
                    var name = keypro[0]
                    createjson[getname]['normal'][name] = keypro[1];
                })
                connnected['connnected'] = createjson[getname];
                $('[data-export="json"]').val(JSON.stringify(createjson))
                $('[data-export="hoverjson"]').val(JSON.stringify(connnected))
               
                $('[data-output="studio"]').val(previewgradient)
                $('[data-preview="studiogradients"]').attr('class', 'demopreview ' + getname)
                $('[data-role="savedcss"]').html(previewgradient)
            }
        }


    };

    function getclassmodal(data) {
        if (data != '') {
            var gethtmls = $('[data-template="existinggroup"]').html()
            $('[data-existmodal="listing"]').html(gethtmls)

            //var heading = '<h5>'+key+'</h5>';
            //$('[data-existmodal="listing"]').append(heading)

            if (data.data[groupclasstyle]) {
                $.each(data.data[groupclasstyle], function (index, css) {
                    var createrow = $('<div class="row tab-pane" role="tabpanel" id="popuptab' + index + '"></div>');
                    var tabheading = '<li>' +
                        '<a href="#popuptab' + index + '" aria-controls="home" role="tab" data-toggle="tab" class="tpl-left-items">' +
                        '<span class="module_icon"></span> ' + index +
                        '</a>' +
                        '</li>';

                    $('[data-existmodal="tabmenu"]').append(tabheading)
                    $.each(css, function (i, csss) {
                        var gethtml = getlisthtml(csss);
                        createrow.append(gethtml)
                    })
                    createrow.appendTo('[data-existmodal="listinggroup"]')
                })
            } else {
                $('[data-existmodal="listinggroup"]').append('please create ' + loadclasstype + ' style, ')
            }


            $('[data-existmodal="tabmenu"] li:first a').click()
            $('.ajaxloding').remove()
        }

    }

    function getitemmodal(data) {
        if (data.data) {
            var createrow = $('<div class="row"></div>');
            if (data.data != '') {
                $.each(data.data, function (key, val) {
                    //alert(key+' '+JSON.stringify(val))
                    //var heading = '<h5>'+key+'</h5>';
                    //$('[data-existmodal="listing"]').append(heading)

                    var gethtml = getlisthtml(val);
                    createrow.append(gethtml)

                })
                createrow.appendTo('[data-existmodal="listing"]')
            } else {
                $('[data-existmodal="listing"]').append('Sorry ' + loadclasstype + ' style is not have in Basic tab,  please create <a href="#">' + loadclasstype + '</a> style')
            }
        }

    }


    function getlisthtml(css) {

        var htmls = $('[data-template="existinglist"]').html()
        var cssdata = JSON.stringify(css.css)
        htmls = htmls.replace(/{data}/g, cssdata)
        htmls = htmls.replace(/{type}/g, loadclasstype)
        htmls = htmls.replace(/{name}/g, css.classname)
        return htmls;
    }

    function ajaxdelete(date) {
        if (!date.error) {
            $('[data-toolaction="selected"].active').closest('.col-xs-12').remove()
            if (toolint.activejson['class']) {
                delete toolint.activejson['class'];
            }
        }
        if(date.error){
          alert(JSON.stringify(date))
        }
    }

    $("#myModal").on('hide.bs.modal', function () {
        saveoredit = 'save'
        if ($('#gradienteditor').length > 0) {

            editor.setValue(loadsavecss, -1);
            $('[data-role="classname"]').focusin()
            $('[data-role="classname"]').val('classname').keyup()
            $('[data-role="classname"]').focusout();

        };
    });

    var toolint = {
        activejson: {},
        ajaxdelete: function (date) {

        },
        deletes: function (target) {
            if (toolint.activejson['class']) {
                var data = {}
                data['tab'] = $('[data-action="tab"]').val();
                data['type'] = $('[data-action="type"]').val()
                data['sub'] = $('[data-action="sub"]').val();
                data['classname'] = toolint.activejson['class'];
                sendajax('/admin/framework/delete-class', data, ajaxdelete)
            }

        },
        copy: function (target) {

        },
        edit: function (target) {
            if (toolint.activejson['class']) {
                saveoredit = 'edit'
                if ($('#gradienteditor').length > 0) {
                    var targetjson = toolint.activejson['json']['css']['normal'];
                    if(!targetjson){
                      targetjson = toolint.activejson['json']['css'];
                    }
                    if (toolint.activejson['json']) {
                        var css = '.' + toolint.activejson['class'] + '{'
                        $.each(targetjson, function (key, val) {
                            css += key + ':' + val + ';';
                        })
                        css += '}'
                        editor.setValue(css, -1);
                    }
                }
                $('[data-role="classname"]').focusin()
                $('[data-role="classname"]').val(toolint.activejson['class']).keyup()
                $('[data-role="classname"]').focusout();
                $('#myModal').modal('show');
            }
        },
        selected: function (target) {
            var getclassname = target.data('classname');
            var getcssjson = target.data('itemjson');

            if (target.hasClass('active')) {
                target.removeClass('active')
                if (toolint.activejson['class']) {
                    delete toolint.activejson['class']
                    delete toolint.activejson['json']
                }
            } else {
                $('[data-toolaction="selected"]').removeClass('active');
                target.addClass('active')
                toolint.activejson['class'] = getclassname;
                toolint.activejson['json'] = getcssjson;
            }
        }
    }

    $('body').on('click', '[data-savestudio]', function () {
        var gettype = $(this).data('savestudio')
        if (gettype) {
            var getname = $('[data-studiname]').val();
            var getval = $('[data-output="studio"]').val()
            var getjson = JSON.parse($('[data-export="json"]').val())
            //alert(getname+' '+ getval)
            var getjsonval = $('[data-export="hoverjson"]').val();
            var savedata = ''
            if(getjsonval){
                savedata = JSON.parse(getjsonval)
            }
            var data = {}
            data['tab'] = $('[data-action="tab"]').val();
            data['type'] = $('[data-action="type"]').val()
            data['sub'] = $('[data-action="sub"]').val();
            data['css'] = getjson;
            if (savedata) {
                if (savedata.connnected) {
                    data['csssetting'] = savedata.connnected
                }
            }
            data['old_classname'] = toolint.activejson['class'];
            
            if (saveoredit == 'edit') {
                sendajax('/admin/framework/edit-class', data, ajaxsuccess)
            } else {
                sendajax('/admin/framework/create-class', data, ajaxsuccess)
            }
        }
    });

    $('body').on('click', '[data-studiosub]', function () {
        var classtype = $(this).data('studiosub');
        var sanddata = {type: classtype}
        groupclasstyle = $(this).data('type')
        $("#varModal").modal('show');
        $('[data-existmodal="listing"]').empty()
        $('[data-existmodal="name"]').html(classtype)
        loadclasstype = classtype
        sendajax('/admin/framework/get-subs-with-classes', sanddata, getclassmodal)

    }).on('click', '[data-studioitems]', function () {
        var classtype = $(this).data('studioitems');
        var sanddata = {}
        sanddata['tab'] = $(this).data('tab');
        sanddata['type'] = $(this).data('type');
        sanddata['sub'] = classtype;
        loadclasstype = classtype
        $("#varModal").modal('show');
        $('[data-existmodal="listing"]').empty()
        $('[data-existmodal="name"]').html(classtype)
        sendajax('/admin/framework/get-items', sanddata, getitemmodal)

    }).on('click', '[data-toolaction]', function () {
        var thisevent = $(this).data('toolaction');
        if (toolint[thisevent]) {
            toolint[thisevent]($(this))
        }
    });
    function createNewGroup() {

    }

    function createNewGroup(data) {
        if (!data.error) {
            location.reload();
        }
    }

    $('[data-role="addnewgroup"]').click(function () {
        var groupname = $('#groupname').val()
        var type = $('[data-action=type]').val()
        var sub = $('[data-action=sub]').val()
        var data = {"group_name": groupname, "type": type, "sub": sub}
        sendajax('/admin/framework/create-new-group', data, createNewGroup);
        $('#groupname').val('')

    })

    if (jQuery('.customselect').length > 0) {
        $('.customselect').selectpicker();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.customselect').selectpicker('mobile');
        }
    }

});