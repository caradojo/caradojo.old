var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammeSessionCtrl' , function($scope, $routeParams, Session, SessionService) {

		var loadData = function() {
			Session.jsonp_query({id:$routeParams.id}).$promise.then(
                function( session ) {
		            SessionService.fixSessionData(session);
               	    $scope.session = session;
                },
                function( error ) {
                    alert( "Erreur lors du chargement de la session" );
                }
            );
	   };

	   loadData();
	});
