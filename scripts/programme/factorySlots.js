var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', function($resource) {
	  	return $resource('slots.json');
	}]);