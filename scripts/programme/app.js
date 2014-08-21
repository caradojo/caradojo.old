var AgileGrenobleApp = angular.module('AgileGrenobleApp', ['ngResource', 'gridster', 'ngRoute'])
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/principal', {
				templateUrl: 'template/principal.html',
				controller: 'ProgrammePrincipalCtrl'
			}).
			when('/session/:id', {
				templateUrl: 'template/session.html',
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
			columns: 11,
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
		    "10h45",
		    "11h05",
		    "11h35",
		    "11h50",
		    "13h20",
		    "13h45",
		    "14h30",
		    "14h50",
		    "15h35",
		    "16h05",
		    "16h50",
		    "17h10",
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

		var room_length = Array.apply(null, Array(Object.keys($scope.room_info).length)).map(function() { return 0 });
	   	var MAX_SESSION_LENGTH = 1000;
		var slot_hours_length = [];
		var row_hours_position = [];


	   	var loadData = function() {
	   		
	   			$scope.keynotes = KeynotesService.get();

	   			Slots.get(function(datas) {
			   			$scope.slots = datas.slots;
			   			$scope.rooms = datas.rooms;
			   			prepareSlots();
		   		});

				
	   };

	   var prepareSlots = function() {
	   		var rowposition = 0;
			for(var index in $scope.slots) {
				var lengthmin = addGridLayoutInformationsToAllSession($scope.slots[index], rowposition);
				slot_hours_length.push(lengthmin);
				row_hours_position.push(rowposition);
			    rowposition = parseInt(rowposition) + parseInt(lengthmin);	
			}
	   	}

	   	var addGridLayoutInformationsToAllSession = function(slot, rowposition) {
	   		var minlength = MAX_SESSION_LENGTH;
		    for (var prop in slot) {
		        if (slot.hasOwnProperty(prop)) {
		        	minlength = updateMinSessionLength(slot[prop], minlength);
		        	if(prop == 'all') {
		        		splitAndCreateAllSession(slot, slot[prop], rowposition);
		        	} else {
		        		addGridLayoutColumnPositionToSession(slot[prop], prop);
		        		updateRoomLength($scope.room_info[prop].id, slot[prop].length, slot[prop].width);
		        	}
		        	addGridLayoutRowPositionToSession(slot[prop], rowposition);
		        }
		    }
	   		return minlength;
	   	}

	   var splitAndCreateAllSession = function(slot, session, rowposition) {
	   		var width = 0;
	   		var roomIndex = 0; 
	   		var isFirst = true;
	   		while (roomIndex < room_length.length) {
	   			if(room_length[roomIndex] <= rowposition) {
	   				width++;
	   				updateRoomLength(roomIndex, session.length, 1);
	   			} else {
	   				isFirst = createAllSessionWithCorrectSize(session, width, isFirst, slot, roomIndex);
	   				width = 0;

	   			}
	   			roomIndex++;
	   		}
	   		createAllSessionWithCorrectSize(session, width, isFirst, slot, roomIndex);
	   		
	   }

	   var createAllSessionWithCorrectSize = function(session, width, isFirst, slot, index) {
	   		if(width > 0) {
	   			var currentsession = session;
	   			if(isFirst == false) {
	   				currentsession = JSON.parse(JSON.stringify(session));
   					slot["all"+index] = currentsession;
   				}
   				currentsession.colposition = index - width;
		   		currentsession.width = width;
		   		isFirst = false;
	   		}
	   		return isFirst;
	   }

	   	var updateRoomLength = function(roomIndex, length, width) {
	   		for(var index = 0; index < width; index++) {
	   			room_length[roomIndex+index] = parseInt(room_length[roomIndex+index]) + parseInt(length);	
	   		}
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
        	session.colposition = $scope.room_info[room].id;
	   }

	   $scope.isKeynote = function(uniqueSlot) {
	   		return (uniqueSlot == undefined)? false: uniqueSlot.type == "keynote";
	   }

	  	$scope.getColPosition = function(item) {
	   		return item.colposition+1;
	    }
		
		$scope.getHourText = function(index) {
			return slot_hours[index];
	   	}
	   
	   	$scope.getHoursRowPosition = function(index) {
	   		return row_hours_position[index];
	   	}

	   	$scope.getHoursLength = function(index) {
			return slot_hours_length[index];
	   	}

	   	$scope.getSessionLink = function(session) {
	   		if(session.type == 'session') {
	   			return '#/session/' + session.id;	
	   		}
	   		return '';
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

