var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ngResource', 'gridster', 'ngRoute', 'ngAnimate'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/principal', {
				templateUrl: 'template/principal.html',
				controller: 'ProgrammePrincipalCtrl'
			}).
			when('/session/:id', {
				templateUrl: 'template/session.html',
				controller: 'ProgrammeSessionCtrl'
			}).
			otherwise({
				redirectTo: '/principal',
				controller: 'ProgrammePrincipalCtrl'
			});
		}
	]);

