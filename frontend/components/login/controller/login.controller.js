/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:loginCtrl
  *
  * @description
  * Controller for the login and register functions
*/
restaurantangular.controller('loginCtrl', function ($scope,services,toastr,userdata,$rootScope,$uibModalInstance) {
    /**
      * @ngdoc method
      * @name login#changeForm
      *
      * @methodOf
      * restaurantangular.controller:loginCtrl
      *
      * @description
      * Changes the register form the the login
      * and vice versa
      * 
      * @param {object} event current modal
    */
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

    /**
      * @ngdoc method
      * @name login#recoverPWForm
      *
      * @methodOf
      * restaurantangular.controller:loginCtrl
      *
      * @description
      * Closes other modal and shows
      * the recover password one
      * 
      * @param {object} event current modal
    */
    $scope.recoverPWForm = function(event) {
        var pwform = event.target.parentNode.parentNode.parentNode.children[2];
        var current = event.target.parentNode.parentNode;
        current.style.display = "none";
        pwform.style.display = "block";
    };

    /**
      * @ngdoc method
      * @name login#register
      *
      * @methodOf
      * restaurantangular.controller:loginCtrl
      *
      * @description
      * Registers the user
      * - Sets the default avatar to save in DB
      * - Checks if email is taken
      * - Checks if name is taken
      * - Registers
    */
    $scope.register = function() {
        $scope.registerF.avatar = `https://api.adorable.io/avatars/256/${$scope.registerF.username}`;
        services.get('login',`email-${$scope.registerF.email}`).then(function (response){
            if(!response[0]){
                services.get('login',`username-${$scope.registerF.username}`).then(function (response){
                    if(!response[0]){
                        services.postF('login',$scope.registerF,'register').then(function (response){
                            console.log(response);
                            if (response){
                                toastr.success('Registered, check your email to activate your account', 'Success',{
                                    closeButton: true
                                });
                                // close modal
                                $uibModalInstance.dismiss('cancel');
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

    /**
      * @ngdoc method
      * @name login#login
      *
      * @methodOf
      * restaurantangular.controller:loginCtrl
      *
      * @description
      * Logs the user in
      * - Checks credentials (through GET? wtf?)
      * - Sets token in localStorage if logged in
    */
    $scope.login = function() {
        if ($scope.loginF.password != undefined && $scope.loginF.username != undefined){
            // change this get to a post so the password isnt in the url
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
                            if (response.admin == 1){
                                $rootScope.admin = true;
                            } else {
                                $rootScope.admin = false;
                            }
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

    /**
      * @ngdoc method
      * @name login#send
      *
      * @methodOf
      * restaurantangular.controller:loginCtrl
      *
      * @description
      * Sends the password recovery email to the user
      * - Checks if the email exists
      * - Sends email
    */
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

/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:activationCtrl
  *
  * @description
  * Controller for account activation
*/
restaurantangular.controller('activationCtrl', function (services,toastr,activation,$route) {
    // The PHP PUT request is done in app.js
    activation = JSON.parse(activation);
    if (activation === true) {
        toastr.success("Your account has been activated succesfully.","Enjoy!");
    } else {
        // If token is expired, sends another email
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

/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:recoverPWCtrl
  *
  * @description
  * Controller for password recovery
*/
restaurantangular.controller('recoverPWCtrl', function ($scope,services,toastr,$route) {

    /**
      * @ngdoc method
      * @name recoverPWCtrl#submitPW
      *
      * @methodOf
      * restaurantangular.controller:recoverPWCtrl
      *
      * @description
      * Submits the new password
      * - Checks if passwords are the same
      * - Uses email to get the users username
      * - Uses username and token to update password
    */
    $scope.submitPW = function() {
        if ($scope.PW.newPW == $scope.PW.newPW2) {
            var data = {
                "password":$scope.PW.newPW,
                "token":$route.current.params.token
            };
            services.get('login',`email-${$route.current.params.email}`).then(function(response){
                if (response.length > 0){
                    services.put('login',data,`username-${response[0].username}`).then(function(response){
                        // response = JSON.parse(response);
                        console.log(response);
                        if (response == 'true'){
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
            toastr.error("Passwords don\'t match","Error");
        }
    };
});