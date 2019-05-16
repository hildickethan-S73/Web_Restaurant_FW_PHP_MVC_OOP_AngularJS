restaurantangular.controller('loginCtrl', function ($scope,services,toastr) {
    $scope.changeForm = function(event) {
        // cringe
        var current = event.target.parentNode.parentNode;
        var register = event.target.parentNode.parentNode.parentNode.children[0];
        current.style.display = "none";
        (current == register) ? current.parentNode.children[1].style.display = "block" : register.style.display = "block";
        // if (current == register)
        //     current.parentNode.children[1].style.display = "block";
        // else 
        //     register.style.display = "block";
    };

    $scope.register = function() {
        $scope.registerF.avatar = `https://api.adorable.io/avatars/256/${$scope.registerF.username}`;
        services.get('login',`request-true/email-${$scope.registerF.email}`).then(function (response){
            if(!response[0]){
                services.get('login',`request-true/username-${$scope.registerF.username}`).then(function (response){
                    if(!response[0]){
                        services.postF('login',$scope.registerF,'register').then(function (response){
                            console.log(response);
                            if (response){
                                toastr.success('Registered', 'Success',{
                                    closeButton: true
                                });
                            }
                        });
                    } else {
                        toastr.error('Username already exists', 'Error',{
                            closeButton: true
                        });
                    }
                });
            } else {
                toastr.error('Email already exists', 'Error',{
                    closeButton: true
                });
            }
        });
    };
    $scope.login = function() {
        if ($scope.loginF.password == undefined) 
            $scope.loginF.password = 1;
        if ($scope.loginF.username == undefined) 
            $scope.loginF.username = 1;
        services.get('login',`login-true/username-${$scope.loginF.username}/password-${$scope.loginF.password}`).then(function (response){
            switch (response) {
                case 'badpw':
                    toastr.error('Incorrect password', 'Error',{
                        closeButton: true
                    });
                    break;
                case 'nouser':
                    toastr.error('User doesn\'t exist', 'Error',{
                        closeButton: true
                    });
                    break;
                default:
                    console.log(response);
                    break;
            }
        });
    };
});


// JQUERY
/*
$(function () {    
    ////////////////////////////////////////////////
    // display and hide
    ////////////////////////////////////////////////

    $('#loginbutton').on('click', function(){
        $('#login-block').fadeIn(300);
    });

    
    $('#login-block, #password-block').on('click', function(event){
        if (event.target == this)
            $('#login-block, #password-block').fadeOut(300);
    });

    $('#reg, #signin').on('click', function(){
        $('#login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('#register-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

    $('#lostpw').on('click', function(){
        $('#password-block').fadeIn(300);
    });

    ////////////////////////////////////////////////
    // validation
    ////////////////////////////////////////////////

    function basic_validate(name) {
        if (name.length > 0) {
            var regexp = /^([a-zA-Z0-9]{4,16})$/;
            return regexp.test(name);
        }
        return false;
    }

    function email_validate(email) {
        if (email.length > 0) {
            var regexp = /^([a-zA-Z0-9]{2,20}@[a-zA-Z]{2,12}\.[a-z]{2,3})$/; // very basic email check
            return regexp.test(email);
        }
        return false;
    }
    

    function validate_form(form, origin) {
        var result = true;
        // console.log(form);

        $.each(form, function(index){
            if (index == 3){ //email
                if (!email_validate(form[index].value)) {
                    document.getElementById(form[index].name).classList.add('is-not-valid');
                    result = false;
                } else
                    document.getElementById(form[index].name).classList.remove('is-not-valid');
            } else {
                if (!basic_validate(form[index].value)) {
                    document.getElementById(form[index].name).classList.add('is-not-valid');
                    result = false;
                } else
                    document.getElementById(form[index].name).classList.remove('is-not-valid');
            }
        });
        if (origin == "register"){
            // password match
            if (result){ //if everything is still valid
                if (form[1].value == form[2].value)
                    result = true;
                else{
                    document.getElementById(form[2].name).classList.add('is-not-valid');
                    result = false;                
                }
            }
        }
        return result;
    }

    ////////////////////////////////////////////////
    // register
    ////////////////////////////////////////////////

    $('#usernameregister,#passwordregister,#password2register,#emailregister').on('keyup', function(e){
        //e.keyCode == 13
        if (e.key === "Enter"){
            register();
        }
    });

    $('#registerbutton').on('click', function(){
           register();
    });

    function register(){
        var form = $('#register-form').serializeArray();
        // validate_form(form, 'register')
        if (true){
            form.push({"name":"avatar", "value": `https://api.adorable.io/avatars/256/${form[0].value}`});
            var object = {};
            $.each(form, function (name, value) {
                var cut = value['name'].replace('register','');
                object = Object.assign({[cut]: value['value']},object);
            });

            //check email
            $.ajax({
                url: `api/login/email-${object['email']}`,
                type: 'GET',
                success: function(data){
                    data = JSON.parse(data);
                    if(data == ''){
                        document.getElementById('emailregister').classList.remove('is-not-valid');
                        //check name
                        $.ajax({
                            url: `api/login/username-${object['username']}`,
                            type: 'GET',
                            success: function(data){
                                data = JSON.parse(data);
                                if(data == ''){
                                    document.getElementById('usernameregister').classList.remove('is-not-valid');
                                    // actually register
                                    $.ajax({
                                        url: "api/login/register-true",
                                        data: {'data': object},
                                        type: 'POST',
                                        success: function(data){
                                            // data = JSON.parse(data);
                                            if (data){
                                                alert('Account registered, please login');
                                                window.location.href = 'home';
                                            }
                                            // $('#login-block').fadeOut(300);
                                            // $('#header-btns').hide();
                                            // $("#logged-in-avatar").attr("src",form[4].value);
                                            // $('#logged-in').show();
                                        }
                                    });
                                } else {
                                    alert('Username already exists');
                                    document.getElementById('usernameregister').classList.add('is-not-valid');
                                }
                                
                            }
                        });
                    } else {
                        alert('Email already exists');
                        document.getElementById('emailregister').classList.add('is-not-valid');
                    }
                }
            });
        }     
    }

    ////////////////////////////////////////////////
    // login
    ////////////////////////////////////////////////
    
    $('#usernamelogin,#passwordlogin').on('keyup', function(e){
        if (e.key === "Enter"){
            login();
        }
    });

    $('#loginformbutton').on('click', function(){
        login();
    });

    $('#logged-in-avatar').on('click', function(){
        logout();
    });

    function checkLogin(){
        $.ajax({
            url: "api/login/check-true",
            type: 'GET',
            success: function(data){
                data = JSON.parse(data);
                $('#restaurants').hide();
                $('#favourites').hide();
                $('#logged-in').hide();
                // console.log(data)
                if (data != 'notlogged'){
                    $('#logged-in-avatar').attr('src',data[0]['avatar']);
                    $('#logged-in-name').html(data[0]['username']);

                    if (Boolean(+data[0]['admin'])){
                        $('#restaurants').show();
                    }

                    $('#favourites').show();
                    $('#logged-in').show();

                    $('#header-btns').hide();                    
                }
            }
        });
    }

    function login(){
        var form = $('#login-form').serializeArray();
        
        if(validate_form(form, 'login')){
            $.ajax({
                url: `api/login/login-true/username-${form[0].value}/password-${form[1].value}`,
                type: 'GET',
                success: function(data){
                    // console.log(data);
                    if (!data){
                        window.location.href = "home";
                    }else {
                        if (data == "nouser"){
                            document.getElementById('usernamelogin').classList.add('is-not-valid');
                            document.getElementById('passwordlogin').classList.remove('is-not-valid');
                        } else if (data == "badpw"){
                            document.getElementById('usernamelogin').classList.remove('is-not-valid');
                            document.getElementById('passwordlogin').classList.add('is-not-valid');
                        }

                    }
                    
                }
            });
        }
    }

    function logout(){
        $.ajax({
            url: "api/login/logout-true",
            type: 'DELETE',
            success: function(){
                window.location.href = "home";
            }
        });
    }

    ////////////////////////////////////////////////
    // on load
    ////////////////////////////////////////////////

    checkLogin();

    // check activity every 60s
    setInterval(function(){
		$.ajax({
			type : 'GET',
			url  : 'api/login/activity-true',
			success :  function(response){	
                // console.log(Boolean(+response));				
				if(Boolean(+response)){
					logout();
				}
			}
		});
    }, 60000); //milliseconds
    
    ////////////////////////////////////////////////
    // recover password
    ////////////////////////////////////////////////

    $('#emaillostpw').on('keyup', function(e){
        if (e.key === "Enter"){
            send_recovery_email();
        }
    });

    $('#lostpwbutton').on('click', function(){
        send_recovery_email();
    });

    function send_recovery_email(){
        var email = $('#emaillostpw').val();

        if (email_validate(email)){
            document.getElementById('emaillostpw').classList.remove('is-not-valid');
            $.ajax({
                url: 'api/login/email-true',
                type: 'POST',
                data: {'email':email},
                success: function(data){
                    console.log(data);
                }
            });
        } else {
            document.getElementById('emaillostpw').classList.add('is-not-valid');
        }
    }
});
*/