var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ProgrammePrincipalCtrl', function($scope, $http, ProgrammeCacheService, KeynotesService) {

		
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

				/*$http.jsonp('http://stark-sea-2092.herokuapp.com/jsonp/beta/program-summary-with-roomlist?JSON_CALLBACK')
				.success(function(data) {
					var dfs = data;
				});
*/
                $scope.keynotes = KeynotesService.get();

                ProgrammeCacheService.get().then(function(data) {
                    $scope.program = data;
                }, function(data) {
                    // error case
                });
       };

	   $scope.isKeynote = function(uniqueSlot) {
	   		return (uniqueSlot == undefined)? false: uniqueSlot.width == 10;
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
	   		if(type.indexOf("Session") != -1) {
	   			return '#/session/' + session.id;	
	   		}
	   		return '';
	   	}
	    
	   loadData();
	});