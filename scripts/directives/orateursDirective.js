var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agOrateurs', ['$window', function($window) {
		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
				$scope.soumettre = function() {
					$window.location.href = 'http://cfp.agile-grenoble.org/';
				};
			},
			templateUrl: './views/orateurs.html'
		};
	}])
;
