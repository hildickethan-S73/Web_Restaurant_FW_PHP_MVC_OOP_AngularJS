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
                filename = 'backend/'+filename;
                console.log(filename);
                console.log(userdata.user);
                
                // use clientside service data for faster loading if the page hasnt been refreshed
                if (Object.keys(userdata.user).length > 0){
                    // console.log('js');
                    var extension = `username-${userdata.user.username}`;
                    var data = {
                        avatar: filename,
                        token: userdata.user.token
                    };
                    updateAvatar(extension,data,filename);
                } else {
                    // console.log('php');
                    services.getF('login','check').then(function(response){
                        // console.log(response);
                        var extension = `username-${response.username}`;
                        var data = {
                            avatar: filename,
                            token: response.token
                        };
                        updateAvatar(extension,data,filename);
                    });
                }
            }
          }
        }
    };

    function updateAvatar(extension,data,filename) {
        services.put('login',data,extension).then(function(response){
            console.log(response);
            if (response){
                $rootScope.user.avatar = filename;
                // userdata.user.avatar = filename;
            } else {
                console.log(response);
            }
        });
    }
});