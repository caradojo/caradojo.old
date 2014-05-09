var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agCarousel', ['$window', '$timeout', 'sponsorsService', function($window, $timeout, sponsorsService) {	
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				var timer;
				var delay = 1500;
				$scope.sponsors = sponsorsService.get();
			    $scope._Index = 0;

			    $scope.isActive = function (index) {
			        return $scope._Index === index;
			    };

			    $scope.next = function () {
			        $scope._Index = ($scope._Index < $scope.sponsors.length - 1) ? ++$scope._Index : 0;
			    };

			    $scope.visite = function(sponsor) {
					$window.location.href = sponsor.web;
				};

 				$scope.description = function(sponsor) {
					return "images/sponsors/resources/" + sponsor.description;
				};

				var slideshow = function() {
				  timer = $timeout(function() {
				    $scope.next();
				    timer = $timeout(slideshow, delay);
				  }, delay);
				};
				 
				slideshow();
				 
				$scope.$on('$destroy', function() {
				  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
				});
			},
			templateUrl: './views/carouselSponsors.html'
		};
	}])
;
