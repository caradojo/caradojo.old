var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ngSanitize', 'pascalprecht.translate'])
.config(['$translateProvider', function($translateProvider){

  $translateProvider.useStaticFilesLoader({
    prefix: 'client/media/agileaccueil/l10n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('fr_FR');

  $translateProvider.useSanitizeValueStrategy('sanitize');
}])
.controller('AgileGrenobleCtrl', function($translate, $scope) {
      $scope.setLang = function(langKey) {
        $translate.use(langKey);
      };
});

