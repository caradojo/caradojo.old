var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agCarousel', ['$timeout', function($timeout) {	
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope) {
				$scope.sponsors = [
								    /*{
								      photo : 'images/sponsors/LogoEnalean.png',
								      entreprise : 'Enalean',
								      niveau : 'silver'
								    },
								    {
								      photo : 'images/sponsors/Sogilis.png', 
								      entreprise : 'Sogilis',
								      niveau : 'gold'
								    }*/
								];

			    $scope._Index = 0;

			    $scope.isActive = function (index) {
			        return $scope._Index === index;
			    };

			    $scope.next = function () {
			        $scope._Index = ($scope._Index < $scope.sponsors.length - 1) ? ++$scope._Index : 0;
			    };

			    var timer;
				var sliderFunc = function() {
				  timer = $timeout(function() {
				    $scope.next();
				    timer = $timeout(sliderFunc, 1000);
				  }, 1000);
				};
				 
				sliderFunc();
				 
				$scope.$on('$destroy', function() {
				  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
				});
			},
			templateUrl: './views/carouselSponsors.html'
		};
	}])
;
