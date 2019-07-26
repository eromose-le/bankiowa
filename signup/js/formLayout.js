// // //
// // // Shouldn't need to change anything below here...
// // //
var validationObj= {}

;
$.each(enrollmentObj, function(index, value) {
    var tabTitle=value.tabTitle.toLowerCase().replace(/\s+/g, "-");
    validationObj[tabTitle]= {}
    ;
    $.each(value.data, function(index, value) {
        var fields;
        if(value.fieldGroups) {
            $.each(value.fieldGroups, function(index, value) {
                $.each(value.fields, function(index, value) {
                    validationObj[tabTitle][index]= {
                        err: '.' + index
                    }
                    ;
                    validationObj[tabTitle][index].validators= {
                        blank: {}
                    }
                    ;
                    if(value.notEmptyMessage) {
                        validationObj[tabTitle][index].validators.notEmpty= {
                            message: value.notEmptyMessage()
                        }
                        ;
                    }
                    if(value.regexp) {
                        validationObj[tabTitle][index].validators.regexp= {
                            regexp: value.regexp(), message: value.regexpMessage()
                        }
                        ;
                    }
                    if(value.onSuccess) {
                        validationObj[tabTitle][index].onSuccess=value.onSuccess;
                    }
                }
                );
            }
            );
        }
        else {
            fields=value.fields;
        } //fields = value.fields;
        if(fields) {
            $.each(fields, function(index, value) {
                validationObj[tabTitle][index]= {
                    err: '.' + index
                }
                ;
                validationObj[tabTitle][index].validators= {
                    blank: {}
                }
                ;
                if(value.notEmptyMessage) {
                    validationObj[tabTitle][index].validators.notEmpty= {
                        message: value.notEmptyMessage()
                    }
                    ;
                }
                if(value.regexp) {
                    validationObj[tabTitle][index].validators.regexp= {
                        regexp: value.regexp(), message: value.regexpMessage()
                    }
                    ;
                }
                if(value.onSuccess) {
                    validationObj[tabTitle][index].onSuccess=value.onSuccess;
                }
            }
            );
        }
    }
    );
}

);
// Configuring some custom jquery mask patterns
// this one allows any number of alphanumeric characters
$.jMaskGlobals.translation['a']= {
    pattern: /[a-zA-Z0-9]/, recursive: true
}

;
// this one allows any number of letters
$.jMaskGlobals.translation['s']= {
    pattern: /[a-zA-Z]/, recursive: true
}

;
// this one allows any number of letters and space
$.jMaskGlobals.translation['l']= {
    pattern: /[A-Za-z\s\'~`\\-]/, recursive: true};
 $(document).ready(function() {
        var fieldCreation=function(value, index, idPrepend, tabTitle, security) {
            var fieldName=index.replace('[]', '');
            var hint='';
            var gridClass=(value.gridClass || 'col-xs-12 col-sm-6');
            if (value.hint) {
                hint='<label for="' + fieldName + '" class="hint" id="' + fieldName + '-hint">' + value.hint + '</label>';
            }
            var formGroupStr='<div class="form-group ' + gridClass + '"><label for="' + fieldName + '">' + value.label + ':</label>';
            if (value.inputType=='tel' || value.inputType=='text' || value.inputType=='password') {
                formGroupStr=formGroupStr + '<input type="' + value.inputType + '" id="' + idPrepend + fieldName + '" name="' + fieldName + '" class="form-control ' + (value.inputClass || '') + '" maxlength="' + (value.maxLength || 50) + '" />';
            }
            else if (value.inputType=='select') {
                formGroupStr=formGroupStr + '<select id="' + idPrepend + fieldName + '" name="' + fieldName + '" class="form-control ' + (value.inputClass || '') + '">';
                $.each(value.selectOptions, function (index, value) {
                    formGroupStr=formGroupStr + '<option value="' + value.value + '"' + (value.selected || '') + '>' + value.text + '</option>';
                }
                );
                formGroupStr=formGroupStr + '</select>';
            }
            formGroupStr=formGroupStr + hint + '<div class="' + fieldName + '" style="display:none;"></div></div>';
            if (security) {
                $('#' + security).append(formGroupStr);
            }
            else if (1==0) {}
            else {
                $('#' + formName + '_' + tabTitle).append(formGroupStr);
            }
            if (value.mask) {
                $('[id="' + idPrepend + fieldName + '"]').mask(value.mask);
            }
            if (value.maskMoney) {
                $('[id="' + idPrepend + fieldName + '"]').maskMoney( {
                    prefix: value.maskMoney, allowZero: true
                }
                );
            }
        }
        ; // Iterate through each form
        $.each(enrollmentObj, function (index, value) {
            var tabTitle=value.tabTitle.toLowerCase().replace(/\s+/g, "-");
            var idPrepend=value.idPrepend;
            if(enrollmentObj.length > 1) {
                $('#nav-tabs').append('<li role="presentation" class="' + (value.tabActive || '') + '"><a href="#' + tabTitle + '" role="tab" data-toggle="tab">' + value.tabTitle + '</a></li>');
            }
            else {
                $('#nav-tabs').hide();
            }
            $('#q2-form-fields').append('<div id="' + tabTitle + '" role="tabpanel" class="tab-pane ' + (value.tabActive || '') + '">\
            <form autocomplete="off" class="q2-form" name="' + formName + '_' + tabTitle + '" id="' + formName + '_' + tabTitle + '" action="javascript:void(0);" method="post" onsubmit="return submit_form(\'' + tabTitle + '\');"</form></div>'); // Iterate through each section
            var len=value.data.length;
            $.each(value.data, function (index, value) {
                if(value.sectionHeader) {
                    $('#' + formName + '_' + tabTitle).append('<div class="col-xs-12 ' + (value.className || 'groupHeading') + '" id="section' + index + '"><div class="">' + value.sectionHeader + '</div></div>');
                }
                if(value.sectionType=='securityQuestions') {
                    $('#section' + index).prepend('<div id="alertBox_security" class="alertBox hidden"><div class="row"><div class="col-xs-2 col-sm-1 col-md-1"><i class="icon-warning-sign"></i></div><div class="col-xs-10 col-sm-11 col-md-11 modal-msg-security">' + value.sectionHeader + '</div></div></div>');
                    for (var i=0;
                    i < value.sectionRequiredNumber;
                    i++) {
                        var formGroupStr='<div class="col-xs-12"><select id="' + idPrepend + value.sectionType + '_' + i + '" name="' + formName + '_' + tabTitle + '" class="form-control securityQ" style="margin-top: 5px;">';
                        formGroupStr=formGroupStr + '<option value="">Please select</option>';
                        $.each(value.fieldGroups, function (index, value) {
                            formGroupStr=formGroupStr + '<option value="' + idPrepend + index + '"' + (value.selected || '') + '>' + value.groupLabel + '</option>';
                        }
                        );
                        formGroupStr=formGroupStr + '</select></div>';
                        $('#' + formName + '_' + tabTitle).append(formGroupStr);
                    }
                    $.each(value.fieldGroups, function (index, value) {
                        var groupId=index;
                        $('#' + formName + '_' + tabTitle).append('<div id="securityQ_' + idPrepend + index + '" class="securityQC" style="display:none;"><div class="col-xs-12 groupDescription">' + (value.groupDescription || '') + '</div></div>');
                        $.each(value.fields, function (index, value) {
                            fieldCreation(value, index, idPrepend, tabTitle, 'securityQ_' + idPrepend + groupId);
                        }
                        );
                    }
                    ); // Add divider line
                    $('#' + formName + '_' + tabTitle).append('<div class="col-xs-12 "><div class="line"></div></div>');
                } // Iterate through each field
                if(value.fields) {
                    $.each(value.fields, function (index, value) {
                        fieldCreation(value, index, idPrepend, tabTitle);
                    }
                    );
                    if(value.sectionType=='accountList') {
                        window.fields=value.fields;
                        $('#' + formName + '_' + tabTitle).append('<div id="account-list-area"></div><div class="col-xs-12"><div class="pull-right"><a href="javascript:void(0);" onclick="addGroup(window.fields, \'' + idPrepend + '\',\'' + tabTitle + '\');">Add Account</a></div></div>');
                    } // Add divider line
                    $('#' + formName + '_' + tabTitle).append('<div class="col-xs-12 "><div class="line"></div></div>');
                }
            }
            ); //$('#' + formName + '_' + tabTitle).append('<input type="hidden" name="EnrollmentType" value="' + value.enrollmentType + '" /><button class="btn btn-primary pull-right" id="submit_button_' + formName + '_' + tabTitle + '">Continue</button><a href="' + login_page_url + '" class="btn btn-primary pull-right" target="_top">Return to Login</a>');
            $('#' + formName + '_' + tabTitle).append('<input type="hidden" name="EnrollmentType" value="' + value.enrollmentType + '" /><button class="btn btn-primary pull-right" id="submit_button_' + formName + '_' + tabTitle + '">Continue</button>'); //$('#' + formName + '_' + tabTitle).append('<input type="hidden" name="EnrollmentType" value="' + value.enrollmentType + '" /><input  id="token_' + formName + '_' + tabTitle + '" type="hidden" name="token" value= "" /><button class="btn btn-primary pull-right" id="submit_button_' + formName + '_' + tabTitle + '">Continue</button>');
            $('#' + formName + '_' + tabTitle).formValidation( {
                framework: 'bootstrap', live: 'disabled', icon: {
                    valid: 'icon-ok', invalid: 'icon-warning-solid', validating: 'icon-ok'
                }
                , fields: validationObj[tabTitle]
            }
            );
        }
        );
        $('#page_title').html(formTitle);
        $('#page_message').html(formMessage); // bootstrap tab setup
        $('.nav-tabs').on('click', 'li a', function(e) {
            $(this).tab('show');
        }
        ); // setup function call located in e2e.js (wedge side of things)
        $("#q2online").prop('action', login_page_url);
        $('input').blur(function (e) {
            $('#' + e.currentTarget.form.id).data('formValidation').validateField($(this).attr('name'));
            $('.' + $(this).attr('name')).hide();
            $('.' + $(this).attr('name') + ' .help-block').animate( {
                top: '35'
            }
            , 0); // hide hint
            $('#' + $(this).attr('name') + '-hint').hide().css('top', 35);
        }
        );
        $('input').focus(function (e) {
            $('.' + $(this).attr('name')).show();
            $('.' + $(this).attr('name') + ' .help-block').animate( {
                top: '69'
            }
            , 250);
            if ($('#' + e.currentTarget.form.id).data('formValidation').isValidField($(this).attr('name'))) {
                // hide hint
                $('#' + $(this).attr('name') + '-hint').hide().css('top', 35);
            }
            else {
                // show hint
                $('#' + $(this).attr('name') + '-hint').show().animate( {
                    top: '69'
                }
                , 250);
            }
        }
        );
        $('input').keyup(function (e) {
            // ignore tab and enter keyup
            if (e.which !=9 && e.which !=13) {
                if ($('#submit_button_' + e.currentTarget.form.id).is(':disabled')) {
                    $('#submit_button_' + e.currentTarget.form.id).removeAttr('disabled');
                }
                $('#' + e.currentTarget.form.id).data('formValidation').validateField($(this).attr('name'));
                if ($('#' + e.currentTarget.form.id).data('formValidation').isValidField($(this).attr('name'))) {
                    // hide hint
                    $('#' + $(this).attr('name') + '-hint').hide().css('top', 35);
                }
                else {
                    // show hint
                    $('#' + $(this).attr('name') + '-hint').show().animate( {
                        top: '69'
                    }
                    , 250);
                }
                $('#' + e.currentTarget.form.id).data('formValidation').resetField($(this).attr('name'));
            }
        }
        );
        $('.securityQ').change(function() {
            $('.securityQC').hide();
            $('#securityQ_' + $(this).val()).show();
        }
        ); // the following is for validation and hint message resizing
        var widthForm=$('.form-control:visible').width() + 26.5;
        $('.help-block, .hint').width(widthForm);
        $(window).resize(function () {
            var widthFormResize=$('.form-control:visible').width() + 26.5;
            $('.help-block, .hint').width(widthFormResize);
        }
        ); // Javascript to enable link to tab removing -form to trigger tab correctly
        var url=document.location.toString();
        if (url.match('#')) {
            $('.nav-tabs a[href=#' + url.split('#')[1].replace("-form", "") + ']').tab('show');
        }
        window.addGroup=function(fields, idPrepend, tabTitle) {
            $('#account-list-area').append('<div class="col-xs-12 "><div class="line"></div></div>');
            $.each(fields, function (index, value) {
                //console.log(value.);
                fieldCreation(value, index, idPrepend, tabTitle, 'account-list-area');
            }
            );
        } // Test function for testing success modal
        window.testSuccess=function(testType) {
            if(testType=='full') {
                process_form(true, '{"result":"success","data": {"message":"You have successfully enrolled in online banking", "loginid":"ASFDASGS", "password":"fdgsdfgsdfgsdf"}}', 'Personal');
            }
            else {
                process_form(true, '{"result":"partial","data": {"loginid":"ASFDASGS", "password":"fdgsdfgsdfgsdf"}}', 'Personal');
            }
        }
    }
    );