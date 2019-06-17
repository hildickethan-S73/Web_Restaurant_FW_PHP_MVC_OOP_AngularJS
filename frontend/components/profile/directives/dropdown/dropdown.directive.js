/**
  * @ngdoc directive
  * @name dropdown.directive:restaurantangular.directive'dropdown', 
  * @restrict 'E'
  * @element ANY
  * @scope
  * model: "="
  * dependentField: "="
  * @description
  * Directive for dependant dropdowns
  *
  * 
  * 
  * @example
  * <dropdown model="country" dependent-field="state"></dropdown>
**/
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