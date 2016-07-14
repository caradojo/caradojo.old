var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agAccueil', function() {
    return {
        restrict: 'A',
        replace: true,
        controller: function ($scope, $filter) {
            var $translate = $filter('translate');

        },
        templateUrl: 'client/templates/agileforum/accueil.html'
    };
});
