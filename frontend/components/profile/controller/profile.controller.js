restaurantangular.controller('profileCtrl', function ($scope,$rootScope) {
    $scope.tab = 1;

    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
    };

    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };
});


// $(document).ready(function () {
//     function getCountries() {
//         $.ajax({
//             url: 'resources/ListOfCountryNamesByName.json',
//             type: 'GET',
//             mimeType: 'application/json',
//             success: function(data){
//                 console.log(data);
//             }
//         })
//     }
//     getCountries();
//     var user;
//     function getUser() {
//         $.ajax({
//             url: 'components/login/controller/controller_login.php?op=checklogin',
//             type: 'GET',
//             async: false,
//             success: function(data){
//                 data = JSON.parse(data);
//                 // console.log(data);
//                 user = data;
//             },
//             error: function(data){
//                 console.log(data);
//             }
//         });
//     }
    
//     function removeFile(file) {
//         var name = file.name;
//         // console.log(name);
//         $.ajax({
//             type: "POST",
//             url: "module/profile/controller/controller_profile.class.php?delete=true",
//             data: "filename=" + name,
//             success: function (data) {
//                 console.log(data);
//                 $("#progress").hide();
//                 $('.msg').text('').removeClass('msg_ok');
//                 $('.msg').text('').removeClass('msg_error');
//                 $("#e_avatar").html("");
//                 ok_flag = false;
//                 var element2;
//                 if ((element2 = file.previewElement) !== null) {
//                     element2.parentNode.removeChild(file.previewElement);
//                 } else {
//                         return false;
//                 }
//             }
//         });
//     }
//     getUser();
//     // console.log(user);

//     $('#usernameprofile').html(user.username);
//     $('#imgprofile').attr('src',user.avatar);
//     $('#usernameprofile2').val(user.username);
//     $('#emailprofile').val(user.email);
//     $('#telephoneprofile').val(user.telephone);
//     $('#locationprofile').val(user.location);
//     var imgname = user.avatar;

//     $('#logged-in-name').on('click',function(){
//         window.location.href = 'index.php?module=profile&view=profile';
//     });
    
//     var ok_flag = false;
//     $("#dropzone").dropzone({
//         url: "module/profile/controller/controller_profile.class.php?upload=true",
//         addRemoveLinks: true,
//         maxFileSize: 1000,
//         dictResponseError: "An error has occurred on the server",
//         acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF',
//         init: function () {
//             this.on("success", function (file, response) {
                
//                 response = JSON.parse(response);
//                 //alert(response);
//                 $("#progress").show();
//                 $("#bar").width('100%');
//                 $("#percent").html('100%');
//                 $('.msg').text('').removeClass('msg_error');
//                 $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right': '300px' }, 300);
//                 // console.log(file.name);
//                 // console.log(response);
//                 if (response['result']) {
//                     ok_flag = true;
//                     imgname = response['data'].slice(15);
//                     console.log(imgname);             
//                 } else {
//                     console.log(response['error']);
//                     $('#errormsg').html(response['error']);
//                 }
//             });
//         },
//         complete: function (file) {
//             if((file.status == "success") && (ok_flag)){
//                 console.log("file changed");
//                 // console.log(file);
//             }
//         },
//         error: function (file) {
//             alert("Error subiendo el archivo " + file.name);
//             console.log(file);
//         },
//         removedfile: function (file, serverFileName) {
//             removeFile(file);
//             $('#errormsg').html('');
//         }
//     });

//     $('#profilesave').on('click',function(){

//         var username = $('#usernameprofile2').val();
//         var email = $('#emailprofile').val();
//         var telephone = $('#telephoneprofile').val();
//         var location = $('#locationprofile').val();

//         var query = {
//             "username":username,
//             "email":email,
//             "avatar":imgname,
//             "telephone":telephone,
//             "location":location
//         };

//         console.log(query);
//         // $.ajax({
//         //     url: 'module/profile/model/profile.php?id='+user.id,
//         //     type: 'PUT',
//         //     data: query,
//         //     success: function(data){
//         //         data = JSON.parse(data);
//         //         console.log(data);
//         //         window.location.href = 'index.php?module=profile&view=profile';
//         //     },
//         //     error: function(data){
//         //         console.log(data);                
//         //     }
//         // });
//     });
// });