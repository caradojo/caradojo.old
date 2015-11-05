var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammeSessionCtrl' , function($scope, $routeParams, Session) {

		var loadData = function() {
			Session.jsonp_query({id:$routeParams.id}).$promise.then(
                function( datas ) {
                	$scope.session = datas;
                },
                function( error ) {
                    alert( "Erreur lors du chargement de la session" );
                }
            );
	   };

	   loadData();
	});