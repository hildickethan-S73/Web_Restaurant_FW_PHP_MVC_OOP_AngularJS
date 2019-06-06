restaurantangular.controller('profileCtrl', function ($scope,$rootScope,services,userdata,toastr) {
    $scope.tab = 1;

    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };

    $scope.dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
          'url': 'backend/api/profile/upload-true',
          addRemoveLinks: true,
          acceptedFiles: 'image/*,.jpeg,.jpg,.png'
        },
        'eventHandlers': {
            'sending': function (file, xhr, formData) {
            //   console.log('sending');
            },
            'success': function (file, response) {
                response = JSON.parse(response);
                if (!response.result) {
                    toastr.error(response.error,"Error");
                } else {
                    var filename = response.data.substring(19);
                    $scope.$apply(function(){
                        $scope.filename = 'backend/'+filename;
                    });
                    // console.log(userdata.user);
                    console.log($scope.filename);
                }
            },
            'removedfile': function (file, serverFilename) {
                services.deleteF('profile','avatar').then(function(response){
                    console.log(response);
                    delete $scope.filename;
                });
            }
        }
    };

    
    $scope.update = function() {
        var extension = `username-${userdata.user.username}`;
        var data = {
            token: userdata.user.token
        };
        angular.forEach($scope.profileF, function(value, key) {
            if (value == ""){
                delete data[key];
            } else if (key != 'password2'){
                data[key] = value;
            } 
        });
        if ($scope.filename){
            data.avatar = $scope.filename;
        }

        updateProfile(extension,data);
    };

    services.getResource('countries.json').then(function(response){
        angular.extend($scope,{
            country : {
                label : 'Country',
                values : response,
                value : null
            },
            state : {
                label : 'State',
                values : [],
                value : null
            }
        });
    });

    
    function updateProfile(extension,data) {
        services.put('login',data,extension).then(function(response){
            // response = JSON.parse(response);
            console.log(response);
            if (response['token']){
                localStorage.setItem('token',response['token']);
                angular.forEach(data, function(value, key) {
                    if (key == 'avatar') {
                        $rootScope.user[key] = $scope.filename;
                        userdata.user[key] = $scope.filename;
                    } else if (key == 'token') {
                        $rootScope.user[key] = response['token'];
                        userdata.user[key] = response['token'];
                    } else {
                        $rootScope.user[key] = value;
                        userdata.user[key] = value;
                    }
                });
            } else {
                if (response == '"Expired token"'){
                    toastr.error('Expired token, please log back in', 'Error');
                    services.deleteF('login','logout').then(function(response){
                        if(response == "success"){
                            $rootScope.loggedin=false;
                            userdata = "";
                            localStorage.removeItem('token');
                            location.href = "#/";
                        }
                    });
                }
            }
        });
    }
});