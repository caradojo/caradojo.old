var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammeSessionCtrl' , function($scope, $routeParams, Slots) {

		var loadData = function() {
   			Slots.get(function(datas) {
	   				$scope.session = datas.sessions[$routeParams.id];
	   		});
	   };

	   loadData();
	});