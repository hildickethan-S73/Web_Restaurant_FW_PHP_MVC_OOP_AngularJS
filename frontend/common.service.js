restaurantangular.factory("CommonService", ['services','$uibModal', function (services,$uibModal) {
  var service = {};
  service.openModal = openModal;
  return service;

  function openModal(chip,modul,funct) {
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: 'frontend/modules/adoptions/view/detModal.view.html',
        controller: 'detailsCtrl',
        windowClass : 'show',
        size: "lg",
        resolve: {
                   dog: function (services, $route) {
                        return services.get(modul, funct, chip);
                    }
                }
    });
  }
  
}]);
