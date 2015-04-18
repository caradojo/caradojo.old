var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSponsors', function(SponsorsService) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
            controller: function ($scope) {
                $scope.sponsors = SponsorsService.get();

                $scope.description = function(sponsor) {
                    return "images/sponsors/resources/" + sponsor.description;
                };
            },
			templateUrl: './templates/agile-grenoble/sponsors.html'
		};
	})
;
