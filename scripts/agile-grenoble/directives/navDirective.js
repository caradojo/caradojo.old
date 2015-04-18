var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agNav', [function(selectMenu) {

		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				$scope.menuselected = "accueil";
			},
			templateUrl: './templates/agile-grenoble/nav.html'
		};
	}])
;
