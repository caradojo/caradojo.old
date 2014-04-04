var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('CarouselSponsorCtrl', function($scope) {
		$scope.intervalSpeed = 5000;
		$scope.slides = [ 
			{
				image: './images/sponsors/Become_a_Sponsor.jpg'
			},
		   {
		   		image: './images/sponsors/Gold-Sponsor.jpg'
		   }
		];
    })
;

