restaurantangular.controller('favCtrl', function ($scope,$rootScope,services,userdata,toastr) {
    // TAB 2, FAVOURITES
    ///////////////////////////////////
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

    $scope.checkLikes = function(restaurants) {
        $scope.$watch('userdata.user',function(){
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
        })
    }

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
                console.log(response);
                r.liked = false;
            });
        }
    }

    $scope.unlike = function(r,index) {        
        services.delete('favourites',`uid-${userdata.user.id}/rid-${r.rid}`).then(function(response){
            console.log(response);
            $scope.pagination.restaurants.splice(index,1);
            calcPages();
        });
    }

    function calcPages() {
        $scope.pagination.filteredRestaurants = $scope.pagination.restaurants.slice(0, 3);
        $scope.pageChanged = function() {
            var startPos = ($scope.pagination.currentPage - 1) * 3;
            $scope.pagination.filteredRestaurants = $scope.pagination.restaurants.slice(startPos, startPos + 3);
        };
    }
});