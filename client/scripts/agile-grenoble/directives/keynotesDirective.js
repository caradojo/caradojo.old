var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agKeynotes', ['KeynotesService', function(KeynotesService) {

		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				$scope.keynotes = KeynotesService.get();

				$scope.scrolled = function() {
					$scope.menuselected = "keynotes";

				};
			},
			templateUrl: 'client/templates/agile-grenoble/keynotes.html'
		};
	}])
;
