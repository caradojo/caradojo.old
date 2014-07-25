var AGProgrammeApp = AGProgrammeApp || {};
AGProgrammeApp.factory('Slots', ['$resource', function($resource) {
  	return $resource('slots.json');
}]);