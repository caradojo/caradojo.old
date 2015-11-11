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

            $scope.lienListeDattente = function() {
            return $translate('register.queueLink.addr');
            };

            $scope.lienAI2015 = function() {
            return $translate('agileinnovation.link.addr');
            };

            $scope.lienCaraContact = function() {
            return $translate('cara.contactlink.addr');
            };

            $scope.lienCaraEvenements = function() {
            return $translate('cara.eventslink.addr');
            };

        },
        templateUrl: 'client/templates/agile-grenoble/accueil.html'
    };
});
