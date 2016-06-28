var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ui-notification', 'directives.skrollr', 'ngSanitize', 'angularSmoothscroll', 'ngRoute', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'ngCookies'])
.config(['$translateProvider', function($translateProvider){

  $translateProvider.useStaticFilesLoader({
    prefix: 'client/media/agileconf/l10n/',
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
        templateUrl: 'client/templates/agileconf/notification.html'
    });
})
.controller('AgileGrenobleCtrl', function($translate, $scope, Notification) {
      $scope.setLang = function(langKey) {
        $translate.use(langKey);
      };
      
      Notification.primary({title: 'dummytitlejusttoactivatetitlefeature'});
});

