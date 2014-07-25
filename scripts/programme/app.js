var AGProgrammeApp = angular.module('AGProgrammeApp', ['ngResource', 'ngRoute'])
	.controller('AGProgrammeCtrl', ['$scope', 'Slots', function($scope, Slots) {
	   
	   $scope.rooms = ["Auditorium",
					    "Makalu",  
					    "Kili 1+2",
					    "Kili 3+4",
					    "Cervin",
					    "Everest",
					    "Mt-Blanc 1",
					    "Mt-Blanc 2",
					    "Mt-Blanc 3",
					    "Mt-Blanc 4"
							] ;
							
		$scope.room_info = {
		    "Auditorium":{"id": 0, "capacity" : 530},
		    "Makalu": {"id":1, "capacity" : 110},  
		    "Kili 1+2": {"id":2, "capacity" : 55},
		    "Kili 3+4": {"id":3, "capacity" : 55},
		    "Cervin": {"id":4, "capacity" : 40},
		    "Everest": {"id":5, "capacity" : 40},
		    "Mt-Blanc 1": {"id":6, "capacity" : 24},
		    "Mt-Blanc 2": {"id":7, "capacity" : 24},
		    "Mt-Blanc 3": {"id":8, "capacity" : 24},
		    "Mt-Blanc 4": {"id":9, "capacity" : 24},
		};
	   

	   var loadData = function() {
	   		Slots.get(function(datas) {
	   				$scope.datas = datas;

		   			$scope.slots = datas.slots;
		   		});
	   };

	   var getFirstKey = function(data) {
		  for (var prop in data)
		    return prop;
		};


	   $scope.click = function() {
	   	var test = $scope.slots;
	   }

	   $scope.isEmptySlot = function(slot) {
	   	return (Object.keys(slot).length-1) == 0;
	   };

	   $scope.getSlotTime = function(slot) {
	   	if(!$scope.isEmptySlot(slot) && !$scope.isSessionUnique(slot)) {
	   		var key = getFirstKey(slot);
	   		return slot[key]['start-time'];
	   	}
	   	return '';
	   };

	   $scope.nombreTotalSalles = function() {
	   	return $scope.rooms.length;
	   };

	   $scope.nombreSallesUtilisesParLaSession = function(session) {
	   		if(session === undefined || session.width === undefined || session.width == "") {
	   			return 1;
	   		}
	   		return session.width;
	   };

	   $scope.isSession = function(slot) {
	   	return !$scope.isSessionUnique(slot) && !$scope.isEmptySlot(slot);
	   };

	   $scope.isSessionUnique = function(slot) {
	   	return ('all' in slot);
	   };
	   

	    
	   loadData();
   }]);