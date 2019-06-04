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
        
        updateProfile(extension,data,$scope.filename);
    };
    
    function updateProfile(extension,data,filename) {
        services.put('login',data,extension).then(function(response){
            console.log(response);
            if (response){
                $rootScope.user.avatar = filename;
                userdata.user.avatar = filename;
            } else {
                console.log(response);
            }
        });
    }
});