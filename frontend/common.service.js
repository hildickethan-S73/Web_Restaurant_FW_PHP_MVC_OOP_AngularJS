/**
  * @ngdoc service
  * @name restaurantangular.searchdata
  * 
  * @description
  * Saves the search data in the service
**/
restaurantangular.factory("searchdata", [function () {
  return {
    search: {
      searchname: "",
      searchtastes: "",
      searchtype: "Type"
    }
  }
}]);

/**
  * @ngdoc service
  * @name restaurantangular.CommonService
  * 
  * @description
  * Opens a modal
**/
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
    });
  }
}]);
