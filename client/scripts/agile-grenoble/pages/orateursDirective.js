var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agOrateurs', ['$window', function($window) {
		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
				$scope.content = ContentService.getOrateurs().then(function(data) {
					$scope.content = data;
				},
                function(data) {
                    $scope.content = data;
                });

				$scope.soumettre = function() {
					$window.location.href = $scope.content.cfp;
				};
			},
			templateUrl: 'client/templates/agile-grenoble/orateurs.html'
		};
	}])
;
