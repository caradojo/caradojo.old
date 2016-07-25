var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammePrincipalCtrl', function($scope, $http, ProgrammeCacheService) {

		$scope.displaytheme = true;
		$scope.gridsterOpts = {
			defaultSizeX: 1,
			margins: [0, 0],
			outerMargin: true,
			rowHeight: 50,
			pushing: true,
			floating: false,
			mobileBreakPoint: 750,
			draggable: {
				enabled: false
			},
			resizable: {
				enabled: false,
				handles: 'n, e, s, w, se, sw'
			},
			defineRoomCount: function(maxSessionsCount) {
				this.columns = maxSessionsCount + 1;
			}
		};

		var loadData = function() {

                ProgrammeCacheService.get().then(function(data) {
                    $scope.program = data;
					$scope.gridsterOpts.defineRoomCount(data.rooms.length)

                }, function(data) {
                    // error case
                });
       };

	   $scope.isKeynote = function(uniqueSlot) {
		   var maxSessionWidth = $scope.program.rooms.length;
           return uniqueSlot && uniqueSlot.width == maxSessionWidth;
	   }

	  	$scope.getColPosition = function(item) {
	   		return item.colposition+1;
	    }
		
		$scope.getHourText = function(index) {
			return $scope.program.slot_hours[index];
	   	}
	   
	   	$scope.getHoursRowPosition = function(index) {
	   		return $scope.program.row_hours_position[index];
	   	}

	   	$scope.getHoursLength = function(index) {
			return $scope.program.slot_hours_length[index];
	   	}

	   	$scope.getSessionLink = function(session) {
	   		var type = (session.type == undefined) ? "" : session.type;
	   		if(type == "session") {
	   			return '#/session/' + session.id;	
	   		}
	   		return '';
	   	}
	    
	   loadData();
	});