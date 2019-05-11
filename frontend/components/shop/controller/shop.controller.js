restaurantangular.controller('shopCtrl', function($scope,restaurants,services){
    $scope.restaurants = restaurants;
    $scope.numPerPage = 3;
    $scope.currentPage = 1;

    $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
    $scope.pageChanged = function() {
        var startPos = ($scope.currentPage - 1) * 3;
        $scope.filteredRestaurants = $scope.restaurants.slice(startPos, startPos + 3);
    };
    
    
    $scope.search = {
        inputName: "",
        inputType: "",
        inputTastes: ""
    };
    $scope.search = function() {
        var data = {
            "name": $scope.search.inputName, 
            "tastes": $scope.search.inputTastes, 
            "type": $scope.search.inputType
        };
        var extension = buildURL(data,'search');
        services.get('restaurants', extension).then(function (response) {
            $scope.restaurants = response;
            $scope.filteredRestaurants = $scope.restaurants.slice(0, 3);
        });
    };
    
});

restaurantangular.controller('detailsCtrl', function($scope,data,services){
    $scope.data = data[0];
});

function buildURL(array,func){
    var url = "";
    switch (func) {
        case 'autocomplete':
            url += 'limit-6/';
            url += `${array['field']}-!${array['name']}!/`;
            if (array['type'] != "Type")
                url += `type-${array['type']}/`;
            break;
        
        case 'search':
            for (const field in array) {
                if (array.hasOwnProperty(field)) {
                    const value = array[field];
                    if (value != undefined && value != 'Type')
                        url += `${field}-${value}/`;
                }
            }
            break;
    
        default:
            break;
    }
    return url;
}