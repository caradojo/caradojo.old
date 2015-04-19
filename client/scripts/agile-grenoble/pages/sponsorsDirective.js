var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSponsors', function(SponsorsService) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
            controller: function ($scope) {

                $scope.content = SponsorsService.get().then(function(data) {
                    $scope.content = data;
                },
                function(data) {
                    $scope.content = data;
                });
                
                $scope.scrolled = function() {
                    $scope.menuselected = "sponsors";
                };

                $scope.description = function(sponsor) {
                    return sponsor.description;
                };

                $scope.getGold = function() {
                    if(_.isUndefined($scope.content.sponsors)) {
                        return [];
                    }

                    return _.filter($scope.content.sponsors, function(item) {
                                        return item.goldNotSilver;
                                    });
                };

                $scope.getSilver = function() {
                    if(_.isUndefined($scope.content.sponsors)) {
                        return [];
                    }

                    return _.filter($scope.content.sponsors, function(item) {
                                        return !item.goldNotSilver && !item.partenaire;
                                    });
                };

                $scope.getPartenaire = function() {
                    if(_.isUndefined($scope.content.sponsors)) {
                        return [];
                    }

                    return _.filter($scope.content.sponsors, function(item) {
                                        return item.partenaire;
                                    });
                };
            },
			templateUrl: 'client/templates/agile-grenoble/sponsors.html'
		};
	})
;
