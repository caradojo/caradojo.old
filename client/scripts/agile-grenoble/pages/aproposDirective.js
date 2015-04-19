var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agApropos', [function() {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope, ContentService) {
				$scope.content = ContentService.getApropos().then(function(data) {
					$scope.content = data;
				},
                function(data) {
                    $scope.content = data;
                });
			},
			templateUrl: 'client/templates/agile-grenoble/apropos.html'
		};
	}])
;
