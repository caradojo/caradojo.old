var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ui-notification', 'directives.skrollr', 'ngSanitize', 'angularSmoothscroll', 'ngRoute', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'ngCookies'])
.config(['$translateProvider', function($translateProvider){

  $translateProvider.useStaticFilesLoader({
    prefix: 'client/media/l10n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('fr_FR');

  $translateProvider.useSanitizeValueStrategy('sanitize');
}])
.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: null,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'bottom',
        closeOnClick: true,
        templateUrl: 'client/templates/agile-grenoble/notification.html'
    });
})
.controller('AgileGrenobleCtrl', function($translate, $scope, Notification) {
      $scope.setLang = function(langKey) {
        $translate.use(langKey);
      };
      
      Notification.primary({title: '<img src="client/media/icon_orange_speaker_100.png" width="40" height="40"/> Appel à orateurs'});
});

