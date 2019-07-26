var login_page_url = "https://secure.bankiowa.bank/BankIowaOnline/uux.aspx";
var redirect_url = "https://www.bankiowa.bank"

var generic_error_message = "An error occurred.";

// formTitle is used for the title that appears above the form
var formTitle = 'Enroll for Online and Mobile Banking Access';

// formMessage is used directly under the title
var formMessage = 'Please provide the following information so we can verify your identity. If you need assistance, please call our eBanking Support Team at 844.226.5421.';

// formName is used for the name and id on the <form> tag
var formName = 'OnlineEnrollment';

// formAction is used for the action on the <form> tag, 
var formAction = 'ProcessE2E.aspx';

////////////////////////
// The following variables control what goes in the modal that displays on a successful submission
// In most cases these probably don't need to be changed.
////////////////////////

// modalIcon sets the Font Awesome icon to display in the modal
var modalIcon = 'icon-ok-circle';

// modalTite set the title that shows at the top of the modal
var modalTitle = 'Congratulations!';

// modalBody set the body of the modal, this appears immediatly follwoing the success message
// returned from the wedge the Login ID can be dynamically populated like:
// $("#login_id").html(json.data.loginid); where json.data.loginid is the login id returned from the wedge
var modalBody = 'Your Login ID is <strong id="login_id"></strong><br/><br/>Please be sure to save your Login ID in a secure location. You will use this Login ID for all future online and mobile banking sessions.';

// modalFooter sets up the footer of the modal, default inserts a form with all needed hidden fields
// in order to perform a login when the "contine" button is clicked
var modalFooter = '<form name="q2online" method="post" action="" id="q2online">\
    <!-- Online Login URL -->\
    <input type="hidden" class="text" id="olb-user" name="q2oLoginID" value="" />\
    <!-- handles split login -->\
    <input type="hidden" class="text" id="olb-pass" name="q2oPassword" maxlength="47" value="___" />\
    <input type="hidden" class="text" id="uux-user" name="user_id" value="" />\
    <input type="hidden" class="text" id="uux-pass" name="password" maxlength="47" value="___" />\
    <button type="submit" name="_action" class="btn btn-primary" id="modal-button">Continue</button>\
    </form>';

// masking explained briefly:
// 0 any single digit
// 9 optional single digit
// # any number of digits
// A any single alphanumeric
// a any number of alphanumeric
// S any single letter
// s any number of letters
// l any number of letters and space
// maskMoney is special and always requires inputClass: 'currency'

var enrollmentObj = [{
    tabTitle: 'Personal',
    enrollmentType: 'retail',
    tabActive: 'active',
    idPrepend: 'valrt_',
    data: [{
        sectionHeader: '',
        fields: {
            AccountNumber: {
                label: 'Account Number',
                inputType: 'tel',
                minLength: 1,
                maxLength: 20,
                mask: '#',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^\\d{' + this.minLength + ',' + this.maxLength + '}$');
                },
                regexpMessage: function() {
                    return this.label + ' must be between ' + this.minLength + ' and ' + this.maxLength + ' numbers.';
                }
            },
            AccountType: {
                label: 'Account Type',
                inputType: 'select',
                notEmptyMessage: function () { return this.label + ' is required.' },
                selectOptions: [
                    {
                     value: '',
                     text: 'Please select',
                     selected: 'selected'
                     },
                     {
                     value: 'CK',
                     text: 'Checking'
                     },
                     {
                     value: 'SV',
                     text: 'Savings'
                     },
                     {
                     value: 'CD',
                     text: 'CD'
                     },
                     {
                     value: 'Loan',
                     text: 'Loan'
                     }
                ]
            },
            FirstName: {
                label: 'First Name',
                hint: 'Must match your name on file',
                inputType: 'text',
                minLength: 1,
                maxLength: 50,
                mask: 'l',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^[a-zA-Z]+');
                },
                regexpMessage: function() {
                    return 'The ' + this.label + ' you entered does not appear to be valid.';
                }
            },
            LastName: {
                label: 'Last Name',
                inputType: 'text',
                minLength: 1,
                maxLength: 50,
                mask: 'l',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^[a-zA-Z\'~`\\-]+');
                },
                regexpMessage: function() {
                    return 'The ' + this.label + ' you entered does not appear to be valid.';
                }
            },
            SocialSecurity: {
                label: 'Social Security Number',
                inputType: 'password',
                minLength: 9,
                maxLength: 9,
                mask: '#',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^\\d{9}$');
                },
                regexpMessage: function() {
                    return 'The SSN you entered does not appear to be valid.';
                }
            },
            DOB: {
                label: 'Date of Birth',
                hint: 'MMDDYYYY',
                inputType: 'tel',
                minLength: 8,
                maxLength: 8,
                mask: '#',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^\\d{8}$');
                },
                regexpMessage: function() {
                    return 'Please enter date in the format: mmddyyyy';
                }
            },
            Address1: {
                label: 'Physical Address(Line 1)',
                hint: 'Must match account records',
                inputType: 'text',
                minLength: 1,
                maxLength: 100,
                mask: '',
                notEmptyMessage: function () {
                    return this.label + ' is required.'
                },
                regexp: function() {
                    return new RegExp('^^[a-zA-Z0-9\- \']{1,100}$');
                },
                regexpMessage: function() {
                    return 'The ' + this.label + ' you entered does not appear to be valid.';
                }
            },
            City: {
                label: 'City',
                hint: 'Must match account records',
                inputType: 'text',
                minLength: 1,
                maxLength: 100,
                mask: 'l',
                notEmptyMessage: function () {
                    return this.label + ' is required.'
                },
                regexp: function() {
                    return new RegExp('^[a-zA-Z]+');
                },
                regexpMessage: function() {
                    return 'The ' + this.label + ' you entered does not appear to be valid.';
                }
            },
            State: {
                label: 'State',
                hint: '2 Letters Only - Must match account records',
                inputType: 'select',
                notEmptyMessage: function () {
                    return this.label + ' is required.'
                },
                selectOptions: [
                     {
                        value: '',
                        text: 'Please select',
                        selected: 'selected'
                    },
                    {
                        value: 'AL',
                        text: 'Alabama'
                    },
                    {
                        value: 'AK',
                        text: 'Alaska'
                    },
                    {
                        value: 'AZ',
                        text: 'Arizona'
                    },
                    {
                        value: 'AR',
                        text: 'Arkansas'
                    },
                    {
                        value: 'CA',
                        text: 'California'
                    },
                    {
                        value: 'CO',
                        text: 'Colorado'
                    },
                    {
                        value: 'CT',
                        text: 'Connecticut'
                    },
                    {
                        value: 'DE',
                        text: 'Delaware'
                    },
                    {
                        value: 'FL',
                        text: 'Florida'
                    },
                    {
                        value: 'GA',
                        text: 'Georgia'
                    },
                    {
                        value: 'HI',
                        text: 'Hawaii'
                    },
                    {
                        value: 'ID',
                        text: 'Idaho'
                    },
                    {
                        value: 'IL',
                        text: 'Illinois'
                    },
                    {
                        value: 'IN',
                        text: 'Indiana'
                    },
                    {
                        value: 'IA',
                        text: 'Iowa'
                    },
                    {
                        value: 'KS',
                        text: 'Kansas'
                    },
                    {
                        value: 'KY',
                        text: 'Kentucky'
                    },
                    {
                        value: 'LA',
                        text: 'Louisiana'
                    },
                    {
                        value: 'ME',
                        text: 'Maine'
                    },
                    {
                        value: 'MD',
                        text: 'Maryland'
                    },
                    {
                        value: 'MA',
                        text: 'Massachusetts'
                    },
                    {
                        value: 'MI',
                        text: 'Michigan'
                    },
                    {
                        value: 'MN',
                        text: 'Minnesota'
                    },
                    {
                        value: 'MS',
                        text: 'Mississippi'
                    },
                    {
                        value: 'MO',
                        text: 'Missouri'
                    },
                    {
                        value: 'MT',
                        text: 'Montana'
                    },
                    {
                        value: 'NE',
                        text: 'Nebraska'
                    },
                    {
                        value: 'NV',
                        text: 'Nevada'
                    },
                    {
                        value: 'NH',
                        text: 'New Hampshire'
                    },
                    {
                        value: 'NJ',
                        text: 'New Jersey'
                    },
                    {
                        value: 'NM',
                        text: 'New Mexico'
                    },
                    {
                        value: 'NY',
                        text: 'New York'
                    },
                    {
                        value: 'NC',
                        text: 'North Carolina'
                    },
                    {
                        value: 'ND',
                        text: 'North Dakota'
                    },
                    {
                        value: 'OH',
                        text: 'Ohio'
                    },
                    {
                        value: 'OK',
                        text: 'Oklahoma'
                    },
                    {
                        value: 'OR',
                        text: 'Oregon'
                    },
                    {
                        value: 'PA',
                        text: 'Pennsylvania'
                    },
                    {
                        value: 'RI',
                        text: 'Rhode Island'
                    },
                    {
                        value: 'SC',
                        text: 'South Carolina'
                    },
                    {
                        value: 'SD',
                        text: 'South Dakota'
                    },
                    {
                        value: 'TN',
                        text: 'Tennessee'
                    },
                    {
                        value: 'TX',
                        text: 'Texas'
                    },
                    {
                        value: 'UT',
                        text: 'Utah'
                    },
                    {
                        value: 'VT',
                        text: 'Vermont'
                    },
                    {
                        value: 'VA',
                        text: 'Virginia'
                    },
                    {
                        value: 'WA',
                        text: 'Washington'
                    },
                    {
                        value: 'WV',
                        text: 'West Virginia'
                    },
                    {
                        value: 'WI',
                        text: 'Wisconsin'
                    },
                    {
                        value: 'WY',
                        text: 'Wyoming'
                    }

                ]
            },
            ZipCode: {
                label: 'Zip Code',
                hint: '5 Digits Only - Must match account records',
                inputType: 'tel',
                minLength: 5,
                maxLength: 5,
                mask: '#',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^[0-9]{5}$');
                },
                regexpMessage: function() {
                    return 'The ' + this.label + ' you entered does not appear to be valid. Please enter it in the format: 00000';
                }
            },
            PhoneNumber: {
                label: 'Phone Number',
                hint: 'Phone Number on the account',
                inputType: 'tel',
                minLength: 10,
                maxLength: 10,
                mask: '#',
                notEmptyMessage: function () {
                    return this.label + ' is required.'
                },
                regexp: function () {
                    return new RegExp('^\\d{10}$');
                },
                regexpMessage: function () {
                    return 'The ' + this.label + ' you entered does not appear to be valid. Please enter it in the format: 0000000000';
                }
            },
            PhoneType: {
                label: 'Phone Type',
                inputType: 'select',
                notEmptyMessage: function () { return this.label + ' is required.' },
                selectOptions: [
                    {
                     value: '',
                     text: 'Please select',
                     selected: 'selected'
                     },
                     {
                     value: 'Home',
                     text: 'Home'
                     },
                     {
                     value: 'Mobile',
                     text: 'Mobile'
                     },
                     {
                     value: 'Work',
                     text: 'Work'
                     }
                ]
            },
            EmailAddress: {
                label: 'Email Address',
                inputType: 'text',
                minLength: 1,
                maxLength: 100,
                notEmptyMessage: function () {
                    return this.label + ' is required.'
                },
                regexp: function () {
                    return new RegExp('[A-Za-z0-9.]+\@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}');
                },
                regexpMessage: function () {
                    return 'The ' + this.label + ' you entered does not appear to be valid. Please enter it in the format: a@g.c';
                }
            },
            LoginID: {
                label: 'Requested Login ID',
                inputType: 'text',
                minLength: 6,
                maxLength: 20,
                mask: '',
                notEmptyMessage: function() {
                    return this.label + ' is required.';
                },
                regexp: function() {
                    return new RegExp('^[a-zA-Z0-9!@#$%^&*()\\-_+.,<>?/\\\\]{6,20}$');
                },
                regexpMessage: function() {
                    return 'Username does not meet requirements. Username cannot be your Social Security Number, must be 6-20 characters and may not contain some special characters.';
                }
            }
        }
    }]
}];

// // //
// // // Shouldn't need to change anything below here...
// // //


function submit_form(formId) {
    $('#' + formName + '_' + formId).data('formValidation').resetForm();
    $('#' + formName + '_' + formId).data('formValidation').validate();
    if ($('#submit_button_' + formName + '_' + formId).is(':disabled')) {
        return false;
    } else if ($('#' + formName + '_' + formId).data('formValidation').isValid() && !($('select[name=' + formName + '_' + formId + ']').length > 0 && $('select[name=' + formName + '_' + formId + ']').val() == '')) {
        $('#alertBox').addClass("hidden");
        $('#alertBox_security').addClass("hidden");
        var param_string = create_param_string();
        $('#submit_button_' + formName + '_' + formId).attr('disabled', 'disabled');
        $('#submit_button_' + formName + '_' + formId).html('Please wait...');
        var $frm = $("#" + formName + "_" + formId);
        var $sec_q = $('#security_questions');
        $sec_q.remove();
        $('<div>').attr({
            class: 'hidden',
            id: 'security_questions'
        }).appendTo($frm);
        var $sec_q = $('#security_questions');
        $('<input>').attr({
            id: 'FavoriteColor',
            name: 'FavoriteColor'
        }).appendTo($sec_q);
        $('<input>').attr({
            id: 'FirstCar',
            name: 'FirstCar'
        }).appendTo($sec_q);
        $('<input>').attr({
            id: 'PetsName',
            name: 'PetsName'
        }).appendTo($sec_q);
        validation_sum();
        $.ajax({
            url: formAction,
            type: $frm.attr("method"),
            data: $frm.serialize(),
            dataType: "text",
            success: function (response) {
                if (is_json(response)) {
                    process_form(true, response, formId);
                }
                else {
                    process_form(false, response, formId);
                }
            },
            error: function (xhr, details, error) {
                process_form(false, "", formId);
            }
        });
    } else {
        // form isn't valid, focus first invalid field
        if (!$('#' + formName + '_' + formId).data('formValidation').isValid()) {
            $('#' + $('#' + formName + '_' + formId).data('formValidation').getInvalidFields()[0].id).focus();
            $(document.body).animate({
                'scrollTop': $('#' + $('#' + formName + '_' + formId).data('formValidation').getInvalidFields()[0].id).prev('label').offset().top - 20
            }, 250);
            if ($('select[name=' + formName + '_' + formId + ']').length > 0 && $('select[name=' + formName + '_' + formId + ']').val() == '') {
                set_security_error(false);
            }
        } else if ($('select[name=' + formName + '_' + formId + ']').length > 0 && $('select[name=' + formName + '_' + formId + ']').val() == '') {
            set_security_error(true);
        }
    }
    return false;
}

function set_error(message) {
    $('div.modal-msg').html(message);
    $('#alertBox').removeClass("hidden");
    $(document.body).animate({
        'scrollTop': $('#alertBox').offset().top - 40
    }, 250);
}

function set_security_error(scroll) {
    $('#alertBox_security').removeClass("hidden");
    if (scroll) {
        $(document.body).animate({
            'scrollTop': $('#alertBox_security').offset().top - 20
        }, 250);
    }
}

function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function process_form(success, data, formId) {
    //console.log(success);
    //console.log(data);
    if (success) {
        var json = $.parseJSON(data);
        if (json.result == 'success') {
            // clears all inputs on success
            $(':input').val('');

            // brings in default values populated at top of this file
            $('#modal-title').html(modalTitle);
            $('#modal-title').attr('class', modalIcon);
            $("#success_message").html(json.data.message);
            $('#modal-body').html(modalBody);
            $('#modal-footer').html(modalFooter);
            $("#q2online").prop('action', login_page_url);

            // populates login area
            // not sure what this next line was doing (WR)
            //$("#click_here").html(json.data.clickhere);
            $("#login_id").html(json.data.loginid);
            $("#password").html("_____");
            $("#olb-user").val(json.data.loginid);
            $("#olb-pass").val("_____");
            $("#uux-user").val(json.data.loginid);
            $("#uux-pass").val("_____");
            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $('#myModal').on('hide.bs.modal', function (e) {
                e.preventDefault();
            });
            $('#submit_button_' + formName + '_' + formId).attr('disabled', '');
            $('#submit_button_' + formName + '_' + formId).html('Continue');
        } else if (json.result == 'partial') {
            // clears all inputs on success
            $(':input').val('');

            $('#modal-title').html('You may already be enrolled!');
            $('#modal-title').attr('class', 'icon-exclamation-sign');
            $("#success_message").hide();
            $('#modal-body').html('Our records indicate a Login ID already exists for you.<br/><br/>Please try logging in or if you believe this is an error, please contact Customer Support at 844.226.5421 for assistance.');
            $('#modal-footer').html('<a href="' + redirect_url + '" class="btn btn-primary" target="_top">Go to log in</a>');

            $('#myModal').modal({backdrop: 'static', keyboard: false});
            $('#submit_button_' + formName + '_' + formId).attr('disabled', '');
            $('#submit_button_' + formName + '_' + formId).html('Continue');
        }
        else if (json.result == 'error_fields') {
            set_error(json.data.message);
            if (json.data.field_name == 'LoginID') {
                //$( 'input[name!='+ json.data.field_name + '][type!="hidden"]').prop('disabled',true).attr('type','password');
                $('.form-group, .line , .groupHeading, ul, #account-list-area, .pull-right:has(a), select,input[name="token"]').not($('.form-group:has(#valrt_' + json.data.field_name + ')')).remove();
                $('<input/>', {name: 'token', 'value': json.data.cache_token, type: 'hidden'}).appendTo($('#' + formName + '_' + formId));
                $('#submit_button_' + formName + '_' + formId).html('Continue');
            }
            setTimeout(function () {
                location.reload();
            }, json.data.cache_time);
        }
        else {
            set_error(json.data.message);
            //$('#submit_button_' + formName + '_' + formId).removeAttr('disabled');
            $('#submit_button_' + formName + '_' + formId).html('Continue');
        }
    }
    else {
        set_error(generic_error_message);
        //$('#submit_button_' + formName + '_' + formId).removeAttr('disabled');
        $('#submit_button_' + formName + '_' + formId).html('Continue');
    }
}

function create_param_string() {
    var param_string = "";
    $("input[id^='valrt_']").each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        name = name.replace("valrt_", "");
        param_string += "&" + name + "=" + value;
    });
    $("input[id^='valcm_']").each(function () {
        var name = $(this).attr('name');
        var value = $(this).val();
        name = name.replace("valcm_", "");
        param_string += "&" + name + "=" + value;
    });
    return param_string;
}

function validation_sum() {

    var pin1 = Math.floor(Math.random() * 100) + 9;
    var pin2 = Math.floor(Math.random() * 100) + 4;
    var pin3 = pin1 + pin2;
    $('#FavoriteColor').attr('value', pin1);
    $('#FirstCar').attr('value', pin2);
    $('#PetsName').attr('value', pin3);
}