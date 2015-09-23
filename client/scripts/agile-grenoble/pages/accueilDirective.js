var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agAccueil', function() {
		return {
			restrict: 'A',
			replace: true,
			controller: function ($scope, $filter) {
        var $translate = $filter('translate');

        $scope.lienSoumission = function() {
          return $translate('cfp.link.addr');
		};
		
		$scope.lienRegister = function() {
          return $translate('register.link.addr');		  		  
        };
			},
			templateUrl: 'client/templates/agile-grenoble/accueil.html'
		};
	});
