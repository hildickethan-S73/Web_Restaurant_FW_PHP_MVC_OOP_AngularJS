/**
  * @ngdoc directive
  * @name frontend.directive:restaurantangular.directive'dropzone', 
  * @restrict 'AE'
  * @element ANY
  * @description
  * A dropzone directive
  * 
  * @example
  * <div class="dropzone" dropzone="dropzoneConfig"></div>
**/
restaurantangular.directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

// back-img

/**
  * @ngdoc directive
  * @name frontend.directive:restaurantangular.directive'backImg', 
  * @restrict 'AE'
  * @element ANY
  * @description
  * Changes background-image for the element
  * 
  * @example
  * <section class="page-top-section set-bg" back-img="frontend/assets/img/bgrestaurant.jpg">
**/
restaurantangular.directive('backImg', function(){
  return function(scope, element, attrs){
      attrs.$observe('backImg', function(value) {
          element.css({
              'background-image': 'url(' + value +')',
              'background-size' : 'cover'
          });
      });
  };
});