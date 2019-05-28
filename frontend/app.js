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

                .when("/shop", {
                    templateUrl: "frontend/components/shop/view/shop.view.html", 
                    controller: "shopCtrl",
                    resolve: {
                        restaurants: function (services) {
                            return services.get('restaurants');
                        }
                    }
                })

                .when("/shop/:id", {
                    templateUrl: "frontend/components/shop/view/details.view.html", 
                    controller: "detailsCtrl",
                    resolve: {
                        data: function (services, $route) {
                            return services.get('restaurants','id-'+$route.current.params.id);
                        }
                    }
                })

                .when("/contact", {
                    templateUrl: "frontend/modules/contact/view/contact.view.html", 
                    controller: "contactCtrl"
                })

                .when('/activation/:username/:token', {
                    templateUrl: "frontend/modules/home/view/home.view.html", 
                    controller: "activationCtrl",
                    resolve: {
                        activation: function(services,$route){
                            return services.put(
                                'login',
                                {'token':$route.current.params.token,'activated':true},
                                'enableaccount-true/username-'+$route.current.params.username
                                );
                        }
                    }
                })

                .when('/recover/:email/:token', {
                    templateUrl: "frontend/components/login/view/recoverPW.view.html", 
                    controller: "recoverPWCtrl"
                })

                .when('/profile', {
                    templateUrl: "frontend/components/profile/view/profile.view.html", 
                    controller: "profileCtrl"
                })
                
                .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "mainCtrl"});
    }
]);
