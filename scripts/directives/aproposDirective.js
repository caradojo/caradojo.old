var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agApropos', [function() {
		
		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
			},
			templateUrl: './views/apropos.html'
		};
	}])
;
