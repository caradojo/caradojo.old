var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSponsors', function(SponsorsService) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
            controller: function ($scope) {
                $scope.sponsors = SponsorsService.get();
            },
			templateUrl: './templates/agile-grenoble/sponsors.html'
		};
	})
;
