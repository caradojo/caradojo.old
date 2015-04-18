var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ngResource', 'gridster', 'ngRoute', 'ngAnimate'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/principal', {
				templateUrl: 'templates/agile-grenoble-programme/principal.html',
				controller: 'ProgrammePrincipalCtrl'
			}).
			when('/session/:id', {
				templateUrl: 'templates/agile-grenoble-programme/session.html',
				controller: 'ProgrammeSessionCtrl'
			}).
			otherwise({
				redirectTo: '/principal'
			});
		}
	]);

