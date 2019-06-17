/**
  * @this vm
  * @ngdoc controller
  * @name restaurantangular.controller:favCtrl
  *
  * @description
  * Controller for favourites
*/
restaurantangular.controller('favCtrl', function ($scope,$rootScope,services,userdata) {

    /**
      * @ngdoc method
      * @name favCtrl#load
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Loads the users favourites and paginates them
      * - Called in the My favourites tab
    */
    $scope.load = function() {
        services.get('favourites',`uid-${userdata.user.id}`).then(function(response){
            $scope.pagination = {
                numPerPage : 3,
                currentPage : 1,
                restaurants : response
            }
            calcPages();
        });
    }

    /**
      * @ngdoc method
      * @name favCtrl#checkLikes
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Called outside of profile
      * Checks the users favourites
      * - Gets users favourites
      * - Pushes the favourite restaurant id into a new array
      * - Goes through the param restaurants and adds the favourite
      * 
      * @param {object} restaurants the relevant restaurants
    */
    $scope.checkLikes = function(restaurants) {
        $scope.$watch('loggedin',function(){
            // console.log(new Date());
            if (restaurants) {
                // console.log(userdata.user);
                services.get('favourites',`uid-${userdata.user.id}`).then(function(response){
                    var likes = [];
                    angular.forEach(response,function(e){
                        likes.push(e.rid);
                    });
                    angular.forEach(restaurants,function(e){
                        if (likes.indexOf(e.id) != -1){
                            e.liked = true;
                        }
                    });
                });
            }
        });
    }

    /**
      * @ngdoc method
      * @name favCtrl#totalLikes
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Counts the users total favourites
    */
    $scope.totalLikes = function() {
        $scope.$watch('loggedin',function(){
            if ($rootScope.loggedin) {
                services.get('favourites',`count-1/uid-${userdata.user.id}`).then(function(response){
                    $rootScope.totallikes = response[0].rowcount;
                });
            }
        });
    }

    /**
      * @ngdoc method
      * @name favCtrl#like
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Adds the restaurant to the users favourites
      * Or unlikes it if it's already there
      * 
      * @param {object} r the restaurant
    */
    $scope.like = function(r) {
        if (!r.liked){
            var data = {
                "rid":r.id,
                "uid":userdata.user.id,
                "name":r.name
            };
    
            services.post('favourites',data).then(function(response){
                if (response){
                    r.liked = true;
                }
            });
        } else {
            services.delete('favourites',`uid-${userdata.user.id}/rid-${r.id}`).then(function(response){
                // console.log(response);
                r.liked = false;
            });
        }
    }

    /**
      * @ngdoc method
      * @name favCtrl#unlike
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Remove from users favourites
      * specific to profile My Favourites tab
      * 
      * @param {object} r the restaurant
      * @param {index} index index of the restaurant in array
    */
    $scope.unlike = function(r,index) {        
        services.delete('favourites',`uid-${userdata.user.id}/rid-${r.rid}`).then(function(response){
            // console.log(response);
            $scope.pagination.restaurants.splice(index,1);
            $rootScope.totallikes -= 1;
            calcPages();
        });
    }

    /**
      * @ngdoc method
      * @name favCtrl#calcPages
      *
      * @methodOf
      * restaurantangular.controller:favCtrl
      *
      * @description
      * Calculates the pagination
    */
    function calcPages() {
        $scope.pagination.filteredRestaurants = $scope.pagination.restaurants.slice(0, 3);
        $scope.pageChanged = function() {
            var startPos = ($scope.pagination.currentPage - 1) * 3;
            $scope.pagination.filteredRestaurants = $scope.pagination.restaurants.slice(startPos, startPos + 3);
        };
    }
});