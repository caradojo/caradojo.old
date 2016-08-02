var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['directives.skrollr', 'ngSanitize', 'angularSmoothscroll', 'pascalprecht.translate'])
.config(['$translateProvider', function($translateProvider){

  $translateProvider.useStaticFilesLoader({
    prefix: 'client/media/agileaccueil/l10n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('fr_FR');

  $translateProvider.useSanitizeValueStrategy('sanitize');
}])
.controller('AgileGrenobleCtrl', function($translate, $scope, $filter, ContentService) {

      var translate = $filter('translate');

      $scope.setLang = function(langKey) {
        console.log(langKey);
        $translate.use(langKey);
      };

      $scope.content = ContentService.getCommonData().then(function (data) {
        $scope.content = data;
      }, function (data) {
        $scope.content = data;
      });

      $scope.mails = function (strToTranslate) {
        return translate(strToTranslate);
      };
});

