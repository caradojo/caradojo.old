var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSponsors', [function() {
		
		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			templateUrl: './views/sponsors.html'
		};
	}])
;
