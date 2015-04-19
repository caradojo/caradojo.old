var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agSocialNetwork', ['$window', function($window) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
				$scope.connectTo = function($event) {
					$event.preventDefault();
					$window.open($event.currentTarget.href, '_blank', 'width=700,height=360');
				}
			},
			scope: {
				url: "@url"
			},
			templateUrl: 'client/templates/agile-grenoble/socialnetwork.html'
		};
	}])
;
