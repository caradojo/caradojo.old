var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ngResource', 'gridster', 'ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/principal', {
				templateUrl: 'principal.html',
				controller: 'ProgrammePrincipalCtrl'
			}).
			when('/session/:id', {
				templateUrl: 'session.html',
				controller: 'ProgrammeSessionCtrl'
			}).
			otherwise({
				redirectTo: '/principal',
				controller: 'ProgrammePrincipalCtrl'
			});
		}
	])
	.factory('Slots', ['$resource', function($resource) {
	  	return $resource('slots.json');
	}])
	.controller('ProgrammePrincipalCtrl', function($scope, Slots, KeynotesService) {
	

		$scope.gridsterOpts = {
			columns: 10,
			defaultSizeX: 1,
			margins: [0, 0],
			outerMargin: true,
			rowHeight: 40,
			pushing: true,
			floating: false,
			draggable: {
				enabled: false
			},
			resizable: {
				enabled: false,
				handles: 'n, e, s, w, se, sw'
			}
		};

		var slot_hours = [
		    "8h00",
		    "8h30",
		    "9h00",
		    "10h00",
		    "(10h15)",
		    "(10h30)",
		    "10h45",
		    "11h05",
		    "(11h20)",
		    "(11h35)",
		    "11h50",
		    "13h20",
		    "13h45",
		    "14h30",
		    "14h50",
		    "(15h05)",
		    "(15h20)",
		    "15h35",
		    "16h05",
		    "(16h20)",
		    "(16h35)",
		    "16h50",
		    "17h10",
		    "(17h25)",
		    "(17h40)",
		    "17h55",
		    "18h15",
		];
							
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
	   
	   var MAX_SESSION_LENGTH = 1000;

	   var loadData = function() {
	   		
	   			$scope.keynotes = KeynotesService.get();

	   			Slots.get(function(datas) {
		   				$scope.datas = datas;

			   			$scope.slots = datas.slots;
			   			$scope.rooms = datas.rooms;

			   			prepareSlots();
		   		});

				
	   };

	   var prepareSlots = function() {
	   		addGridLayoutInformationsToAllSlots();
			changeRoomNameKeyToId();
	   	}

		var addGridLayoutInformationsToAllSlots = function() {
			var rowposition = 0;
			for(var index in $scope.slots) {
				var lengthmin = addGridLayoutInformationsToAllSession($scope.slots[index], rowposition);
			    rowposition = parseInt(rowposition) + parseInt(lengthmin);
			}
		}

	   	var addGridLayoutInformationsToAllSession = function(slot, rowposition) {
	   		var minlength = MAX_SESSION_LENGTH;
		    for (var prop in slot) {
		        if (slot.hasOwnProperty(prop)) {
		        	minlength = updateMinSessionLength(slot[prop], minlength);
		        	addGridLayoutColumnPositionToSession(slot[prop], prop);
		        	addGridLayoutRowPositionToSession(slot[prop], rowposition);
		        }
		    }
	   		return minlength;
	   	}

	   	var updateMinSessionLength = function(session, minlength) {
	   		var sessionlength = session.length;
        	if(minlength > sessionlength) {
        		minlength = sessionlength;
    		}
    		return minlength;
	   	}

 		var addGridLayoutRowPositionToSession = function(session, rowposition) {
        	session.rowposition = rowposition.toString();
	    }

	   var addGridLayoutColumnPositionToSession = function(session, room) {
        	if(room == 'all') {
        		splitAndCreateAllSession(session);
        	} else {
        		session.colposition = $scope.room_info[room].id;
        	}
	   }

	   var splitAndCreateAllSession = function(session) {
			session.colposition = 0;
        	session.width = "5";
	   }

	   var changeRoomNameKeyToId = function() {
			for(var index in $scope.slots) {
					var slot = $scope.slots[index];
					for (var prop in slot) {
			        if (slot.hasOwnProperty(prop)) {
			        	var room = $scope.room_info[slot[prop].room];
			        	if(room != undefined) {
				        	slot[room.id] = slot[prop];
				        	delete slot[prop];	
			        	}
			        }
			    }
			}
	   }


	   $scope.isKeynote = function(uniqueSlot) {
	   		return (uniqueSlot == undefined)? false: uniqueSlot.type == "keynote";
	   }

	   $scope.click = function() {
	   	var test = $scope.slots;
	   }
	    
	   loadData();
	})
	.controller('ProgrammeSessionCtrl' , function($scope, $routeParams, Slots) {

		var loadData = function() {
   			Slots.get(function(datas) {
	   				$scope.session = datas.sessions[$routeParams.id];
	   		});
	   };

	   loadData();
	});

