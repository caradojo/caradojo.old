var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agCarousel', function($window, $timeout, SponsorsService) {
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				var timer;
				var delay = 1000;
				$scope.content = SponsorsService.get().then(function(data) {
                    $scope.content = data;
                },
                function(data) {
                    $scope.content = data;
                });

			    $scope._Index = 0;

				var slideshow = function() {
				  timer = $timeout(function() {
				    $scope.next();
				    timer = $timeout(slideshow, delay);
				  }, delay);
				};

			    $scope.isActive = function (index) {
			        return $scope._Index === index;
			    };

			    $scope.next = function () {
			    	if(_.isUndefined($scope.content.sponsors)) {
                        return 0;
                    }

			        $scope._Index = ($scope._Index < $scope.content.sponsors.length - 1) ? ++$scope._Index : 0;
			    };

			    $scope.stopSlideshow = function() {
					$timeout.cancel(timer);
				};

				$scope.startSlideshow = function() {
					slideshow();
				};

				$scope.description = function(sponsor) {
                    return sponsor.description;
                };

				$scope.startSlideshow();

				$scope.$on('$destroy', function() {
				  $scope.stopSlideshow();
				});
			},
			scope : {
				name : '@agCarousel'
			},
			templateUrl: 'client/templates/agile-grenoble/carouselsponsors.html'
		};
	})
;
