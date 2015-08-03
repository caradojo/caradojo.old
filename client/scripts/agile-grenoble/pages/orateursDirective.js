var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agOrateurs', ['$window', function($window) {
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope, $filter) {
				var $translate = $filter('translate');

				$scope.lienSoumission = function() {
          return $translate('cfp.link.addr');
        };
			},
			templateUrl: 'client/templates/agile-grenoble/orateurs.html'
		};
	}])
;
