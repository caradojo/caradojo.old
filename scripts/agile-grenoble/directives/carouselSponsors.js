var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agCarousel', function($window, $timeout, SponsorsService) {
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				var timer;
				var delay = 1500;
				$scope.sponsors = SponsorsService.getAll();
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
			        $scope._Index = ($scope._Index < $scope.sponsors.length - 1) ? ++$scope._Index : 0;
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
			templateUrl: './templates/agile-grenoble/carouselsponsors.html'
		};
	})
;
