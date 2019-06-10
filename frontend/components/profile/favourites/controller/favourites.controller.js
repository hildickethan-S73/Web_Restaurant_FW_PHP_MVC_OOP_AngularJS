restaurantangular.controller('favCtrl', function ($scope,$rootScope,services,userdata,toastr) {
    // TAB 2, FAVOURITES
    ///////////////////////////////////
    services.get('favourites',`uid-${userdata.user.id}`).then(function(response){
        $scope.restaurants = response;
        $scope.numPerPage = 3;
        $scope.currentPage = 1;
    
        calcPages();
        
    });

    $scope.unlike = function(r,index) {        
        services.delete('favourites',`uid-${userdata.user.id}/rid-${r.rid}`).then(function(response){
            console.log(response);
            $scope.restaurants.splice(index,1);
            calcPages();
        });
    }

    function calcPages() {
        $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
        $scope.pageChanged = function() {
            var startPos = ($scope.currentPage - 1) * 3;
            $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
        };
    }
});