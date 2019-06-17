/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:contactCtrl
  *
  * @description
  * Controller for the contact page
*/
restaurantangular.controller('contactCtrl', function($scope,services,toastr){
	$scope.contact = {
        inputName: "",
        inputEmail: "",
        inputSubject: "",
        inputMessage: ""
    };
    

    /**
      * @ngdoc method
      * @name contactCtrl#SubmitContact
      *
      * @methodOf
      * restaurantangular.controller:contactCtrl
      *
      * @description
      * Submits the contact form as an email to the admin
    */
    $scope.SubmitContact = function () {
        var data = {
            "name": $scope.contact.inputName, 
            "email": $scope.contact.inputEmail, 
            "subject": $scope.contact.inputSubject, 
            "message": $scope.contact.inputMessage
        };

        services.postF('contact',JSON.stringify(data),'email').then(function (response) {
            console.log(response);
            if (response) {
                    toastr.success('Your message has been sent', 'Success!',{
                    closeButton: true
                });
            } else {
                    toastr.error('Your message has not been sent', 'Error',{
                    closeButton: true
                });
            }
        });
    };
});




// function initMap() {    
//     var ontinyent = {lat: 38.8220593, lng: -0.6063927};

//     var map = new google.maps.Map(document.getElementById('map'), {
//         center: ontinyent,
//         zoom: 14
//     });

//     var contentString = 
//     '<div id="content">'+
//         '<div id="siteNotice">'+
//         '</div>'+
//         '<h3 id="firstHeading" class="firstHeading">Ontinyent</h3>'+
//         '<br/>'+
//         '<div id="bodyContent">'+
//             '<p>Ontinyent is a municipality in the comarca of Vall d\'Albaida in the Valencian Community, Spain.'+
//             'It is situated on the right bank of the Clariano or Ontinyent, a tributary of the Xúquer,'+
//             'and on the Xàtiva–Alcoi railway.</p>'+
//         '</div>'+
//     '</div>';

//     var infowindow = new google.maps.InfoWindow({
//         content: contentString
//     });

//     var marker = new google.maps.Marker({
//         position: ontinyent,
//         map: map,
//         title: 'Ontinyent'
//     });
//     marker.addListener('click', function() {
//         infowindow.open(map, marker);
//     });
// }