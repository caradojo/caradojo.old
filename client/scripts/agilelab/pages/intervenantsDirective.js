var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agIntervenants', function () {
  return {
    restrict: 'A',
    replace: true,
    controller: function ($scope, $filter) {
      var $translate = $filter('translate');

      $scope.mails = function (strToTranslate) {
        return $translate(strToTranslate);
      };
    },
    templateUrl: 'client/templates/agilelab/intervenants.html'
  };
});
