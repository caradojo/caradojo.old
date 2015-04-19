var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agKeynotes', ['KeynotesService', function(KeynotesService) {

		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				$scope.content = KeynotesService.get().then(function(data) {
					$scope.content = data;
				},
                function(data) {
                    $scope.content = data;
                });
                
				$scope.scrolled = function() {
					$scope.menuselected = "keynotes";
				};
			},
			templateUrl: 'client/templates/agile-grenoble/keynotes.html'
		};
	}])
;
