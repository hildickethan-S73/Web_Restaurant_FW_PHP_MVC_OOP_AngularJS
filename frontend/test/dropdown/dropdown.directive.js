restaurantangular.directive('dropdown',function(){
    return {
      restrict : 'E',
      templateUrl : 'frontend/components/profile/directives/dropdown/templates/dropdown.html',
      scope : {
        model : "=",
        dependentField : "="
      },
      controller : 'DropdownCtrl',
      link: function($scope, element, attrs) {
        console.log('directive linked!');
      }
    }
  });