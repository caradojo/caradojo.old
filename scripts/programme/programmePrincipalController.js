var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammePrincipalCtrl', function($scope, ProgrammeService, KeynotesService) {
	

		$scope.gridsterOpts = {
			columns: 11,
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
			}
		};
		
		var loadData = function() {
            
                $scope.keynotes = KeynotesService.get();

                var promise = ProgrammeService.get();
                promise.then(function(data) {
                	$scope.program = data;
				}, function(data) {
				    // error case
				}, function(data) {
					// notification case
				});
       };

	   $scope.isKeynote = function(uniqueSlot) {
	   		return (uniqueSlot == undefined)? false: uniqueSlot.type == "keynote";
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
	   		if(session.type == 'session') {
	   			return '#/session/' + session.id;	
	   		}
	   		return '';
	   	}
	    
	   loadData();
	});