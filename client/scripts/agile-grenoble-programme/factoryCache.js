var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('AgCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('AgCache');
  }]);