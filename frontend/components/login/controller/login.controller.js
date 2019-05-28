restaurantangular.controller('loginCtrl', function ($scope,services,toastr,userdata,$rootScope,$uibModalInstance) {
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

    $scope.recoverPWForm = function(event) {
        var pwform = event.target.parentNode.parentNode.parentNode.children[2];
        var current = event.target.parentNode.parentNode;
        current.style.display = "none";
        pwform.style.display = "block";
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
                                toastr.success('Registered, check your email to activate your account', 'Success',{
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
        if ($scope.loginF.password != undefined && $scope.loginF.username != undefined){
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
                        if (response['id']){
                            // service for faster client loading if no refresh
                            userdata.user=response;

                            // contact with menu controller
                            $rootScope.loggedin = true;
                            $rootScope.user = userdata.user;
                            localStorage.setItem('token',userdata.user.token);

                            // close modal
                            $uibModalInstance.dismiss('cancel');

                            toastr.success('Logged in', 'Success',{
                                closeButton: true
                            });
                        }
                        break;
                }
            });
        } else {
            toastr.error('Missing username or password', 'Error',{
                closeButton: true
            });
        }
    };
    $scope.send = function() {
        // thisneedspropervalidation@aaaa.com
        services.get('login',`email-${$scope.pwF.email}`).then(function(response){
            if (response.length > 0){
                $scope.pwF.username = response[0].username;
                services.postF('login',$scope.pwF,'recoverPW').then(function(response){
                    console.log(response);
                    toastr.success("You can recover your password with the link in the email we sent you.","Recovery");
                    $uibModalInstance.dismiss('cancel');
                });
            } else {
                toastr.error("Email doesn't exist in our database","Error");
            }
        });
    };
});

restaurantangular.controller('activationCtrl', function (services,toastr,activation,$route) {
    activation = JSON.parse(activation);
    if (activation === true) {
        toastr.success("Your account has been activated succesfully.","Enjoy!");
    } else {
        if (activation == 'Expired token'){
            toastr.error("Token expired","Error");
            services.get('login','username-'+$route.current.params.username).then(function(response){
                var data = {
                    "username" : response[0].username, 
                    "email" : response[0].email
                };
                // console.log(data);
                services.postF('login',data,'sendemail').then(function(response){
                    console.log(response);
                    toastr.success("Resending validation email","Notification");
                });
            });
        } else if (activation == 'Username mismatch with token') {
            toastr.error(activation,"Error");
        } else {
            toastr.error("Something went wrong.","Error");
        }
    }
    location.href='#/';    
});

restaurantangular.controller('recoverPWCtrl', function ($scope,services,toastr,$route) {
    $scope.submitPW = function() {
        if ($scope.PW.newPW == $scope.PW.newPW2) {
            var data = {
                "password":$scope.PW.newPW,
                "token":$route.current.params.token
            };
            services.get('login',`email-${$route.current.params.email}`).then(function(response){
                if (response.length > 0){
                    services.put('login',data,`username-${response[0].username}`).then(function(response){
                        response = JSON.parse(response);
                        console.log(response);
                        if (response === true){
                            toastr.success("Password changed","Notification");
                            location.href='#/';
                        } else {
                            toastr.error(response,"Error");
                        }
                    });
                } else {
                    toastr.error("Email doesn't exist in our DB","Error");
                }
            });
        } else {
            console.log('passwords dont match');
            toastr.error("passwords dont match","Error");
        }
    };
});