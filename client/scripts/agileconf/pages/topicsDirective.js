var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agTopics', ['$window', function($window) {
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope, $filter) {
				var $translate = $filter('translate');

				$scope.lienSoumission = function() {
          return $translate('cfp.link.addr');
        };
			},
			templateUrl: 'client/templates/agileconf/topics.html'
		};
	}])
;
