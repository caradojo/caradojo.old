var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agDetails', function () {
  return {
    restrict: 'A',
    replace: true,
    controller: function ($scope, $filter) {
      var $translate = $filter('translate');

      $scope.mails = function (strToTranslate) {
        return $translate(strToTranslate);
      };
    },
    templateUrl: 'client/templates/agile4kids/details.html'
  };
});
