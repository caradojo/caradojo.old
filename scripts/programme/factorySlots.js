var AGProgrammeApp = AGProgrammeApp || {};
AGProgrammeApp.factory('Slots', ['$resource', function($resource) {
  	return $resource('/agile-grenoble-backend-master/resources/templates/slots.json');
}]);