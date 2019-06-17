/**
  * @ngdoc service
  * @name restaurantangular.services
  * 
  * @description
  * Service that compacts all REST api requests
  * to send via $http
  *
  * @example
  * services.get('restaurants');
**/
restaurantangular.factory("services", ['$http','$q', function ($http, $q) {
   var serviceBase = '/angularjs/backend/api/';
   var obj = {};
   
   /**
    * @ngdoc function
    * @name services#get
    * 
    * @description
    * A GET request
    * 
    * @param {string} module the module to use
    * @param {string} extension the GET variables
    * @return {object} promise the promised data
   */
   obj.get = function (module, extension = "") {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'GET',
            url: serviceBase + module + '/' + extension  // ie: api/restaurants/ ie: api/restaurants/type-Gourmet/
         }).success(function(data, status, headers, config) {
            defered.resolve(data);
         }).error(function(data, status, headers, config) {
            defered.reject(data);
         });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#getF
    * 
    * @description
    * A GET request with a function 
    * 
    * @param {string} module the module to use
    * @param {string} functi the function to use (just the param follow by -true)
    * @return {object} promise the promised data
   */
   obj.getF = function (module, functi) {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'GET',
            url: serviceBase + module + '/' + functi + '-true' // ie: api/contact/email-true 
         }).success(function(data, status, headers, config) {
            defered.resolve(data);
         }).error(function(data, status, headers, config) {
            defered.reject(data);
         });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#getResource
    * 
    * @description
    * A GET request to a JSON file
    * 
    * @param {string} filename the file to look for
    * @return {object} promise the promised data
   */
   obj.getResource = function (filename) {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'GET',
            url: 'frontend/assets/resources/' + filename, // headers doesnt fix firefox issues with receiving file as text/xml
            headers: {
                "Content-Type": "application/json"
            },
            data:''
         }).success(function(data, status, headers, config) {
            defered.resolve(data);
         }).error(function(data, status, headers, config) {
            defered.reject(data);
         });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#post
    * 
    * @description
    * A POST request
    * 
    * @param {string} module the module to use
    * @param {object} data the data to send
    * @param {string} extension the GET variables
    * @return {object} promise the promised data
   */
   obj.post = function (module, data, extension = "") {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'POST',
            url: serviceBase + module + '/' + extension, // ie: api/restaurants 
            data: {"data": data}
      }).success(function(data, status, headers, config) {
         defered.resolve(data);
      }).error(function(data, status, headers, config) {
         defered.reject(data);
      });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#postF
    * 
    * @description
    * A POST request with a function
    * 
    * @param {string} module the module to use
    * @param {object} data the data to send
    * @param {string} functi the function to use (just the param follow by -true)
    * @return {object} promise the promised data
   */
   obj.postF = function (module, data, functi) {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'POST',
            url: serviceBase + module + '/' + functi + '-true', // ie: api/contact/email-true 
            data: {"data": data}
      }).success(function(data, status, headers, config) {
         defered.resolve(data);
      }).error(function(data, status, headers, config) {
         defered.reject(data);
      });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#put
    * 
    * @description
    * A PUT request
    * 
    * @param {string} module the module to use
    * @param {object} data the data to send
    * @param {string} extension the GET variables
    * @return {object} promise the promised data
   */
   obj.put = function (module, data, extension = "") {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'PUT',
            url: serviceBase + module + '/' + extension, // ie: api/login
            data: {"data": data}
      }).success(function(data, status, headers, config) {
         defered.resolve(data);
      }).error(function(data, status, headers, config) {
         defered.reject(data);
      });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#delete
    * 
    * @description
    * A DELETE request
    * 
    * @param {string} module the module to use
    * @param {string} extension the GET variables
    * @return {object} promise the promised data
   */
   obj.delete = function (module, extension = "") {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'DELETE',
            url: serviceBase + module + '/' + extension 
         }).success(function(data, status, headers, config) {
            defered.resolve(data);
         }).error(function(data, status, headers, config) {
            defered.reject(data);
         });
      return promise;
   };

   /**
    * @ngdoc function
    * @name services#deleteF
    * 
    * @description
    * A DELETE request with a function
    * 
    * @param {string} module the module to use
    * @param {string} functi the function to use (just the param follow by -true)
    * @return {object} promise the promised data
   */
   obj.deleteF = function (module, functi) {
      var defered=$q.defer();
      var promise=defered.promise;
      $http({
            method: 'DELETE',
            url: serviceBase + module + '/' + functi + '-true' // ie: api/login/logout-true 
         }).success(function(data, status, headers, config) {
            defered.resolve(data);
         }).error(function(data, status, headers, config) {
            defered.reject(data);
         });
      return promise;
   };
        
   return obj;
}]);
