var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agApropos', function () {
  return {
    restrict: 'A',
    replace: true,
    controller: function ($scope, $filter, ContentService) {
      var $translate = $filter('translate');

      $scope.content = ContentService.getCommonData().then(function (data) {
        $scope.content = data;
      }, function (data) {
        $scope.content = data;
      });

      $scope.mails = function (strToTranslate) {
        return $translate(strToTranslate);
      };
    },
    templateUrl: 'client/templates/agile-grenoble/apropos.html'
  };
});
