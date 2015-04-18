var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSponsors', function(SponsorsService) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
            controller: function ($scope) {
                $scope.sponsorsSilver = SponsorsService.getSilver();
                $scope.sponsorsGold = SponsorsService.getGold();
                $scope.sponsorsPartenaire = SponsorsService.getPartenaire();

                $scope.description = function(sponsor) {
                    return sponsor.description;
                };
            },
			templateUrl: './templates/agile-grenoble/sponsors.html'
		};
	})
;
