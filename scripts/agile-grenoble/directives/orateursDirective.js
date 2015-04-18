var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agOrateurs', ['$window', function($window) {
		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
				$scope.soumettre = function() {
					$window.location.href = 'http://cfp.agile-grenoble.org/sessions/new';
				};
			},
			templateUrl: './templates/agile-grenoble/orateurs.html'
		};
	}])
;
