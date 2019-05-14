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

  function openModal(html,ctrl) {
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: html,
        controller: ctrl,
        windowClass : 'show'
        // ,
        // resolve: {
        //            dog: function (services, $route) {
        //                 return services.get(modul, funct, chip);
        //             }
        //         }
    });
  }
}]);
