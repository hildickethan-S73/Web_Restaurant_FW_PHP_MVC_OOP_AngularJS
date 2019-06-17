/**
  * @ngdoc overview
  * @name restaurantangular.module:restaurantangular
  *
  * @description
  * The whole application module
  * 
  * @example
  *  <b>script.js</b>
  *  <pre>
  *  import restaurantangular from './location...'
  *  angular.module('myModule', [restaurantangular]);
  *  </pre>
  * 
*/
var restaurantangular = angular.module('restaurantangular', ['ngRoute', 'toastr', 'ui.bootstrap']);
restaurantangular.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                // home page
                .when("/", {
                    templateUrl: "frontend/modules/home/view/home.view.html", 
                    controller: "mainCtrl",
                    resolve: {
                        restaurants: function (services) {
                            return services.get('restaurants');
                        }
                    }
                })

                // shop page
                .when("/shop", {
                    templateUrl: "frontend/components/shop/view/shop.view.html", 
                    controller: "shopCtrl",
                    resolve: {
                        restaurants: function (services) {
                            return services.get('restaurants');
                        }
                    }
                })

                // details page
                .when("/shop/:id", {
                    templateUrl: "frontend/components/shop/view/details.view.html", 
                    controller: "detailsCtrl",
                    resolve: {
                        data: function (services, $route) {
                            return services.get('restaurants','id-'+$route.current.params.id);
                        }
                    }
                })

                // contact page
                .when("/contact", {
                    templateUrl: "frontend/modules/contact/view/contact.view.html", 
                    controller: "contactCtrl"
                })

                // activation page
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

                // password recovery page
                .when('/recover/:email/:token', {
                    templateUrl: "frontend/components/login/view/recoverPW.view.html", 
                    controller: "recoverPWCtrl"
                })

                // profile page
                .when('/profile', {
                    templateUrl: "frontend/components/profile/view/profile.view.html", 
                    controller: "profileCtrl"
                })

                // cart page
                .when('/cart', {
                    templateUrl: "frontend/components/cart/view/cart.view.html", 
                    controller: "cartCtrl"
                })
                
                // home page
                .otherwise("/", {templateUrl: "frontend/modules/home/view/home.view.html", controller: "mainCtrl"});
    }
]);
