restaurantangular.factory("searchdata", [function () {
  return {
    search: {
      searchname: "",
      searchtastes: "",
      searchtype: "Type"
    }
  }
}]);

restaurantangular.factory("CommonService", ['$uibModal',function ($uibModal) {
  var service = {};
  service.openModal = openModal;
  return service;

  function openModal() {
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: 'frontend/components/login/view/login.view.html',
        controller: 'loginCtrl',
        windowClass : 'show',
        size: "lg"
        // ,
        // resolve: {
        //            dog: function (services, $route) {
        //                 return services.get(modul, funct, chip);
        //             }
        //         }
    });
  }
}]);
