var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
	.directive('agPage', [function() {	
		return {
			restrict: 'A',
			transclude: true,
			replace: true,
			controller: function ($scope) {
				$scope.scrolleddown = function(direction) {
					if(direction === 'down') {
						updateMenuSelected();
					}
				};
				$scope.scrolledup = function(direction) {
					if(direction === 'up') {
						updateMenuSelected();
					}
				};

				var updateMenuSelected = function() {
					$scope.$parent.menuselected = $scope.idPage;
					$scope.$parent.$apply();
				};
			},
			scope: {idPage:'@agPage',
					offsetdown: '=offsetdown',
					offsetup: '=offsetup'},
			template: '<span ui-jq="waypoint" ui-options="scrolledup, {offset:{{offsetup}}}"><div ng-transclude ui-jq="waypoint" ui-options="scrolleddown, {offset:{{offsetdown}}}" class="page" id="{{idPage}}" data-top="opacity:1.0; " data-80p-top="opacity:0.2; "></div></span>'
		};
	}])
;
