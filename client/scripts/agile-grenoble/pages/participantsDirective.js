var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agParticipants', ['$window', function($window) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope, ContentService) {
				$scope.content = ContentService.getCommonData().then(function(data) {
					$scope.content = data;
				},
        function(data) {
            $scope.content = data;
        });

				$scope.site = function(annee) {
					if(annee <= 2009) {
						$window.open('http://at' + annee + '.agiletour.org/');
					}
					else if(annee <= 2011) {
						$window.open('http://agile-grenoble.org/' + annee + '/start');
					}
					else {
						$window.open('http://' + annee + '.agile-grenoble.org');
					}
				};
			},
			templateUrl: 'client/templates/agile-grenoble/participants.html'
		};
	}])
;
