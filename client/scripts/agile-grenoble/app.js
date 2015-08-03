var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['directives.skrollr', 'ngSanitize', 'angularSmoothscroll', 'ngRoute', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'ngCookies'])
.config(['$translateProvider', function($translateProvider){

  $translateProvider.useStaticFilesLoader({
    prefix: 'client/media/l10n/',
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

