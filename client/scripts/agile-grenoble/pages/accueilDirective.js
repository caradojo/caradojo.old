var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agAccueil', [function(selectMenu) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope, ContentService) {
				$scope.content = ContentService.getAccueil().then(function(data) {
					$scope.content = data;
				},
                function(data) {
                    $scope.content = data;
                });
			},
			templateUrl: 'client/templates/agile-grenoble/accueil.html'
		};
	}])
;
