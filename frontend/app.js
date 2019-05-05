var restaurantangular = angular.module('restaurantangular', ['ngRoute', 'toastr', 'ui.bootstrap']);
restaurantangular.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when("/", {
                    templateUrl: "frontend/modules/home/view/home.view.html", 
                    controller: "mainCtrl",
                    resolve: {
                        restaurants: function (services) {
                            return services.get('restaurants');
                        }
                    }
                })

                .when("/contact", {
                    templateUrl: "frontend/modules/contact/view/contact.view.html", 
                    controller: "contactCtrl"
                })
                
                .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "mainCtrl"});
    }
]);
