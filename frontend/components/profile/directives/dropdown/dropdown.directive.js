restaurantangular.directive('dropdown',function(){
    return {
      restrict : 'E',
      templateUrl : 'frontend/components/profile/directives/dropdown/templates/dropdown.html',
      scope : {
        model : "=",
        dependentField : "="
      },
      controller : 'DropdownCtrl'
    }
  });