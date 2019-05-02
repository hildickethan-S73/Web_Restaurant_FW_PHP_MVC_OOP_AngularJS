var restaurantangular = angular.module('restaurantangular', ['ngRoute']);
restaurantangular.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                .when("/", {
                    templateUrl: "frontend/modules/home/view/home.view.html", 
                    controller: "mainCtrl",
                })

                .when("/contact", {
                    templateUrl: "frontend/modules/contact/view/contact.view.html", 
                    controller: "contactCtrl"
                })

                
                .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "mainCtrl"});
    }
]);
