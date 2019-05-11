restaurantangular.directive('shopRestaurants', function() {
    var controller = ['$scope', 'services', function($scope,services) {
        services.get('restaurants').then(function(response){
            $scope.restaurants = response;
            $scope.numPerPage = 3;
            $scope.currentPage = 1;
          
            $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
            $scope.pageChanged = function() {
                var startPos = ($scope.currentPage - 1) * 3;
                $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
            };
        });
    }];


    var template = `<div class="container">
    <p> Total Results: {{restaurants.length}} <p>
    <div class="row">
        <div ng-repeat="r in filteredRestaurants" class="col-md-4 feature">
                <a href="#/shop/{{r.id}}"><img src="frontend/assets/img/restaurant1.jpg" alt="#"></a>
                <h4>{{r.name}}</h4>
        </div>
    </div>
    <div id="pager">
        <!-- requires ui.bootstrap imported in app.js -->
        <uib-pagination
            class="pagination" 
            total-items="restaurants.length" 
            ng-model="currentPage"
            ng-change="pageChanged()" 
            previous-text="&lsaquo;" 
            next-text="&rsaquo;" 
            items-per-page="numPerPage"
        />
    </div>
</div>`;

    return {
        restrict: 'EA', //Default in 1.3+
        controller: controller,
        template: template
    };
});