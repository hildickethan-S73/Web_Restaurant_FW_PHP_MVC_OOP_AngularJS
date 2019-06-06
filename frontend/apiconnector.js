restaurantangular.factory("services", ['$http','$q', function ($http, $q) {
   var serviceBase = '/angularjs/backend/api/';
   var obj = {};
   
   // all gets with same name doesn't work for me
   // only uses last one
   
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
